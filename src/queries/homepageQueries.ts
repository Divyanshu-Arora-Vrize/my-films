import { gql } from '@apollo/client';

// Fetch all movies
export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      title
      release_date
      poster_path
    }
  }
`;

// Favorite Movies Queries
export const GET_FAVORITE_MOVIES = gql`
  query GetFavoriteMovies {
    favorite_movies {
      id
      title
      release_date
      poster_path
    }
  }
`;

// Watchlist Movies Queries
export const GET_WATCHLIST_MOVIES = gql`
  query GetWatchlistMovies {
    watchlist_movies {
      id
      title
      release_date
      poster_path
    }
  }
`;
