import React from 'react';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void; // Add this prop
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder-image-url'; // Replace with your placeholder image URL

  const handleFavoriteClick = () => {
    onFavoriteToggle(movie); // Call the function passed down from the parent component
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <div className="movie-meta">
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
