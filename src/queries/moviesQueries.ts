// src/queries/queries.ts
import { gql } from '@apollo/client';

// Query to get all favorite movies
export const GET_FAVORITE_MOVIES = gql`
  query GetFavoriteMovies {
     FavoriteMovies {
      id
      title
      release_date
      poster_path
      media_type
    }
  }
`;

// Query to get all watchlist movies
export const GET_WATCHLIST_MOVIES = gql`
  query GetWatchlistMovies {
    Watchlist {
      id
      title
      release_date
      poster_path
      media_type
    }
  }
`;

// Mutation to add a movie to the favorites list
export const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie($id: Int!, $title: String!, $release_date: date!, $poster_path: String!) {
    insert_FavoriteMovies_one(object: {
      id: $id,
      title: $title,
      release_date: $release_date,
      poster_path: $poster_path
    }) {
      id
    }
  }
`;

// Mutation to remove a movie from the favorites list
export const REMOVE_FAVORITE_MOVIE = gql`
  mutation RemoveFavoriteMovie($id: Int!) {
    delete_FavoriteMovies_by_pk(id: $id) {
      id
    }
  }
`;

// Mutation to add a movie to the watchlist
export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($id: Int!, $title: String!, $release_date: date!, $poster_path: String!) {
    insert_Watchlist_one(object: {
      id: $id,
      title: $title,
      release_date: $release_date,
      poster_path: $poster_path
    }) {
      id
    }
  }
`;

// Mutation to remove a movie from the watchlist
export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($id: Int!) {
    delete_Watchlist_by_pk(id: $id) {
      id
    }
  }
`;
