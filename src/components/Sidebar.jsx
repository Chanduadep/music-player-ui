import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import '../styles/components/sidebar.scss';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(PlayerContext);
  
  const navItems = [
    { id: 'ForYou', label: 'For You' },
    { id: 'TopTracks', label: 'Top Tracks' },
    { id: 'Favorites', label: 'Favourites' },
    { id: 'RecentlyPlayed', label: 'Recently Played' }
  ];
  
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="music-icon">●</span>
        <span className="music-text">Music Player</span>
      </div>
      
      <nav className="nav-menu">
        <ul>
          {navItems.map(item => (
            <li 
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;