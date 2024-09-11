import React, { useReducer, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define Movie type
interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

// Define initial state structure
interface State {
  watchlistMovies: Movie[];
  movies: Movie[];
}

// Define action types
type Action =
  | { type: 'LOAD_WATCHLIST'; payload: Movie[] }
  | { type: 'ADD_TO_WATCHLIST'; payload: Movie }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: Movie }
  | { type: 'SET_MOVIES'; payload: Movie[] };

// Define initial state
const initialState: State = {
  watchlistMovies: [],
  movies: [],
};

// Define reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_WATCHLIST':
      return {
        ...state,
        watchlistMovies: action.payload,
      };
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlistMovies: [...state.watchlistMovies, action.payload],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlistMovies: state.watchlistMovies.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

const Watchlist: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]') as Movie[];
    dispatch({ type: 'LOAD_WATCHLIST', payload: savedWatchlist });
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlistMovies));
  }, [state.watchlistMovies]);

  const handleWatchlistToggle = (movie: Movie) => {
    const isInWatchlist = state.watchlistMovies.some(watchlistMovie => watchlistMovie.id === movie.id);
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movie });
      toast.error(`${movie.title} removed from watchlist`);
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie });
      toast.success(`${movie.title} added to watchlist`);
    }
  };

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Your Watchlist</h1>
          <p>All the Movies & Series you want to watch</p>
          <SearchBar
            setMovies={(movies: Movie[]) =>
              dispatch({ type: 'SET_MOVIES', payload: movies })
            }
          />
        </div>
      </div>

      {state.movies.length > 0 && (
        <>
          <h2 className="section-title">Search Results</h2>
          <div className="movie-grid">
            {state.movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteToggle={() => {}} // Optionally you can manage favorites here as well
                onWatchlistToggle={handleWatchlistToggle}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">Your Watchlist</h2>
      <div className="movie-grid">
        {state.watchlistMovies.length > 0 ? (
          state.watchlistMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={() => {}} // Optionally manage favorites
              onWatchlistToggle={handleWatchlistToggle}
            />
          ))
        ) : (
          <p>No movies in your watchlist yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Watchlist;
