import DiscogsTypes from './discogsTypes';

interface DiscogsResponse {
  pagination: Pagination;
  releases: DiscogsTypes[];
}

interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: string;
}
export default DiscogsResponse;
