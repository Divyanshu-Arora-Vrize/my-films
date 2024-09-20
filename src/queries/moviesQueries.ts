// moviesQueries.ts
import { gql } from '@apollo/client';

// Define the GraphQL query
export const GET_FAVORITE_MOVIES = gql`
  query GetFavoriteMovies {
    favorite_movies {
      id
      title
      media_type
      poster_path
      release_date
    }
  }
`;
