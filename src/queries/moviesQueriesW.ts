
import { gql } from '@apollo/client';

export const GET_WATCHLIST_MOVIES = gql`
  query GetWatchlistMovies {
    watchlist_movies {
      id
      title
      release_date
      poster_path
      media_type
    }
  }
`;
