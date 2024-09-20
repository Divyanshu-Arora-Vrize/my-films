import React from 'react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type: string;
}

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle, onWatchlistToggle }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster_path} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <button onClick={() => onFavoriteToggle(movie)}>Toggle Favorite</button>
      <button onClick={() => onWatchlistToggle(movie)}>Toggle Watchlist</button>
    </div>
  );
};

export default MovieCard;
