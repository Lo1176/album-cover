import DiscogsTypes from './discogsTypes';

interface DiscogsResponse {
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

export default DiscogsResponse;
