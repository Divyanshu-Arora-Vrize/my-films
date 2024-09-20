import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { gql, useQuery, useMutation } from '@apollo/client';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

// GraphQL Query to Fetch Movies
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      release_date
      poster_path
    }
  }
`;

// GraphQL Mutation to Add Movie to Favorites
const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: Int!) {
    update_movies_by_pk(pk_columns: { id: $id }, _set: { favorite: true }) {
      id
      favorite
    }
  }
`;

// GraphQL Mutation to Add Movie to Watchlist
const TOGGLE_WATCHLIST = gql`
  mutation ToggleWatchlist($id: Int!) {
    update_movies_by_pk(pk_columns: { id: $id }, _set: { watchlist: true }) {
      id
      watchlist
    }
  }
`;

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
    onFavoriteToggle(movie);
    toast.success(`${movieTitle} added to favorites!`);
    setMenuOpen(false);
  };

  const handleWatchlistClick = () => {
    onWatchlistToggle(movie);
    toast.success(`${movieTitle} added to watchlist!`);
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

// Main Component to Fetch Movies and Render MovieCard
const MoviesList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);
  const [toggleWatchlist] = useMutation(TOGGLE_WATCHLIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies!</p>;

  const handleFavoriteToggle = (movie: Movie) => {
    toggleFavorite({ variables: { id: movie.id } });
  };

  const handleWatchlistToggle = (movie: Movie) => {
    toggleWatchlist({ variables: { id: movie.id } });
  };

  return (
    <div className="movies-grid">
      {data.movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteToggle={handleFavoriteToggle}
          onWatchlistToggle={handleWatchlistToggle}
        />
      ))}
    </div>
  );
};

export default MoviesList;
