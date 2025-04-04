
import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongList from '../components/SongList';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';
import { Container } from 'react-bootstrap';
import { getGradientFromImage } from '../utils/colorExtractor';
import '../styles/components/foryou.scss';

const RecentlyPlayed = () => {
  const { currentSong, recentlyPlayed, colorScheme } = useContext(PlayerContext);

  const backgroundStyle = colorScheme
    ? getGradientFromImage(colorScheme)
    : { background: 'linear-gradient(to bottom, #f0f0f0 0%, #d0d0d0 100%)' };

  return (
    <div className="for-you-page" style={{ background: backgroundStyle }}>
      <Container fluid>
        <h1 className="page-title">Recently Played</h1>
        <SearchBar />
        <div className="page-content">
          <div className="song-list-column">
            {recentlyPlayed.length === 0 ? (
              <div className="empty-state">
                <p>Your recently played list is empty. Play some songs to see them here.</p>
              </div>
            ) : (
              <SongList songs={recentlyPlayed} />
            )}
          </div>
          {/* <div className="player-column">
            {currentSong && <Player />}
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default RecentlyPlayed;
