import React, { useReducer, useRef } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieGridProps {
  movies: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const initialState = {
  scrollPosition: 0
};

const reducer = (state: typeof initialState, action: { type: string; payload?: number }) => {
  switch (action.type) {
    case 'SCROLL_LEFT':
      return {
        ...state,
        scrollPosition: state.scrollPosition - (action.payload || 301),
      };
    case 'SCROLL_RIGHT':
      return {
        ...state,
        scrollPosition: state.scrollPosition + (action.payload || 301),
      };
    default:
      return state;
  }
};

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onFavoriteToggle, onWatchlistToggle }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const movieGridRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (movieGridRef.current) {
      dispatch({ type: 'SCROLL_LEFT', payload: 301 });
      movieGridRef.current.scrollBy({ left: -301, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (movieGridRef.current) {
      dispatch({ type: 'SCROLL_RIGHT', payload: 301 });
      movieGridRef.current.scrollBy({ left: 301, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-carousel-container">
      <button className="arrow left-arrow" onClick={handleScrollLeft}>
        &lt;
      </button>
      <div className="movie-grid" ref={movieGridRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            onWatchlistToggle={onWatchlistToggle}
          />
        ))}
      </div>
      <button className="arrow right-arrow" onClick={handleScrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default MovieGrid;
