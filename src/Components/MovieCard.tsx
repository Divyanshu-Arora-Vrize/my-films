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

  // Check for missing poster path and set the fallback image
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image+Available'; // Your placeholder image URL

  // Check for missing title and set the fallback title
  const movieTitle = movie.title || 'No Title Available';

  // Check for missing release date and set the fallback date
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'No Release Date Available';

  const handleFavoriteClick = () => {
    onFavoriteToggle(movie);
    toast.success(`${movieTitle} added to favorites!`);
    setMenuOpen(false); // Close the menu after selecting an option
  };

  const handleWatchlistClick = () => {
    onWatchlistToggle(movie);
    toast.success(`${movieTitle} added to watchlist!`);
    setMenuOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movieTitle} className="movie-poster" />
      <div className="movie-info">
        <h4>{movieTitle}</h4>
        <p>{releaseYear}</p>
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
