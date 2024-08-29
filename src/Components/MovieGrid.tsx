import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieGridProps {
  movies: Movie[];
  onFavoriteToggle: (movie: Movie) => void; // Add this line to the interface
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onFavoriteToggle }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="movie-carousel-container">
      <button className="arrow left-arrow" onClick={scrollLeft}>⬅</button>
      <div className="movie-grid" ref={carouselRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onFavoriteToggle={onFavoriteToggle} />
        ))}
      </div>
      <button className="arrow right-arrow" onClick={scrollRight}>➡</button>
    </div>
  );
};

export default MovieGrid;
