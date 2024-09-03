const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '13f430ed02218b907eb27d84dbbfa776'; // Your TMDB API key

interface Movie {
  title: string;
  release_date: string;
  id: number;
  media_type: string;
  poster_path: string;
}

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  success?: boolean;
  status_message?: string;
}

export const fetchMovies = async (query: string = ''): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    if (data.success !== false) {
      return data.results || []; // Ensure you return an array
    } else {
      console.error('Error fetching movies:', data.status_message);
      return []; // Return an empty array if the response is not successful
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // Return an empty array in case of error
  }
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    if (data.success !== false) {
      return data.results || []; // Ensure you return an array
    } else {
      console.error('Error fetching popular movies:', data.status_message);
      return []; // Return an empty array if the response is not successful
    }
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return []; // Return an empty array in case of error
  }
};
