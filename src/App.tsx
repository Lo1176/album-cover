import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { Credit, ModalCredits } from './components/ModalCredits';
import { artistId } from './constants/api';
import { findArtistById } from './functions/findArtistById';
import {
  useAPIFetchQuery,
  useFetchCreditsAlbumQuery,
} from './hooks/useFetchQuery';
import { Album } from './models/discogsTypes';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function App() {
  const artistName = 'Laurent Binder';
  const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
  const apiUrl = `https://api.discogs.com/database/search?q=${artistName}&token=${discogsToken}&type=release&page=1&per_page=12&sort=date_added&sort_order=dsc`;

  const { data, error, isLoading } = useAPIFetchQuery(apiUrl);
  console.log('🚀 ~ data:', data);

  // State to track selected album's resource URL
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

  const handleSelectAlbum = (album: {
    resource_url: string;
    title: string;
    cover_image: string;
  }) => {
    setAlbumCoverAndTitle({
      cover_image: album.cover_image,
      title: album.title,
    });
    setResourceUrlAlbum(album.resource_url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { pagination, results: albums } = data!;

  const handleCloseModal = () => setResourceUrlAlbum(null);

  const isModalShowing = artistRole && albumCoverAndTitle && resourceUrlAlbum;

  return (
    <article>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {albums.map((album) => (
          <div key={album.id}>
            <h2>{album.title}</h2>
            <img
              src={album.cover_image}
              alt={album.title}
              onClick={() => handleSelectAlbum(album)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
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
