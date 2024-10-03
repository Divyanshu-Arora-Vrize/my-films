import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { fetchHomepageShows } from '../services/movieApi';
import '../styles.css';
import { Movie } from '../types'; 

interface HomePageProps {
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // Utility function to load from localStorage
  const loadFromLocalStorage = (key: string): Movie[] => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };

  // Utility function to save to localStorage
  const saveToLocalStorage = (key: string, data: Movie[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Fetch homepage shows when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchHomepageShows();
      setMovies(fetchedMovies);
    };

    getMovies();
  }, []);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = loadFromLocalStorage('watchlist');
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Films,</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} />
        </div>
      </div>

      <h2 className="section-title">Movies</h2>
      <MovieGrid
        movies={movies}
        onFavoriteToggle={onFavoriteToggle}
        onWatchlistToggle={onWatchlistToggle}
      />

      {watchlist.length > 0 && (
        <>
          <h2 className="section-title">Watchlist</h2>
          <MovieGrid
            movies={watchlist}
            onFavoriteToggle={onFavoriteToggle}
            onWatchlistToggle={onWatchlistToggle}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;