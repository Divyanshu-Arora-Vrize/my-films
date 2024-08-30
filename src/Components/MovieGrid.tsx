import React from 'react';
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

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onFavoriteToggle, onWatchlistToggle }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteToggle={onFavoriteToggle}
          onWatchlistToggle={onWatchlistToggle}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
