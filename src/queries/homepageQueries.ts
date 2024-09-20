import { gql } from '@apollo/client';

export const GET_HOMEPAGE_SHOWS = gql`
  query GetHomepageShows {
    movies {
      id
      title
      release_date
      poster_path
    }
  }
`;
