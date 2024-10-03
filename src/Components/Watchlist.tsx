import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WATCHLIST_MOVIES } from '../queries/moviesQueries';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { Movie } from '../types'; // Ensure that the Movie type is correctly imported

interface WatchlistProps {
  onWatchlistToggle: (movie: Movie) => void;
  onFavoriteToggle: (movie: Movie) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ onWatchlistToggle, onFavoriteToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const movieGridRef = useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery(GET_WATCHLIST_MOVIES);

  useEffect(() => {
    if (data && data.Watchlist) {
      setMovies(data.Watchlist);
    }
  }, [data]);

  // Function to scroll the movie grid
  const scroll = (direction: 'left' | 'right') => {
    if (movieGridRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      movieGridRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

      <div className="movie-grid-wrapper">
        {/* Left arrow button */}
        <button className="scroll-arrow left-arrow" onClick={() => scroll('left')}>
          ←
        </button>

        <div className="movie-grid" ref={movieGridRef}>
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchlistToggle={() => onWatchlistToggle(movie)}
                onFavoriteToggle={() => onFavoriteToggle(movie)}
              />
            ))
          ) : (
            <p className="empty-message">No movies in your watchlist yet.</p>
          )}
        </div>

        {/* Right arrow button */}
        <button className="scroll-arrow right-arrow" onClick={() => scroll('right')}>
          →
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
