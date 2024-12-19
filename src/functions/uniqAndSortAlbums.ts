import { ReleasesTypes } from '../models/discogsTypes';

const uniqAndSortAlbums = (albums: ReleasesTypes[]) => {
  const albumsWithReleasedYear = albums.filter(
    (album) =>
      album.barcode.length !== 0 &&
      album.year !== undefined &&
      album.thumb !== ''
  );

  const uniqueResults = [
    ...new Map(
      albumsWithReleasedYear.map((release) => [release.master_id, release])
    ).values(),
  ];
  // sort by year
  const sortedResults = OrderByKeyName(uniqueResults, 'year', false);

  return sortedResults;
};

export const OrderByKeyName = (
  albums: ReleasesTypes[],
  keyName: 'year' | 'artist',
  isAscending: boolean
): ReleasesTypes[] => {
  return albums.sort((a, b) => {
    if (keyName === 'year') {
      return isAscending ? a.year - b.year : b.year - a.year;
    }
    if (keyName === 'artist') {
      return isAscending
        ? a.artist.localeCompare(b.artist)
        : b.artist.localeCompare(a.artist);
    }
    return 0; // fallback in case of invalid or undefined keyName
  });
};

export default uniqAndSortAlbums;
