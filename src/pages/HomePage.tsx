import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Navbar from '../Components/Navbar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { GET_ALL_MOVIES } from '../queries/homepageQueries';
import { Movie } from '../types';

interface HomePageProps {
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  useEffect(() => {
    if (data && data.movies) {
      setMovies(data.movies);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Movie Grid</h1>
          <p>Explore Movies and TV Shows</p>
        </div>
      </div>

      <h2 className="section-title">All Movies</h2>

      <MovieGrid
        movies={movies}
        onFavoriteToggle={onFavoriteToggle}
        onWatchlistToggle={onWatchlistToggle}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
