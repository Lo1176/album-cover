import { useQuery, UseQueryResult } from '@tanstack/react-query';
import uniqAndSortAlbums from '../functions/uniqAndSortAlbums';
import {
  ArtistInformations,
  DiscogsReleasesResponse,
  ReleasesTypes,
  ReleaseTypes,
} from '../models/discogsTypes';

const token: string = import.meta.env.VITE_DISCOGS_TOKEN;
const baseUrl: string = 'https://api.discogs.com/database/search';

type SearchType = 'release' | 'master' | 'artist' | 'label' | undefined;
type SearchFormat = 'album' | 'cd' | 'vinyl' | 'Compilation' | undefined;

// fetch all albums by artist name
export const useFetchAllAlbumsByArtistNameQuery = (
  artistName: string = '',
  type: SearchType = 'release',
  format?: SearchFormat,
  perPage: string = '50'
): UseQueryResult<ReleasesTypes[]> => {
  return useQuery<ReleasesTypes[]>({
    queryKey: ['allAlbums', artistName, type, format],
    queryFn: async () => {
      let page = 1;
      let allAlbums: ReleasesTypes[] = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const searchUrl = `${baseUrl}?q=${
          artistName === '' ? 'laurent_binder' : artistName
        }&token=${token}${format ? `&format=${format}` : ''}${
          type ? `&type=${type}` : ''
        }&page=${page}&per_page=${perPage}`;

        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: DiscogsReleasesResponse = await response.json();
        if (data.pagination.items > 500) {
          allAlbums = [...allAlbums, ...data.results];
          return uniqAndSortAlbums(allAlbums);
        }

        allAlbums = [...allAlbums, ...data.results];

        if (page >= data.pagination.pages) {
          hasNextPage = false;
        } else {
          page++;
        }
      }
      return uniqAndSortAlbums(allAlbums);
    },
    staleTime: Infinity, // Optional: Prevents unnecessary re-fetching
  });
};

// Fetch an album
export const useFetchReleaseQuery = (
  resourceUrl: string | undefined
): UseQueryResult<ReleaseTypes> => {
  return useQuery<ReleaseTypes>({
    // dès que resourceUrl change ça refetch
    queryKey: ['release', resourceUrl],
    queryFn: async () => {
      const result = await fetch(resourceUrl + `?token=${token}`);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json: ReleaseTypes = await result.json();
      return json; // Safely extract the desired key
    },
    enabled: !!resourceUrl, // Only fetch when resourceUrl is truthy so not undefined
  });
};

// fetch artist informations
export const useFetchArtistInformationsQuery = (
  artistName: string
): UseQueryResult<ArtistInformations> => {
  return useQuery({
    queryKey: ['artistInformations', artistName],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?q=${
          artistName === '' ? 'laurent_binder' : artistName
        }&token=${token}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: DiscogsReleasesResponse = await response.json();
      localStorage.setItem(
        'artist_informations',
        JSON.stringify(data.results[0])
      );
      return data.results[0];
    },
  });
};
