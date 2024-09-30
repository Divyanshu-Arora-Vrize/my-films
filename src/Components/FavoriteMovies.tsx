import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FAVORITE_MOVIES, ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE } from '../queries/moviesQueries';
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
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Apollo useQuery hook to fetch data from Hasura
  const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);

  // Apollo useMutation hooks for adding/removing favorite movies
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE);
  const [removeFavoriteMovie] = useMutation(REMOVE_FAVORITE_MOVIE);

  useEffect(() => {
    if (data && data.favorite_movies) {
      setMovies(data.favorite_movies);
    }
  }, [data]);

  const handleFavoriteToggle = async (movie: Movie) => {
    const isFavorite = movies.some(favMovie => favMovie.id === movie.id);

    if (isFavorite) {
      await removeFavoriteMovie({ variables: { id: movie.id } });
      setMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    } else {
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

      <div className="movie-grid">
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

      <Footer />
    </div>
  );
};

export default FavoriteMovies;