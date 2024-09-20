import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_MOVIES } from '../queries/moviesQueries';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import '../styles.css'; // Importing global styles
import { toast } from 'react-toastify'; // Importing toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type?: string;
}

const FavoriteMovies: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // To handle search results
  const [watchlist, setWatchlist] = useState<Movie[]>([]); // State for watchlist
interface FavoriteMoviesProps {
  favoriteMovies: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({
  favoriteMovies,
  onFavoriteToggle,
  onWatchlistToggle,
}) => {
  const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setFavoriteMovies(savedFavorites);
    setWatchlist(savedWatchlist);
  }, []);

  const handleFavoriteToggle = (movie: Movie) => {
    const updatedFavorites = favoriteMovies.some(favMovie => favMovie.id === movie.id)
      ? favoriteMovies.filter(favMovie => favMovie.id !== movie.id)
      : [...favoriteMovies, movie];

    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast(updatedFavorites.some(favMovie => favMovie.id === movie.id) ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleWatchlistToggle = (movie: Movie) => {
    const updatedWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)
      ? watchlist.filter(watchlistMovie => watchlistMovie.id !== movie.id)
      : [...watchlist, movie];

    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    toast(updatedWatchlist.some(watchlistMovie => watchlistMovie.id === movie.id) ? 'Added to watchlist' : 'Removed from watchlist');
  };
    if (data) {
      // You can handle the fetched favorite movies here
      console.log(data);
    }
  }, [data]);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites: {error.message}</p>;

  return (
    <div className="favorite-movies-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Favorite Movies</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} /> {/* Search functionality */}
        </div>
      </div>

      <h2 className="section-title">Favorite Movies</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={handleWatchlistToggle}
            />
          ))
        ) : favoriteMovies.length > 0 ? (
          favoriteMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={handleWatchlistToggle}
            />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
    <div>
      <h2>Your Favorite Movies</h2>
      <div>
        {favoriteMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            onWatchlistToggle={onWatchlistToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
