import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  DiscogsReleasesResponse,
  MasterTypes,
  ReleasesTypes,
  ReleaseTypes,
} from '../models/discogsTypes';

interface EnrichedRelease {
  releaseData: ReleaseTypes;
  masterData?: MasterTypes; // Présent uniquement si type === "Master"
  originalType: ReleasesTypes['type'];
}

const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;

/** The generic T extends keyof DiscogsReleasesResponse ensures that T can only be 
a key of the DiscogsReleasesResponse interface (e.g., "pagination" or "releases").*/
export const useAPIFetchQuery = (
  apiUrl: string
): UseQueryResult<DiscogsReleasesResponse> => {
  return useQuery<DiscogsReleasesResponse>({
    queryKey: [apiUrl],
    queryFn: async () => {
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json: DiscogsReleasesResponse = await result.json();

      // Filter out duplicates based on master_id
      const uniqueResults = [];
      const seenMasterIds = new Set();

      for (const release of json.results) {
        if (!seenMasterIds.has(release.master_id)) {
          seenMasterIds.add(release.master_id);
          uniqueResults.push(release);
        }
        // sort by year
        const sortedResults = uniqueResults.sort((a, b) => b.year - a.year);
        // Stop adding once we reach 12 items
        if (sortedResults.length === 24) break;
      }

      return { ...json, results: uniqueResults }; // Return filtered results
    },
    // // I have to filter json.results.master_id
    // return json; // Safely extract the desired key
  });
};

// Hook pour gérer l'ensemble des fetch conditionnels
export const useEnrichedReleasesQuery = (
  apiUrl: string
): UseQueryResult<EnrichedRelease[]> => {
  return useQuery<EnrichedRelease[]>({
    queryKey: ['enrichedReleases', apiUrl],
    queryFn: async () => {
      // Étape 1 : Récupérer les données initiales
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json = await result.json();
      // Étape 2 : Traiter chaque release
      const releases = json.releases;
      const enrichedReleases: EnrichedRelease[] = [];
      //

      for (const release of releases) {
        if (release.type === 'master') {
          // Fetch Master Data
          const masterResult = await fetch(
            release.resource_url + `?token=${discogsToken}`
          );

          if (!masterResult.ok) {
            throw new Error(
              `Error fetching master data: ${masterResult.statusText}`
            );
          }
          const masterData: MasterTypes = await masterResult.json();

          // Fetch Release Data (utilisant masterData.resource_url)
          const releaseResult = await fetch(
            masterData.main_release_url + `?token=${discogsToken}`
          );

          if (!releaseResult.ok) {
            throw new Error(
              `Error fetching release data: ${releaseResult.statusText}`
            );
          }
          const releaseData: ReleaseTypes = await releaseResult.json();

          enrichedReleases.push({
            releaseData,
            masterData,
            originalType: release.type,
          });
        } else if (release.type === 'release') {
          // Fetch Release Data Directement
          const releaseResult = await fetch(
            release.resource_url + `?token=${discogsToken}`
          );
          if (!releaseResult.ok) {
            throw new Error(
              `Error fetching release data: ${releaseResult.statusText}`
            );
          }
          const releaseData: ReleaseTypes = await releaseResult.json();

          enrichedReleases.push({
            releaseData,
            originalType: release.type,
          });
        }
      }
      return enrichedReleases;
    },
  });
};

export const useFetchMasterQuery = (
  apiUrl: string
): UseQueryResult<MasterTypes> => {
  return useQuery<MasterTypes>({
    queryKey: [apiUrl],
    queryFn: async () => {
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }
      const json: MasterTypes = await result.json();
      return json; // Safely extract the desired key
    },
  });
};

export const useFetchReleaseQuery = (
  resourceUrl: string
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
