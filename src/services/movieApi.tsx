const BASE_URL = 'https://api.tvmaze.com';

interface Movie {
  title: string;
  release_date: string;
  id: number;
  media_type: string;
  poster_path: string;
}

interface TVMazeShow {
  name: string;
  premiered: string;
  id: number;
  image: { medium: string } | null;
}

// Function to fetch shows based on a search query
export const fetchMovies = async (query: string = ''): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    const data: { show: TVMazeShow }[] = await response.json();

    // Mapping TVMaze show data to your Movie interface
    return data.map((item) => ({
      title: item.show.name,
      release_date: item.show.premiered,
      id: item.show.id,
      media_type: 'show',
      poster_path: item.show.image ? item.show.image.medium : '', // Use the image if available
    }));
  } catch (error) {
    console.error('Error fetching shows:', error);
    return []; // Return an empty array in case of error
  }
};

// Function to fetch shows for the homepage
export const fetchHomepageShows = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    const data: TVMazeShow[] = await response.json();

    // Mapping TVMaze show data to your Movie interface
    return data.map((show) => ({
      title: show.name,
      release_date: show.premiered,
      id: show.id,
      media_type: 'show',
      poster_path: show.image ? show.image.medium : '', // Use the image if available
    }));
  } catch (error) {
    console.error('Error fetching homepage shows:', error);
    return []; // Return an empty array in case of error
  }
};
