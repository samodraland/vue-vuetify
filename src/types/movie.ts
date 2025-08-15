export interface MovieList {
  Title: string,
  Year: number,
  imdbID: string
}

export interface MovieInterface{
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: MovieList[];
}
