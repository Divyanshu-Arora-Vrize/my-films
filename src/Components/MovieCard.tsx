import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder-image-url';

  const handleFavoriteClick = () => {
    onFavoriteToggle(movie);
    toast.success(`${movie.title} added to favorites!`);
    setMenuOpen(false);
  };

  const handleWatchlistClick = () => {
    onWatchlistToggle(movie);
    toast.success(`${movie.title} added to watchlist!`);
    setMenuOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <div className="movie-meta">
          <button className="three-dot-btn" onClick={toggleMenu}>
            ⋮
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <button className="favorite-btn" onClick={handleFavoriteClick}>
                ❤️ Add to Favorites
              </button>
              <button className="watchlist-btn" onClick={handleWatchlistClick}>
                ⭐ Add to Watchlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
