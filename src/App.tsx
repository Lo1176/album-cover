import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Loading } from './components/Loading';
import { ModalCredits } from './components/ModalCredits';
import { findRoleByArtistId } from './functions/findRoleByArtistId';
import { useAPIFetchQuery, useFetchReleaseQuery } from './hooks/useFetchQuery';
import { Artist, ReleaseTypes } from './models/discogsTypes';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function App() {
  // const artistName: string = '422014-Laurent-Binder';
  const artistName: string = 'Laurent Binder';
  const artistId: Artist['id'] = 422014;
  const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
  const searchUrl = `https://api.discogs.com/database/search?q=${artistName}&token=${discogsToken}&country=france&type=release&page=1&per_page=36&sort_by=asc`;

  const { data, error, isLoading } = useAPIFetchQuery(searchUrl);
  const [albumDetails, setAlbumDetails] = useState<ReleaseTypes | undefined>(
    undefined
  );
  const [artistRole, setArtistRole] = useState<Artist | null>(null);
  const [resourceUrl, setResourceUrl] = useState<string>('');
  const {
    data: albumData,
    error: creditsError,
    isLoading: isCreditsLoading,
  } = useFetchReleaseQuery(resourceUrl);

  useEffect(() => {
    setAlbumDetails(albumData);
    if (albumData) {
      const { extraartists, tracklist }: ReleaseTypes = albumData;
      const roleByArtistId = findRoleByArtistId(
        extraartists,
        tracklist,
        artistId
      );
      setArtistRole(roleByArtistId);
    }
  }, [albumData]);
  // console.log('🚀 ~ App ~ albumData:', albumData);

  // const handleSelectAlbum = (resource_url: string) => {
  //   setResourceUrl(resource_url);
  // };

  if (isLoading) return <Loading text='Loading albums please wait...' />;
  if (error) return <div className='text-red-600'>Error: {error.message}</div>;

  const handleCloseModal = () => {
    setAlbumDetails(undefined);
  };

  const isModalShowing = albumDetails && artistRole;

  return (
    <article className=''>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4'>
          {data?.results.map((release, index) => {
            const { cover_image, titleArtistAndAlbum, resource_url } = release;

            return (
              <div key={index} className='group relative'>
                <img
                  src={cover_image}
                  alt={`Cover of ${titleArtistAndAlbum}`}
                  onClick={() => setResourceUrl(resource_url)}
                  className='aspect-square w-full rounded-sm object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
                />
              </div>
              // <AlbumItem
              //   key={index}
              //   coverImage={cover_image}
              //   titleArtistAndAlbum={titleArtistAndAlbum}
              //   resourceUrl={resource_url}
              //   onAlbumSelect={setResourceUrl(resource_url)}
              //   }
              //   // artistId={artistId}
              // />
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
            albumDetails={albumDetails}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}
    </article>
  );
}

export default App;
