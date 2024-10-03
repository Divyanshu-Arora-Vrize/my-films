import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './styles.css'; // Ensure your global styles are imported
import { SnackbarProvider } from 'notistack';

// Step 1: Create the Apollo Client
const client = new ApolloClient({
  uri: 'https://evident-gannet-27.hasura.app/v1/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(), // Step 2: Set up in-memory caching
});

// Step 3: Wrap the App component with ApolloProvider and pass in the Apollo Client
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={3}>
      <App />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>
);
