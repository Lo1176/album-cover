import './App.css';
import { useAPIFetchQuery, useFetchAlbumsQuery } from './hooks/useFetchQuery';

function App() {
  const data = useAPIFetchQuery();
  const path = 'releases';
  const albums = useFetchAlbumsQuery(path);
  console.log('🚀 ~ App ~ albums:', albums);
  console.log('🍌 ~ App ~ data:', data);

  return <article>et hop</article>;
}

export default App;
