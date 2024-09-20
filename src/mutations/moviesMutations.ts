import { gql } from '@apollo/client';

export const TOGGLE_FAVORITE_MOVIE = gql`
  mutation ToggleFavoriteMovie($movieId: Int!) {
    toggleFavoriteMovie(movieId: $movieId) {
      id
      title
      isFavorite
    }
  }
`;

export const TOGGLE_WATCHLIST_MOVIE = gql`
  mutation ToggleWatchlistMovie($movieId: Int!) {
    toggleWatchlistMovie(movieId: $movieId) {
      id
      title
      isInWatchlist
    }
  }
`;
