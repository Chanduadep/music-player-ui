
import React, { createContext, useState, useEffect, useRef } from 'react';
import songs from '../data/songs';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songsList, setSongsList] = useState(songs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ForYou');

  const audioRef = useRef(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [recentlyPlayed, setRecentlyPlayed] = useSessionStorage('recentlyPlayed', []);

  const updateRecentlyPlayed = (song) => {
    const newRecentlyPlayed = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
    setRecentlyPlayed(newRecentlyPlayed);
  };

  const toggleFavorite = (songId) => {
    const songIndex = favorites.findIndex(song => song.id === songId);
    if (songIndex === -1) {
      const songToAdd = songsList.find(song => song.id === songId);
      setFavorites([...favorites, songToAdd]);
    } else {
      setFavorites(favorites.filter(song => song.id !== songId));
    }
  };

  const isFavorite = (songId) => {
    return favorites.some(song => song.id === songId);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    updateRecentlyPlayed(song);
  };

  const playNext = () => {
    const currentIndex = songsList.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songsList.length;
    playSong(songsList[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = songsList.findIndex(song => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    playSong(songsList[prevIndex]);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const searchSongs = (term) => {
    setSearchTerm(term);
    if (!term) return songs;
    return songs.filter(song =>
      song.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  // 🔁 Play when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      const playAudio = async () => {
        try {
          audio.src = currentSong.musicUrl;
          audio.load();
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn('Autoplay error:', error);
          setIsPlaying(false);
        }
      };
      playAudio();
    }
  }, [currentSong]);

  // 🔁 Control play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.log("Play failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 🔊 Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // ⏱ Track time updates
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    playNext();
  };

  return (
    <PlayerContext.Provider
      value={{
        songsList,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        audioRef,
        favorites,
        recentlyPlayed,
        activeTab,
        searchTerm,
        setActiveTab,
        playSong,
        playNext,
        playPrevious,
        togglePlay,
        setVolume,
        toggleFavorite,
        isFavorite,
        setCurrentTime,
        searchSongs,
        handleTimeUpdate,
        handleEnded
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {children}
    </PlayerContext.Provider>
  );
};
