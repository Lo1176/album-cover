interface AlbumItemParams {
  coverImage: string;
  titleArtistAndAlbum: string;
  // resourceUrl: string;
  onAlbumSelect: () => void;
  // artistId: number;
}

export const AlbumItem = ({
  coverImage,
  titleArtistAndAlbum,
  // resourceUrl,
  onAlbumSelect,
}: // artistId,
AlbumItemParams) => {
  // const { data: albumData } = useFetchReleaseQuery(resourceUrl);
  return (
    <div className='group relative'>
      <img
        src={coverImage}
        alt={`Cover of ${titleArtistAndAlbum}`}
        onClick={onAlbumSelect}
        className='aspect-square w-full rounded-sm object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
      />
    </div>
  );
};
