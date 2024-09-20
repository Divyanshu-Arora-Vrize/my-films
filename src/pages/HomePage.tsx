import React, { useReducer, useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import FavoriteMovies from '../Components/FavoriteMovies';
import Watchlist from '../Components/Watchlist';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type?: string; // Optional to align with API
}

// Action types for reducers
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
  const [watchlist, dispatchWatchlist] = useReducer(watchlistReducer, []);
  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, []);
  const [movies, setMovies] = useState<Movie[]>([]); // Movies from API

  // Fetch movies from an external API (using fetch or Axios)
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('<YOUR_MOVIE_API_ENDPOINT>');
      const data = await response.json();
      setMovies(data.results); // Adjust according to the API structure
    };
    fetchMovies();
  }, []);

  // Handle toggling movies to/from watchlist and favorites
  const handleWatchlistToggle = (movie: Movie) => {
    const isInWatchlist = watchlist.some(wlMovie => wlMovie.id === movie.id);
    if (isInWatchlist) {
      dispatchWatchlist({ type: 'REMOVE_MOVIE', payload: movie.id });
    } else {
      dispatchWatchlist({ type: 'ADD_MOVIE', payload: movie });
    }
  };

  const handleFavoriteToggle = (movie: Movie) => {
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
          <h1>Welcome to My Films</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} /> {/* Properly using setMovies */}
        </div>
      </div>

      <h2 className="section-title">Movies</h2>
      <MovieGrid
        movies={movies} // Movies from external API
        onFavoriteToggle={handleFavoriteToggle}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <FavoriteMovies
        favoriteMovies={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <Watchlist
        watchlistMovies={watchlist}
        onFavoriteToggle={handleFavoriteToggle}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
