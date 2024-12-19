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

  const sortedResults = OrderByKeyName(uniqueResults, 'year', false);

  return sortedResults;
};

export const OrderByKeyName = (
  albums: ReleasesTypes[],
  keyName: 'year' | 'title',
  isAscending: boolean
): ReleasesTypes[] => {
  return albums.sort((a, b) => {
    if (keyName === 'year') {
      return isAscending ? a.year - b.year : b.year - a.year;
    }
    if (keyName === 'title') {
      return isAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0; // fallback in case of invalid or undefined keyName
  });
};

export default uniqAndSortAlbums;
