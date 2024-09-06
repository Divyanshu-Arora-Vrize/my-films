import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { fetchHomepageShows } from '../services/movieApi'; // Updated fetch call for homepage
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // Fetch homepage shows when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchHomepageShows();
      setMovies(fetchedMovies);
    };

    getMovies();
  }, []);

  // Handle adding/removing a movie to/from favorites
  const handleFavoriteToggle = (movie: Movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some((favMovie: Movie) => favMovie.id === movie.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMovie: Movie) => favMovie.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  // Handle adding/removing a movie to/from the watchlist
  const handleWatchlistToggle = (movie: Movie) => {
    const watchlistMovies = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const isInWatchlist = watchlistMovies.some((wlMovie: Movie) => wlMovie.id === movie.id);

    if (isInWatchlist) {
      const updatedWatchlist = watchlistMovies.filter((wlMovie: Movie) => wlMovie.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
    } else {
      watchlistMovies.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlistMovies));
      setWatchlist(watchlistMovies);
    }
  };

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
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
      <MovieGrid movies={movies} onFavoriteToggle={handleFavoriteToggle} onWatchlistToggle={handleWatchlistToggle} />

      {watchlist.length > 0 && (
        <>
          <h2 className="section-title">Watchlist</h2>
          <MovieGrid movies={watchlist} onFavoriteToggle={handleFavoriteToggle} onWatchlistToggle={handleWatchlistToggle} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
