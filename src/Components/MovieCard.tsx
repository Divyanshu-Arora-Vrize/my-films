import React from 'react';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle?: (movie: Movie) => void; // Make this prop optional
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle, onWatchlistToggle }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder-image-url'; // Replace with your placeholder image URL

  const handleFavoriteClick = () => {
    onFavoriteToggle(movie);
  };

  const handleWatchlistClick = () => {
    if (onWatchlistToggle) {
      onWatchlistToggle(movie); // Correct function call here
    }
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
          {onWatchlistToggle && ( // Only render if onWatchlistToggle is passed
            <button className="watchlist-btn" onClick={handleWatchlistClick}>
              ⭐
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
