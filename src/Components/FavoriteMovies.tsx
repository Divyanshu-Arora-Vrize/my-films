import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FAVORITE_MOVIES, ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE } from '../queries/moviesQueries';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { Movie } from '../types';
import '../styles.css';

interface FavoriteMoviesProps {
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const movieGridRef = useRef<HTMLDivElement>(null);

  // Apollo useQuery hook to fetch data from Hasura
  const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);

  // Apollo useMutation hooks for adding/removing favorite movies
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE);
  const [removeFavoriteMovie] = useMutation(REMOVE_FAVORITE_MOVIE);

  useEffect(() => {
    if (data && data.FavoriteMovies) {
      setMovies(data.FavoriteMovies);
    }
  }, [data]);

  const handleFavoriteToggle = async (movie: Movie) => {
    const isFavorite = movies.some(favMovie => favMovie.id === movie.id);

    if (isFavorite) {
      // Remove from favorites
      try {
        await removeFavoriteMovie({ variables: { id: movie.id } });
        setMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
      } catch (error) {
        console.error('Error removing movie from favorites:', error);
      }
    } else {
      // Add to favorites
      try {
        await addFavoriteMovie({
          variables: {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            media_type: movie.media_type,
          },
        });
        setMovies(prevMovies => [...prevMovies, movie]);
      } catch (error) {
        console.error('Error adding movie to favorites:', error);
      }
    }
  };

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
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="favorite-movies-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Favorite Movies</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} />
        </div>
      </div>

      <h2 className="section-title">Favorite Movies</h2>

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
                onFavoriteToggle={() => handleFavoriteToggle(movie)}
                onWatchlistToggle={onWatchlistToggle}
              />
            ))
          ) : (
            <p>No favorite movies yet.</p>
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

export default FavoriteMovies;
