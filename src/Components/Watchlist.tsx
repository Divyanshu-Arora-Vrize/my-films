import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WATCHLIST_MOVIES } from '../queries/moviesQueriesW';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type: string;
}

interface WatchlistProps {
  watchlistMovies: Movie[];
  onWatchlistToggle: (movie: Movie) => void;
  onFavoriteToggle: (movie: Movie) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlistMovies, onWatchlistToggle, onFavoriteToggle }) => {
  const [movies, setMovies] = useState<Movie[]>(watchlistMovies);

  const { loading, error, data } = useQuery(GET_WATCHLIST_MOVIES);

  useEffect(() => {
    if (data && data.watchlist_movies) {
      setMovies(data.watchlist_movies);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching watchlist: {error.message}</p>;

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Watchlist</h1>
          <p>All the movies and series you want to watch</p>
          <SearchBar setMovies={setMovies} />
        </div>
      </div>

      <h2 className="section-title">My Watchlist</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={onWatchlistToggle}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        ) : (
          <p className="empty-message">No movies in your watchlist yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
