export interface DiscogsReleasesResponse {
  pagination: Pagination;
  results: ReleasesTypes[];
}
interface Pagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
  urls: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
}

export interface ReleasesTypes {
  artist: string;
  barcode: [];
  id: number;
  main_release: number;
  master_id: number;
  resource_url: string;
  role: string;
  thumb: string;
  cover_image: string;
  title: string;
  type: 'master' | 'release' | 'artist' | 'label';
  year: number;
}
export interface MasterTypes {
  id: number;
  main_release_url: string;
}
export interface ReleaseTypes {
  id: number;
  title: string;
  released: string;
  artists_sort: string;
  images: CoverAlbum[];
  extraartists: Artist[];
  tracklist: Track[];
  artist?: string;
  year: number;
  // resource_url: string;
}

type Track = {
  position: string;
  type_: string;
  title: string;
  extraartists: Artist[];
};

export interface CoverAlbum {
  // parfois que "secondary" donc prendre images[0]["resource_url"]
  type: 'primary' | 'secondary';
  uri: string;
  resource_url: string;
  uri150: string;
}

export interface Album {
  cover_image: string;
  title: string;
  userCredit: Artist | null;
  artistAlbum: string;
  resourceUrlAlbum: string;
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
interface Formats {
  descriptions: string[];
  name: string;
  qty: string;
  text: string;
}

export interface Artist {
  id: number;
  name: string;
  role: string;
  resource_url: string;
}
