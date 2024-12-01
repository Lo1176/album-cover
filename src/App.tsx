import { useState } from 'react';
import './App.css';
import { Modal } from './components/Modal';
import {
  useAPIFetchQuery,
  useFetchCreditsAlbumQuery,
} from './hooks/useFetchQuery';

function App() {
  const artistName = 'Laurent Binder';
  const discogsToken = import.meta.env.VITE_DISCOGS_TOKEN;
  const apiUrl = `https://api.discogs.com/database/search?q=${artistName}&token=${discogsToken}&type=release&page=1&per_page=12&sort=date_added&sort_order=dsc`;

  const { data, error, isLoading } = useAPIFetchQuery(apiUrl);

  // State to track selected album's resource URL
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useFetchCreditsAlbumQuery(selectedAlbum);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { pagination, results: albums } = data!;

  const handleCloseModal = () => setSelectedAlbum(null);

  return (
    <article>
      {albums.map((album) => (
        <>
          <div key={album.id}>
            <h2>{album.title}</h2>
            <img
              src={album.cover_image}
              alt={album.title}
              onClick={() => setSelectedAlbum(album.resource_url)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {/* Display credits */}
          {selectedAlbum && (
            <div>
              {creditsIsLoading && <p>Loading credits...</p>}
              {creditsError && <p>Error: {creditsError.message}</p>}
              {credits && (
                <Modal
                  coverImage={album.cover_image}
                  title={album.title}
                  credits={credits}
                  handleCloseModal={handleCloseModal}
                />
              )}
            </div>
          )}
        </>
      ))}
    </article>
  );
}

export default App;
