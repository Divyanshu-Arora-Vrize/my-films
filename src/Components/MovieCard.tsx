import React, { useState } from 'react';

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
    ? movie.poster_path
    : 'https://via.placeholder.com/200x300?text=No+Image+Available';

  const movieTitle = movie.title || 'No Title Available';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'No Release Date Available';

const handleFavoriteClick = () => {
  //console.log('Favorite button clicked for:', movie); // <-- Added log
  onFavoriteToggle(movie);
  setMenuOpen(false);
};

const handleWatchlistClick = () => {
 // console.log('Watchlist button clicked for:', movie); // <-- Added log
  onWatchlistToggle(movie);
  setMenuOpen(false);
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
                ❤️ Add to Favorite
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
