import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DiscogsResponse } from '../models/discogsTypes';

/** The generic T extends keyof DiscogsResponse ensures that T can only be 
a key of the DiscogsResponse interface (e.g., "pagination" or "results").*/
export const useAPIFetchQuery = (
  apiUrl: string
): UseQueryResult<DiscogsResponse> => {
  return useQuery<DiscogsResponse>({
    queryKey: [apiUrl],
    queryFn: async () => {
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json: DiscogsResponse = await result.json();
      return json; // Safely extract the desired key
    },
  });
};

// Hook for fetching album credits
export const useFetchCreditsAlbumQuery = (resourceUrl: string | null) => {
  return useQuery({
    queryKey: ['credits', resourceUrl],
    queryFn: async () => {
      if (!resourceUrl) throw new Error('Invalid resource URL');
      const res = await fetch(resourceUrl);
      if (!res.ok) {
        throw new Error(`Error fetching credits: ${res.statusText}`);
      }
      return res.json();
    },
    enabled: !!resourceUrl, // Only fetch when resourceUrl is truthy
  });
};
