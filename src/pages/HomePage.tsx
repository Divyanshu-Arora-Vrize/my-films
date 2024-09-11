import React, { useReducer, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { fetchHomepageShows } from '../services/movieApi';
import { toast } from 'react-toastify'; // Import toast for notifications
import '../styles.css';

// Define Movie type
interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

// Define initial state structure
interface State {
  movies: Movie[];
  favoriteMovies: Movie[]; // Add favorites
  watchlist: Movie[]; // Add watchlist
}

// Define action types
type Action =
  | { type: 'SET_MOVIES'; payload: Movie[] }
  | { type: 'ADD_TO_FAVORITES'; payload: Movie }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: Movie }
  | { type: 'ADD_TO_WATCHLIST'; payload: Movie }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: Movie };

// Define initial state
const initialState: State = {
  movies: [],
  favoriteMovies: [], // Add favorites
  watchlist: [], // Add watchlist
};

// Define reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'ADD_TO_FAVORITES':
      return { ...state, favoriteMovies: [...state.favoriteMovies, action.payload] };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.payload.id),
      };
    case 'ADD_TO_WATCHLIST':
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const HomePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchHomepageShows();
      dispatch({ type: 'SET_MOVIES', payload: movies });
    };

    fetchMovies();
  }, []);

  const handleFavoriteToggle = (movie: Movie) => {
    const isFavorite = state.favoriteMovies.some(favMovie => favMovie.id === movie.id);
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movie });
      toast.error(`${movie.title} removed from favorites`);
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: movie });
      toast.success(`${movie.title} added to favorites`);
    }
  };

  const handleWatchlistToggle = (movie: Movie) => {
    const isInWatchlist = state.watchlist.some(watchlistMovie => watchlistMovie.id === movie.id);
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movie });
      toast.error(`${movie.title} removed from watchlist`);
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie });
      toast.success(`${movie.title} added to watchlist`);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Movie Finder</h1>
          <p>Find your favorite Movies & Series</p>
          <SearchBar
            setMovies={(movies: Movie[]) =>
              dispatch({ type: 'SET_MOVIES', payload: movies })
            }
          />
        </div>
      </div>

      <h2 className="section-title">Trending Movies</h2>
      <MovieGrid
        movies={state.movies}
        onFavoriteToggle={handleFavoriteToggle} // Handle the favorite toggle
        onWatchlistToggle={handleWatchlistToggle} // Handle the watchlist toggle
      />

      <Footer />
    </div>
  );
};

export default HomePage;
