import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      title
      release_date
      poster_path
    }
  }
`;

export const GET_HOMEPAGE_SHOWS = gql`
  query GetHomepageShows {
    homepageShows {
      id
      title
      release_date
      poster_path
    }
  }
`;