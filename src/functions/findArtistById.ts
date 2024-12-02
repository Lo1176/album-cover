import { Artist } from '../models/discogsTypes';

type Track = {
  position: string;
  type_: string;
  title: string;
  extraartists: Artist[];
};

type Data = {
  extraartists: Artist[];
  tracklist: Track[];
};

export function findArtistById(
  data: Data,
  id: number
): { name: string; role: string[]; id: number } | null {
  const rolesSet = new Set<string>();
  let artistName: string | null = null;

  // Helper function to process extraartists array
  const processExtraArtists = (extraartists: Artist[]) => {
    extraartists?.forEach((artist) => {
      if (parseInt(artist.id) === id) {
        artistName = artist.name; // Assign the name if it matches
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
    role: Array.from(rolesSet),
    id: id,
  };
}
