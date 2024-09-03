import React, { useState } from 'react';
import { fetchMovies } from '../services/movieApi';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface SearchBarProps {
  setMovies: (movies: Movie[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setMovies }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async () => {
    const results = await fetchMovies(query);
    setMovies(results);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search here"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
