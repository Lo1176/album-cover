import { useQuery, UseQueryResult } from '@tanstack/react-query';
import uniqAndSortAlbums from '../functions/uniqAndSortAlbums';
import {
  DiscogsReleasesResponse,
  ReleasesTypes,
  ReleaseTypes,
} from '../models/discogsTypes';

const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;

export type SearchType = 'release' | 'master' | 'artist' | 'label' | undefined;
export type SearchFormat = 'album' | 'cd' | 'vinyl' | 'Compilation' | undefined;

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

export const useFetchArtistIdQuery = (baseUrl: string, artistName: string) => {
  return useQuery({
    queryKey: ['artistId'],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?q=${artistName === '' ? 'laurent_binder' : artistName}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const fetchArtistId = await response.json();
      console.log('👨‍🎤 ~ useFetchArtistIdQuery ~ FetchArtistId:', fetchArtistId);
      return fetchArtistId;
    },
  });
};

export const useFetchAllAlbumsByArtistNameQuery = (
  artistName: string = '',
  type: SearchType = 'release',
  format?: SearchFormat,
  perPage: string = '50'
): UseQueryResult<ReleasesTypes[]> => {
  return useQuery<ReleasesTypes[]>({
    queryKey: ['allAlbums', artistName, type, format],
    queryFn: async () => {
      const baseUrl: string = 'https://api.discogs.com/database/search';
      const token: string = discogsToken;
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
