import { ReleasesTypes } from '../models/discogsTypes';

const uniqAndSortAlbums = (albums: ReleasesTypes[]) => {
  // remove album with undefined year
  const albumsWithReleasedYear = albums.filter(
    (album) => album.year !== undefined
  );

  // TODO add albums that are not on Discogs
  // ...

  const uniqueResults = [
    ...new Map(
      albumsWithReleasedYear.map((release) => [release.master_id, release])
    ).values(),
  ];
  console.log('🚀 ~ uniqAndSortAlbums ~ uniqueResults:', uniqueResults.length);
  // sort by year
  const sortedResults = uniqueResults.sort((a, b) => b.year - a.year);

  return sortedResults;
};

export default uniqAndSortAlbums;
