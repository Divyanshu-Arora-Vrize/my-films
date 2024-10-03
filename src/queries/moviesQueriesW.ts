import { gql } from '@apollo/client';

// Fetch watchlist movies
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

// Add a movie to watchlist
export const ADD_WATCHLIST_MOVIE = gql`
  mutation AddWatchlistMovie($id: Int!, $title: String!, $release_date: String!, $poster_path: String!, $media_type: String!) {
    insert_watchlist_movies_one(object: {id: $id, title: $title, release_date: $release_date, poster_path: $poster_path, media_type: $media_type}) {
      id
    }
  }
`;

// Remove a movie from watchlist
export const REMOVE_WATCHLIST_MOVIE = gql`
  mutation RemoveWatchlistMovie($id: Int!) {
    delete_watchlist_movies(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;
