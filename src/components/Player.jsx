import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { ProgressBar } from 'react-bootstrap';
import { formatTime } from '../utils/formatTime';
import '../styles/components/player.scss';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    audioRef,
    setCurrentTime
  } = useContext(PlayerContext);

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.5);

  // Calculate progress percentage
  const progress = duration ? (currentTime / duration) * 100 : 0;


  // Handle volume toggle
  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  // progress bar 
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
  
    const duration = audioRef.current?.duration;
  
    if (audioRef.current && typeof duration === 'number' && !isNaN(duration) && isFinite(duration)) {
      const newTime = (clickX / rect.width) * duration;
  
      if (!isNaN(newTime) && isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime); // Optionally update context state too
      }
    }
  };
  
  

  //volume 
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="player-sidebar">
      <div className="player-content">
        {currentSong && (
          <div className="song-info">
            <img 
              src={currentSong.thumbnail} 
              alt={`${currentSong.title} cover`}
              className="current-song-thumb"
            />
            <div className="song-details">
              <h2 className="current-title">{currentSong.title}</h2>
              <p className="current-artist">{currentSong.artistName}</p>
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="player-controls">
          <div className="control-buttons">
            <button className="control-btn prev" onClick={playPrevious}>⏮</button>
            <button className="control-btn play-pause" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn next" onClick={playNext}>⏭</button>
          </div>

          <div className="progress-container" onClick={handleProgressClick}>
            <span className="time-elapsed">{formatTime(currentTime)}</span>
            <ProgressBar now={progress} className="song-progress" />
            <span className="time-total">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="volume-controls">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
