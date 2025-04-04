import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PlayerProvider, PlayerContext } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import ForYou from './pages/ForYou';
import TopTracks from './pages/TopTracks';
import Favorites from './pages/Favorites';
import RecentlyPlayed from './pages/RecentlyPlayed';
import './styles/main.scss';

// Inner App component to access context
const AppContent = () => {
  const { activeTab, currentSong } = useContext(PlayerContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  // Background style based on current song
  const backgroundStyle = {
    transition: 'background 0.5s ease-in-out'
  };
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Render active page based on tab
  const renderActivePage = () => {
    switch (activeTab) {
      case 'TopTracks':
        return <TopTracks />;
      case 'Favorites':
        return <Favorites />;
      case 'RecentlyPlayed':
        return <RecentlyPlayed />;
      case 'ForYou':
      default:
        return <ForYou />;
    }
  };
  
  return (
    <div className="app" style={backgroundStyle}>
      <Container fluid className="app-container">
        <Row className="app-content">
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <div 
              className="menu-toggle"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? '✕' : '☰'}
            </div>
          )}
          
          {/* Sidebar */}
          <Col 
            md={2} 
            className={`sidebar-container ${showSidebar ? 'show' : 'hide'}`}
          >
            <Sidebar />
          </Col>
          
          {/* Main Content */}
          <Col md={showSidebar ? 10 : 12} className="main-container">
            {renderActivePage()}
          </Col>
        </Row>
        
      </Container>
    </div>
  );
};

// Root App with Provider
const App = () => {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
};

export default App;