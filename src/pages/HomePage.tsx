import React, { useState, useEffect, useReducer } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { fetchHomepageShows } from '../services/movieApi';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

// Action types for reducer
type ActionType =
  | { type: 'ADD_MOVIE'; payload: Movie }
  | { type: 'REMOVE_MOVIE'; payload: number };

// Watchlist reducer
const watchlistReducer = (state: Movie[], action: ActionType): Movie[] => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return state.some(movie => movie.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.payload);
    default:
      return state;
  }
};

// Favorites reducer
const favoritesReducer = (state: Movie[], action: ActionType): Movie[] => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return state.some(movie => movie.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.payload);
    default:
      return state;
  }
};

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, dispatchWatchlist] = useReducer(watchlistReducer, []);
  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, []);

  // Fetch homepage shows when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchHomepageShows();
      setMovies(fetchedMovies);
    };

    getMovies();
  }, []);

  // Handle adding/removing a movie to/from the watchlist
  const handleWatchlistToggle = (movie: Movie) => {
    const isInWatchlist = watchlist.some(wlMovie => wlMovie.id === movie.id);
    if (isInWatchlist) {
      dispatchWatchlist({ type: 'REMOVE_MOVIE', payload: movie.id });
    } else {
      dispatchWatchlist({ type: 'ADD_MOVIE', payload: movie });
    }
  };

  // Handle adding/removing a movie to/from the favorites
  const handleFavoriteToggle = (movie: Movie) => {
    console.log('Toggling favorite:', movie.title);
    const isFavorite = favorites.some(favMovie => favMovie.id === movie.id);
    if (isFavorite) {
      dispatchFavorites({ type: 'REMOVE_MOVIE', payload: movie.id });
    } else {
      dispatchFavorites({ type: 'ADD_MOVIE', payload: movie });
    }
  };

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
        onFavoriteToggle={handleFavoriteToggle}
        onWatchlistToggle={handleWatchlistToggle}
      />

      {watchlist.length > 0 && (
        <>
          <h2 className="section-title">Watchlist</h2>
          <MovieGrid
            movies={watchlist}
            onFavoriteToggle={handleFavoriteToggle}
            onWatchlistToggle={handleWatchlistToggle}
          />
        </>
      )}

      {favorites.length > 0 && (
        <>
          <h2 className="section-title">Favorite Movies</h2>
          <MovieGrid
            movies={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onWatchlistToggle={handleWatchlistToggle}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
