import { useState } from 'react';
import { OrderByKeyName } from '../functions/uniqAndSortAlbums';
import { ReleasesTypes } from '../models/discogsTypes';

interface OrderByProps {
  albums: ReleasesTypes[];
  onSort: (sortedAlbums: ReleasesTypes[]) => void;
}

const OrderBy = ({ albums, onSort }: OrderByProps) => {
  const [keyName, setKeyName] = useState<'year' | 'artist'>('year');
  const [isAscending, setIsAscending] = useState(false);

  const keyOptions = ['year', 'artist'];

  const handleSort = () => {
    const sorted = OrderByKeyName([...albums], keyName, isAscending);
    onSort(sorted);
  };

  return (
    <div className='flex gap-4'>
      <select
        value={keyName}
        onChange={(e) => setKeyName(e.target.value as 'year' | 'artist')}
        className='flex-1 px-4 py-2 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 bg-gray-900 text-white'
      >
        {keyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        className='p-2 text-xl bg-gray-800 text-white rounded'
        onClick={() => setIsAscending(true)}
      >
        ↑
      </button>
      <button
        className='p-2 text-xl bg-gray-800 text-white rounded'
        onClick={() => setIsAscending(false)}
      >
        ↓
      </button>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded'
        onClick={handleSort}
      >
        Sort
      </button>
    </div>
  );
};

export default OrderBy;
