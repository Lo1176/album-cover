import { useQuery } from '@tanstack/react-query';
import DiscogsResponse from '../models/discogsResponse';

const endpoint = 'https://api.discogs.com/artists/';
const artistId = '422014';
const userName = 'Lo1176';
const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
const apiUrl = `https://api.discogs.com/users/${userName}/collection/folders/0/releases?token=${discogsToken}&per_page=100&sort=artist`;
// console.log('fullPath', apiUrl);

export const useAPIFetchQuery = <T extends keyof DiscogsResponse>() => {
  const { isLoading, error, data } = useQuery({
    queryKey: [apiUrl],
    queryFn: async () =>
      await fetch(apiUrl).then(
        (result) => result.json() as Promise<DiscogsResponse[T]>
      ),
  });
  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return data;
};

export const useFetchAlbumsQuery = <T extends keyof DiscogsResponse>(
  path: T
) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [path],
    queryFn: async () =>
      await fetch(endpoint + artistId + '/' + path).then(
        (result) => result.json() as Promise<DiscogsResponse[T]>
      ),
  });
  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return data?.releases;
};
