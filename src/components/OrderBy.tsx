import { useState } from 'react';
import arrow from '../assets/images/sort.png';
import { OrderByKeyName } from '../functions/uniqAndSortAlbums';
import { ReleasesTypes } from '../models/discogsTypes';

interface OrderByProps {
  albums: ReleasesTypes[];
  onSort: (sortedAlbums: ReleasesTypes[]) => void;
}

const OrderBy = ({ albums, onSort }: OrderByProps) => {
  const [keyName, setKeyName] = useState<'year' | 'title'>('year');
  const [isAscending, setIsAscending] = useState(false);
  console.log('🚀 ~ OrderBy ~ isAscending:', isAscending);

  const keyOptions = ['year', 'title'];

  const handleSort = () => {
    const sorted = OrderByKeyName([...albums], keyName, isAscending);
    onSort(sorted);
  };

  const imageStyle = {
    transform: isAscending ? 'rotate(180deg)' : '',
    filter: isAscending ? 'invert(100%) hue-rotate(90deg)' : 'invert(100%)',
  };

  return (
    <div className='flex'>
      <select
        value={keyName}
        onChange={(e) => setKeyName(e.target.value as 'year' | 'title')}
        className='bg-gray-700 text-white text-sm rounded-s-lg focus:ring hover:bg-gray-600 focus:ring-gray-700 focus:border-gray-500 block p-4 focus-visible:outline-none border-s border-gray-600'
      >
        {keyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        className='transition-colors duration-300 p-2 text-xl bg-amber-600 hover:bg-amber-700 border-s-8 border-gray-700'
        onClick={() => {
          setIsAscending(!isAscending);
          handleSort();
        }}
      >
        <img className='w-5' style={imageStyle} src={arrow} alt='arrow' />
      </button>
    </div>
  );
};

export default OrderBy;
