import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Loading } from './components/Loading';
import { ModalCredits } from './components/ModalCredits';
import OrderBy from './components/OrderBy';
import { SearchBar } from './components/SearchBar';
import { findRoleByArtistId } from './functions/findRoleByArtistId';
import {
  useFetchAllAlbumsByArtistNameQuery,
  useFetchReleaseQuery,
} from './hooks/useFetchQuery';
import { Artist, ReleasesTypes, ReleaseTypes } from './models/discogsTypes';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function App() {
  const artistId: Artist['id'] = 422014;
  const [artistName, setArtistName] = useState<string>('');
  const [albums, setAlbums] = useState<ReleasesTypes[] | undefined>();
  // const [type, setType] = useState<SearchType>('release');
  // const [format, setFormat] = useState<SearchFormat>();

  const { data, isLoading, error, refetch } =
    useFetchAllAlbumsByArtistNameQuery(artistName); // add refetch?

  useEffect(() => {
    setAlbums(data);
  }, [data]);

  const handleSearch = (
    // newType: SearchType,
    // newFormat: SearchFormat,
    newArtistName: string
  ) => {
    // setType(newType);
    // setFormat(newFormat);
    setArtistName(newArtistName);
    refetch();
  };

  const [selectedAlbumDetails, setSelectedAlbumDetails] = useState<
    ReleaseTypes | null | undefined
  >(null);
  const [artistRole, setArtistRole] = useState<Artist | null>(null);
  const [resourceUrl, setResourceUrl] = useState<string | undefined>('');

  const {
    data: albumData,
    error: creditsError,
    isLoading: isCreditsLoading,
  } = useFetchReleaseQuery(resourceUrl);

  useEffect(() => {
    setSelectedAlbumDetails(albumData);
    if (albumData) {
      const { extraartists, tracklist }: ReleaseTypes = albumData;
      const roleByArtistId = findRoleByArtistId(
        extraartists,
        tracklist,
        artistId
      );
      setArtistRole(roleByArtistId);
    }
  }, [albumData, resourceUrl]);

  if (isLoading)
    return <Loading text='We are fetching albums please wait...' />;
  if (error) return <div className='text-red-600'>Error: {error.message}</div>;

  const handleCloseModal = () => {
    setSelectedAlbumDetails(null);
    setResourceUrl(undefined);
  };

  const isModalShowing = !!artistRole && !!selectedAlbumDetails;

  const handleSort = (sortedAlbums: ReleasesTypes[]) => {
    setAlbums(sortedAlbums);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {albums && <OrderBy albums={albums} onSort={handleSort} />}

      <article>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4'>
            {albums?.map((release, index) => {
              const { cover_image, titleArtistAndAlbum, resource_url } =
                release;

              return (
                <div key={index} className='group relative'>
                  <img
                    src={cover_image}
                    alt={`Cover of ${titleArtistAndAlbum}`}
                    onClick={() => setResourceUrl(resource_url)}
                    className='aspect-square w-full rounded-sm object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Display credits */}
        {isModalShowing && (
          <div>
            {isCreditsLoading && <p>Loading credits...</p>}
            {creditsError && <p>Error: {creditsError.message}</p>}

            <ModalCredits
              artistRole={artistRole}
              albumDetails={selectedAlbumDetails}
              handleCloseModal={handleCloseModal}
            />
          </div>
        )}
      </article>
    </>
  );
}

export default App;
