import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongItem from './SongItem';
import '../styles/components/songlist.scss';
import { Container, Row, Col } from 'react-bootstrap';

const SongList = () => {
  const { 
    songsList, 
    favorites, 
    recentlyPlayed, 
    activeTab, 
    searchTerm,
    searchSongs 
  } = useContext(PlayerContext);
  
  const [displayedSongs, setDisplayedSongs] = useState([]);
  
  useEffect(() => {
    let songs = [];
    
    // Filter songs based on active tab
    switch (activeTab) {
      case 'Favorites':
        songs = favorites;
        break;
      case 'RecentlyPlayed':
        songs = recentlyPlayed;
        break;
      case 'TopTracks':
      case 'ForYou':
      default:
        songs = songsList;
    }

    if (searchTerm) {
      songs = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setDisplayedSongs(songs);
  }, [activeTab, songsList, favorites, recentlyPlayed, searchTerm]);
  
  return (
    <div className="song-list">
      <Container fluid>
        <Row className="song-list-header">
          <Col xs={6} md={6}>Title</Col>
          <Col xs={3} md={3}>Artist</Col>
          <Col xs={2} md={2} className="text-center">Duration</Col>
          <Col xs={1} md={1}></Col>
        </Row>
        
        <div className="song-items">
          {displayedSongs.length > 0 ? (
            displayedSongs.map(song => (
              <SongItem key={song.id} song={song} />
            ))
          ) : (
            <div className="no-songs">
              {searchTerm ? 'No songs found matching your search.' : 'No songs in this category yet.'}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SongList;