import './App.css';
import { useFetchQuery } from './hooks/useFetchQuery';

function App() {
  const path = '?page=1&per_page=2';
  const data = useFetchQuery(path);
  console.log('🚀 ~ App ~ data:', data);
  return <article>Hello</article>;
}

export default App;
