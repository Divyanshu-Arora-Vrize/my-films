import React, { useState } from 'react';
import { fetchMovies, fetchHomepageShows } from '../services/movieApi';
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
    if (query.trim() === '') {
      // Fetch homepage shows if search query is empty
      const homepageShows = await fetchHomepageShows();
      setMovies(homepageShows);
    } else {
      const results = await fetchMovies(query);
      setMovies(results);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search here"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
