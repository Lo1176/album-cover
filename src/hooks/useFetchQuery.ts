import { useQuery, UseQueryResult } from '@tanstack/react-query';
import uniqAndSortAlbums from '../functions/uniqAndSortAlbums';
import {
  DiscogsReleasesResponse,
  ReleasesTypes,
  ReleaseTypes,
} from '../models/discogsTypes';

const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;

export const useFetchReleaseQuery = (
  resourceUrl: string | undefined
): UseQueryResult<ReleaseTypes> => {
  return useQuery<ReleaseTypes>({
    // dès que resourceUrl change ça refetch
    queryKey: ['release', resourceUrl],
    queryFn: async () => {
      const result = await fetch(resourceUrl + `?token=${discogsToken}`);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json: ReleaseTypes = await result.json();
      return json; // Safely extract the desired key
    },
    enabled: !!resourceUrl, // Only fetch when resourceUrl is truthy so not undefined
  });
};

export const useFetchAllAlbumsByArtistNameQuery = (
  baseUrl: string = 'https://api.discogs.com/database/search',
  artistName: string = 'Laurent_Binder',
  token: string = discogsToken,
  type: 'release' | 'master' | 'artist' | 'label' = 'release',
  format?: 'album' | 'cd' | 'vinyl' | 'Compilation',
  perPage: string = '50'
): UseQueryResult<ReleasesTypes[]> => {
  return useQuery<ReleasesTypes[]>({
    queryKey: ['allAlbums', artistName],
    queryFn: async () => {
      let page = 1;
      let allAlbums: ReleasesTypes[] = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const searchUrl = `${baseUrl}?q=${artistName}&token=${token}${
          format ? `&format=${format}` : ''
        }${type ? `&type=${type}` : ''}&page=${page}&per_page=${perPage}`;
        console.log('🚀 ~ queryFn: ~ searchUrl:', searchUrl);

        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: DiscogsReleasesResponse = await response.json();
        console.log('🚀 ~ queryFn: ~ data:', data);

        allAlbums = [...allAlbums, ...data.results];

        if (page >= data.pagination.pages) {
          hasNextPage = false;
        } else {
          page++;
        }
      }
      // return allAlbums;
      return uniqAndSortAlbums(allAlbums);
    },
    staleTime: Infinity, // Optional: Prevents unnecessary re-fetching
  });
};
