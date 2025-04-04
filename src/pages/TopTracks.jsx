
import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongList from '../components/SongList';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';
import { Container } from 'react-bootstrap';
import { getGradientFromImage } from '../utils/colorExtractor';
import '../styles/components/foryou.scss';

const TopTracks = () => {
  const { currentSong, songsList, colorScheme } = useContext(PlayerContext);

  const backgroundStyle = colorScheme
    ? getGradientFromImage(colorScheme)
    : { background: 'linear-gradient(to bottom, #f0f0f0 0%, #d0d0d0 100%)' };

  return (
    <div className="for-you-page" style={{ background: backgroundStyle }}>
      <Container fluid>
        <h1 className="page-title">Top Tracks</h1>
        <SearchBar />
        <div className="page-content">
          <div className="song-list-column">
            <SongList songs={songsList} />
          </div>
          {/* <div className="player-column">
            {currentSong && <Player />}
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default TopTracks;
