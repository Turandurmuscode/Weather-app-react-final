// src/components/SearchBar.js
import React from 'react';
import '../app.css';

const SearchBar = ({ city, onInputChange, onSearch, onKeyPress }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        onChange={onInputChange}
        placeholder="Şehir girin"
        onKeyDown={onKeyPress}
      />
      <button onClick={onSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;