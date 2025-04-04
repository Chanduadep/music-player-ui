import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Form, InputGroup } from 'react-bootstrap';
import '../styles/components/searchbar.scss';

const SearchBar = () => {
  const { searchSongs } = useContext(PlayerContext);
  const [searchInput, setSearchInput] = useState('');
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    searchSongs(value);
  };
  
  return (
    <div className="search-bar">
      <InputGroup>
        <InputGroup.Text>
          <span className="search-icon">🔍</span>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search Song, Artist"
          value={searchInput}
          onChange={handleSearch}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;