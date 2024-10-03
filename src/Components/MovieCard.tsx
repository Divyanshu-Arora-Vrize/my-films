import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE, ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../queries/moviesQueries';
import { Movie } from '../types';
import { enqueueSnackbar } from 'notistack';

// interface Movie {
//   id: number;
//   title: string;
//   release_date: string;
//   poster_path: string;
// }

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle, onWatchlistToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Define mutations for adding/removing from favorites and watchlist
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE);
  const [removeFavoriteMovie] = useMutation(REMOVE_FAVORITE_MOVIE);
  const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST);
  const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST);

  const posterUrl = movie.poster_path
    ? movie.poster_path
    : 'https://via.placeholder.com/200x300?text=No+Image+Available';

  const movieTitle = movie.title || 'No Title Available';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'No Release Date Available';

  const handleFavoriteClick = async () => {
    try {
      await addFavoriteMovie({
        variables: {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        }
      });
      onFavoriteToggle(movie);
      enqueueSnackbar("Movie Added to Favorite",{variant:"success"})
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to add movie ",{variant:"error"})
    }
    setMenuOpen(false);
  };

  const handleWatchlistClick = async () => {
    try {
      await addToWatchlist({
        variables: {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        }
      });
      onWatchlistToggle(movie);  // Trigger state update in parent component
      enqueueSnackbar("Movie Added to WatchList",{variant:"success"})
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Faild to Add to Watchlist",{variant:"error"})
    }
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
