import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Row, Col } from 'react-bootstrap';
import '../styles/components/songitem.scss';

const SongItem = ({ song }) => {
  const { 
    currentSong, 
    playSong, 
    toggleFavorite, 
    isFavorite,
    isPlaying
  } = useContext(PlayerContext);
  
  const isActive = currentSong && currentSong.id === song.id;
  
  return (
    <Row 
      className={`song-item ${isActive ? 'active' : ''}`}
      onClick={() => playSong(song)}
    >
      <Col xs={6} md={6} className="song-title">
        <div className="thumbnail">
          <img src={song.thumbnail} alt={`${song.title} cover`} />
          {isActive && isPlaying && (
            <div className="playing-indicator">
              <span>●</span>
            </div>
          )}
        </div>
        <div className="title-text">{song.title}</div>
      </Col>
      <Col xs={3} md={3} className="artist-name">
        {song.artistName}
      </Col>
      <Col xs={2} md={2} className="duration text-center">
        {song.duration}
      </Col>
      <Col xs={1} md={1} className="actions">
        <div 
          className="favorite-icon" 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(song.id);
          }}
        >
          {isFavorite(song.id) ? '♥' : '♡'}
        </div>
        <div 
          className="more-options"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ⋮
        </div>
      </Col>
    </Row>
  );
};

export default SongItem;