import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Credit, ModalCredits } from './components/ModalCredits';
import { findArtistById } from './functions/findArtistById';
import {
  useEnrichedReleasesQuery,
  useFetchCreditsAlbumQuery,
} from './hooks/useFetchQuery';
import { Album, MasterTypes, ReleaseTypes } from './models/discogsTypes';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function App() {
  // const artistName: Credit['name'] = 'Laurent Binder';
  const artistId: Credit['id'] = 422014;
  const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
  // const apiSearchUrl = `https://api.discogs.com/database/search?q=${artistName}&token=${discogsToken}&type=release&page=4&per_page=12&sort=date_added&sort_order=dsc`;
  const apiUrl = `https://api.discogs.com/artists/${artistId}/releases?token=${discogsToken}&page=1&per_page=12&srt=released&sort_order=desc`;

  const { data, error, isLoading } = useEnrichedReleasesQuery(apiUrl);
  console.log('🚀 ~ data:', data);

  // State to track selected album's resource URL
  const [fetchedAlbumData, setFetchedAlbumData] = useState({});
  const [resourceUrlAlbum, setResourceUrlAlbum] = useState<null | string>(null);
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  const [artistRole, setArtistRole] = useState<null | Credit>(null);
  const [albumCoverAndTitle, setAlbumCoverAndTitle] = useState<Album | null>(
    null
  );
  const {
    data: albumData,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useFetchCreditsAlbumQuery(resourceUrlAlbum);

  useEffect(() => {
    if (albumData && resourceUrlAlbum) {
      const result = findArtistById(albumData, artistId);
      setArtistRole(result);
      console.log('😊 ~ result:', result);
      console.log('⏱ ~ albumData:', albumData);
      setSelectedAlbumData(albumData);
    }
  }, [albumData, resourceUrlAlbum]);

  // useEffect(() => {
  //   if (data?.releases) {
  //     const fetchAlbumDetails = () => {
  //       const fetchedData = {};
  //       for (const album of data.releases) {
  //         const resourceUrl = album.resource_url;
  //         const response =
  //           album.type === 'release'
  //             ? useFetchReleaseQuery(resourceUrl)
  //             : useFetchMasterQuery(resourceUrl);

  //         fetchedData[album.id] = response;
  //       }
  //       setFetchedAlbumData(fetchedData);
  //     };

  //     fetchAlbumDetails();
  //   }
  // }, [data]);

  const handleSelectAlbum = (album: {
    resource_url: MasterTypes | ReleaseTypes;
    title: string;
    thumb: string;
  }) => {
    setAlbumCoverAndTitle({
      cover_image: album.thumb,
      title: album.title,
    });
    console.log('🚀 ~ App ~ AlbumCoverAndTitle:', albumCoverAndTitle);
    setResourceUrlAlbum(album.resource_url);
  };

  if (isLoading) return <div className='text-green-600'>Loading...</div>;
  if (error) return <div className='text-red-600'>Error: {error.message}</div>;

  const { pagination, releases: albums } = data!;
  // console.log('🚀 ~ App ~ albums:', albums);

  const handleCloseModal = () => setResourceUrlAlbum(null);

  const isModalShowing = artistRole && albumCoverAndTitle && resourceUrlAlbum;

  // const useFetchReleaseData = (resourceUrl: string) =>
  //   useFetchReleaseQuery(resourceUrl);
  // const useFetchAlbums = albums?.map((album) => {
  //   album.type === 'release'
  //     ? useFetchReleaseQuery(album.resource_url)
  //     : useFetchMasterQuery(album.resource_url);
  // });

  return (
    <article className=''>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4'>
          {data?.map((album, index) => {
            // console.log('🚀 ~ {releaseData?.map ~ album:', album);
            // const releasedAlbum = useFetchAlbums[index];
            // console.log('💿 ~ {albums?.map ~ releasedAlbum:', releasedAlbum);

            return (
              <div key={index} className='group relative'>
                <img
                  width='300px'
                  height='300px'
                  src={album.releaseData.images[0].resource_url}
                  alt={album.releaseData.title}
                  // onClick={() => handleSelectAlbum(album)}
                  // className='aspect-square w-full rounded-sm object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Display credits */}
      {isModalShowing && (
        <div>
          {creditsIsLoading && <p>Loading credits...</p>}
          {creditsError && <p>Error: {creditsError.message}</p>}

          <ModalCredits
            artistRole={artistRole}
            albumCoverAndTitle={albumCoverAndTitle}
            resourceUrlAlbum={resourceUrlAlbum}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}
    </article>
  );
}

export default App;
