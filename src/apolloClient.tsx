import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { ReactNode } from 'react';

// Define the Hasura GraphQL endpoint and the admin secret
const HASURA_GRAPHQL_ENDPOINT = 'https://evident-gannet-27.hasura.app/v1/graphql';
const HASURA_ADMIN_SECRET = 'EitZ8Yq1hapXYEnSoJJjTQmhIeTZHJ7wMxFMvIo1VvuvxeFtlfPSwp0zGzKiAhAr';

// Create an HTTP link to connect with the Hasura GraphQL endpoint
const httpLink = createHttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
});

// Set up authentication with the admin secret
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
  };
});

// Initialize the Apollo Client with authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Configure caching as needed
});

// Define ApolloWrapper with proper typing for children
interface ApolloWrapperProps {
  children: ReactNode;
}

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
