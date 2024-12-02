export interface DiscogsResponse {
  pagination: Pagination;
  results: DiscogsTypes[];
}
interface Pagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
  urls: string;
}
export interface DiscogsTypes {
  cover_image: string;
  id: number;
  thumb: string;
  year: number;
  title: string;
  genres: string[];
  styles: string[];
  artists: Artist[];
  master_url: string;
  resource_url: string;
  formats: Formats[];
}

interface Formats {
  descriptions: string[];
  name: string;
  qty: string;
  text: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
}
