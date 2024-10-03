import React, { useState } from 'react';
import { fetchMovies, fetchHomepageShows } from '../services/movieApi';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type: string;
}

interface SearchBarProps {
  setMovies: (movies: Movie[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setMovies }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async () => {
    if (query.trim() === '') {
      const homepageShows: Movie[] = await fetchHomepageShows(); // Ensure this returns movies with 'media_type'
      setMovies(homepageShows);
    } else {
      const results: Movie[] = await fetchMovies(query); // Ensure this returns movies with 'media_type'
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