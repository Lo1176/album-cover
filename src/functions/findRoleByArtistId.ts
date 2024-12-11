import { Artist, ReleaseTypes } from '../models/discogsTypes';

function formatString(str: string): string {
  const regex = /\[(.*)]$/;
  const match = str.match(regex);

  if (match) {
    const bracketsContent = match[1];
    const remainingString = str.replace(regex, '');
    return bracketsContent + ' ' + remainingString.trim();
  } else {
    return str.trim();
  }
}

export function findRoleByArtistId(
  extraartists: ReleaseTypes['extraartists'],
  tracklist: ReleaseTypes['tracklist'],
  id: number
): Artist | null {
  const displayRoles = (roles: Artist['role'][]) =>
    roles.join(', ').toLowerCase();
  const rolesSet = new Set<string>();
  let artistName: string | null = null;
  let resourceUrl: string = '';
  const regex = /,(?![^\\[]*\])/g;

  // Helper function to process extraartists array
  const processExtraArtists = (extraartists: Artist[]) => {
    extraartists?.forEach((artist) => {
      if (artist.id === id) {
        artistName = artist.name;
        resourceUrl = artist.resource_url;
        artist.role.split(regex).map((role) => {
          rolesSet.add(formatString(role));
        });
      }
    });
  };

  // Process "root-level" extraartists
  processExtraArtists(extraartists);

  // Process "tracklist-level" extraartists
  tracklist.forEach((track) => processExtraArtists(track?.extraartists));

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
