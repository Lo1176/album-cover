import { useState } from 'react';
import Modal from 'react-modal';
import { Loading } from './components/Loading';
import { ModalCredits } from './components/ModalCredits';
import { findArtistRoleById } from './functions/findArtistRoleById';
import {
  useEnrichedReleasesQuery,
  useFetchCreditsAlbumQuery,
} from './hooks/useFetchQuery';
import { Album, Artist, ReleaseTypes } from './models/discogsTypes';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function App() {
  // const artistName: Credit['name'] = 'Laurent Binder';
  const artistId: Artist['id'] = 422014;
  const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
  // const apiSearchUrl = `https://api.discogs.com/database/search?q=${artistName}&token=${discogsToken}&type=release&page=4&per_page=12&sort=date_added&sort_order=dsc`;
  const sort: 'year' | 'title' | 'format' = 'year';
  const apiUrl = `https://api.discogs.com/artists/${artistId}/releases?token=${discogsToken}&page=1&per_page=12&sort=${sort}&sort_order=desc`;

  const { data, error, isLoading } = useEnrichedReleasesQuery(apiUrl);
  console.log('🚀 ~ data:', data);

  // State to track selected album's resource URL
  // const [fetchedAlbumData, setFetchedAlbumData] = useState({});
  const [resourceUrlAlbum, setResourceUrlAlbum] = useState<null | string>(null);
  // const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  // const [artistRole, setArtistRole] = useState<null | Artist>(null);
  const [albumDetails, setAlbumDetails] = useState<Album | null>(null);
  const {
    data: albumData,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useFetchCreditsAlbumQuery(resourceUrlAlbum);

  // useEffect(() => {
  //   if (albumData && resourceUrlAlbum) {
  //     const result = findArtistRoleById(albumData, artistId);
  //     setArtistRole(result);
  //     console.log('😊 ~ result:', result);
  //     console.log('⏱ ~ albumData:', albumData);
  //     setSelectedAlbumData(albumData);
  //   }
  // }, [albumData, resourceUrlAlbum]);

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

  const handleSelectAlbum = (album: ReleaseTypes) => {
    console.log('🚀 ~ handleSelectAlbum ~ album:', album);
    const albumData = {
      extraartists: album.extraartists,
      tracklist: album.tracklist,
    };

    const userCredit = findArtistRoleById(albumData, artistId);
    console.log('🚀 ~ handleSelectAlbum ~ artist:', userCredit);

    setAlbumDetails({
      cover_image: album.images[0].resource_url,
      artistAlbum: album.artists_sort,
      title: album.title,
      userCredit,
    });
    console.log('🚀 ~ App ~ AlbumDetails:', albumDetails);
  };

  if (isLoading) return <Loading text='Loading albums please wait...' />;
  if (error) return <div className='text-red-600'>Error: {error.message}</div>;

  // const { pagination, releases: albums } = data!;
  // console.log('🚀 ~ App ~ albums:', albums);

  const handleCloseModal = () => setResourceUrlAlbum(null);

  // const isModalShowing = artistRole && albumDetails && resourceUrlAlbum;
  const isModalShowing = albumDetails && resourceUrlAlbum;

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
          {data?.map(({ releaseData }, index) => {
            const { images, title } = releaseData;
            const coverImage = images[0].resource_url;

            return (
              <div key={index} className='group relative'>
                <img
                  width='300px'
                  height='300px'
                  src={coverImage}
                  alt={title}
                  onClick={() => handleSelectAlbum(releaseData)}
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
          {creditsIsLoading && <p>Loading credits...</p>}
          {creditsError && <p>Error: {creditsError.message}</p>}

          <ModalCredits
            // artistRole={artistRole}
            albumDetails={albumDetails}
            resourceUrlAlbum={resourceUrlAlbum}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}
    </article>
  );
}

export default App;
