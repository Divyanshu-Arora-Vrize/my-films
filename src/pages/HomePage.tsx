import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import MovieGrid from '../Components/MovieGrid';
import Footer from '../Components/Footer';
import { fetchPopularMovies } from '../services/movieApi';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetch popular movies when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchPopularMovies();
      setMovies(fetchedMovies);
    };

    getMovies();
  }, []);

  // Handle adding/removing a movie to/from favorites
  const handleFavoriteToggle = (movie: Movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some((favMovie: Movie) => favMovie.id === movie.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMovie: Movie) => favMovie.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Films,</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} />
        </div>
      </div>
      <h2 className="section-title">Movies</h2>
      <MovieGrid movies={movies} onFavoriteToggle={handleFavoriteToggle} />
      <Footer />
    </div>
  );
};

export default HomePage;
