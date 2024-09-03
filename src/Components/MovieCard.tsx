import React from 'react';
import { toast } from 'react-toastify';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle, onWatchlistToggle }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder-image-url'; 

  const handleFavoriteClick = () => {
    onFavoriteToggle(movie);
    toast.success(`${movie.title} added to favorites!`); 
  };

  const handleWatchlistClick = () => {
    onWatchlistToggle(movie);
    toast.success(`${movie.title} added to watchlist!`); 
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <div className="movie-meta">
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            ❤️
          </button>
          <button className="watchlist-btn" onClick={handleWatchlistClick}>
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
