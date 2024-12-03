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
  cover_image: Album['cover_image'];
  id: number;
  thumb: string;
  year: number;
  title: Album['title'];
  genres: string[];
  styles: string[];
  artists: Artist[];
  master_url: string;
  resource_url: string;
  formats: Formats[];
}

export interface Album {
  cover_image: string;
  title: string;
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
