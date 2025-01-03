import { ReleasesTypes } from '../models/discogsTypes';
import OrderByKeyName from './orderByKeyName';

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

export default uniqAndSortAlbums;
