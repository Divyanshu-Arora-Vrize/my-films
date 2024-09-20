import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_MOVIES } from '../queries/moviesQueries';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type: string;
}

interface FavoriteMoviesProps {
  favoriteMovies: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ favoriteMovies, onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>(favoriteMovies);

  // Apollo useQuery hook to fetch data from Hasura
  const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);

  useEffect(() => {
    if (data && data.favorite_movies) {
      setMovies(data.favorite_movies);
    }
  }, [data]);

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

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={onFavoriteToggle}
              onWatchlistToggle={onWatchlistToggle}
            />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FavoriteMovies;
