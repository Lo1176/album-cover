import { Artist, ReleaseTypes } from '../models/discogsTypes';

type Data = {
  extraartists: Artist[];
  tracklist: ReleaseTypes['tracklist'];
};

export function findArtistRoleById(data: Data, id: number): Artist | null {
  const displayRoles = (roles: Artist['role'][]) =>
    roles.join(', ').toLowerCase();
  const rolesSet = new Set<string>();
  let artistName: string | null = null;
  let resourceUrl: string = '';

  // Helper function to process extraartists array
  const processExtraArtists = (extraartists: Artist[]) => {
    extraartists?.forEach((artist) => {
      if (artist.id === id) {
        artistName = artist.name; // Assign the name if it matches
        resourceUrl = artist.resource_url;
        artist.role.split(',').map((role) => rolesSet.add(role.trim())); // Split and add roles
      }
    });
  };

  // Process root-level extraartists
  processExtraArtists(data?.extraartists);

  // Process tracklist-level extraartists
  data?.tracklist.forEach((track) => processExtraArtists(track?.extraartists));

  // If no artist found, return null
  if (!artistName) return null;

  // Convert rolesSet to an array and return the final object
  return {
    name: artistName,
    role: displayRoles(Array.from(rolesSet)),
    id,
    resource_url: resourceUrl,
  };
}
