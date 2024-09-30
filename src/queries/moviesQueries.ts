import { gql } from '@apollo/client';

// Fetch favorite movies
export const GET_FAVORITE_MOVIES = gql`
  query GetFavoriteMovies {
    favorite_movies {
      id
      title
      release_date
      poster_path
      media_type
    }
  }
`;

// Add a movie to favorites
export const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie($id: Int!, $title: String!, $release_date: String!, $poster_path: String!, $media_type: String!) {
    insert_favorite_movies_one(object: {id: $id, title: $title, release_date: $release_date, poster_path: $poster_path, media_type: $media_type}) {
      id
    }
  }
`;

// Remove a movie from favorites
export const REMOVE_FAVORITE_MOVIE = gql`
  mutation RemoveFavoriteMovie($id: Int!) {
    delete_favorite_movies(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;
