import { ReleasesTypes } from '../models/discogsTypes';

const uniqAndSortAlbums = (albums: ReleasesTypes[]) => {
  // remove album with undefined year
  const albumsWithReleasedYear = albums.filter(
    (album) =>
      // album.barcode.length !== 0 &&
      album.year !== undefined && album.thumb !== ''
  );

  // TODO add albums that are not on Discogs
  // ...push me in :)

  const uniqueResults = [
    ...new Map(
      albumsWithReleasedYear.map((release) => [release.master_id, release])
    ).values(),
  ];
  // sort by year
  const sortedResults = uniqueResults.sort((a, b) => b.year - a.year);

  return sortedResults;
};

export default uniqAndSortAlbums;
