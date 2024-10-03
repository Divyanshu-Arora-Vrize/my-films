export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type?: string;  // Optional media_type
}
