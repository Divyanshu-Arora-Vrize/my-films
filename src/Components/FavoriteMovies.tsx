import React, { useReducer, useEffect } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface State {
  favoriteMovies: Movie[];
  movies: Movie[];
}

type Action =
  | { type: 'LOAD_SAVED_DATA'; payload: { favorites: Movie[] } }
  | { type: 'ADD_TO_FAVORITES'; payload: Movie }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: Movie }
  | { type: 'SET_MOVIES'; payload: Movie[] };

const initialState: State = {
  favoriteMovies: [],
  movies: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      const updatedFavorites = [...state.favoriteMovies, action.payload];
      console.log('New favorites array after adding:', updatedFavorites); // <-- Log after update
      return {
        ...state,
        favoriteMovies: updatedFavorites,
      };
    case 'REMOVE_FROM_FAVORITES':
      const filteredFavorites = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
      console.log('New favorites array after removing:', filteredFavorites); // <-- Log after update
      return {
        ...state,
        favoriteMovies: filteredFavorites,
      };
    default:
      return state;
  }
};



const FavoriteMovies: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load saved favorite movies from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Movie[];
    dispatch({
      type: 'LOAD_SAVED_DATA',
      payload: { favorites: savedFavorites },
    });
  }, []);

  // Update localStorage when favoriteMovies state changes
  useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(state.favoriteMovies));
  console.log('Updated localStorage with favoriteMovies:', state.favoriteMovies); // <-- Added log
}, [state.favoriteMovies]);

  const handleFavoriteToggle = (movie: Movie) => {
  console.log('Toggling favorite for movie:', movie); // <-- Added log

  const isFavorite = state.favoriteMovies.some(favMovie => favMovie.id === movie.id);
  if (isFavorite) {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movie });
    toast.error(`${movie.title} removed from favorites`);
  } else {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: movie });
    toast.success(`${movie.title} added to favorites`);
  }
};


  return (
    <div className="favorite-movies-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Favorite Movies</h1>
          <p>Your favorite Movies & Series all in one place</p>
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
                onFavoriteToggle={handleFavoriteToggle}
                onWatchlistToggle={() => {}}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">Favorite Movies</h2>
      <div className="movie-grid">
        {state.favoriteMovies.length > 0 ? (
          state.favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={() => {}}
            />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteMovies;
