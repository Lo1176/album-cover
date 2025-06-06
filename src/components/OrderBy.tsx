import { useEffect, useState } from 'react';
import arrow from '../assets/images/sort.png';
import OrderByKeyName from '../functions/orderByKeyName';
import { ReleasesTypes } from '../models/discogsTypes';

interface OrderByProps {
  albums: ReleasesTypes[];
  onSort: (sortedAlbums: ReleasesTypes[]) => void;
}

const OrderBy = ({ albums, onSort }: OrderByProps) => {
  const [keyName, setKeyName] = useState<'year' | 'artist'>('year');
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    const handleSort = () => {
      const sorted = OrderByKeyName([...albums], keyName, isAscending);
      onSort(sorted);
    };
    handleSort();
  }, [keyName, isAscending]);

  const imageStyle = {
    transform: isAscending ? 'rotate(180deg)' : '',
    filter: isAscending ? 'invert(100%) hue-rotate(90deg)' : 'invert(100%)',
  };

  return (
    <div className='flex'>
      <select
        value={keyName}
        onChange={(e) => setKeyName(e.target.value as 'year' | 'artist')}
        className='bg-gray-700 text-white text-sm rounded-s-lg hover:bg-gray-600 block p-4 focus-visible:outline-none border-s border-gray-600'
      >
        {['year', 'artist'].map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      <button
        className='transition-colors duration-300 p-2 text-xl bg-amber-600 hover:bg-amber-700 border-s-8 border-gray-700'
        onClick={() => {
          setIsAscending((prev) => !prev);
        }}
      >
        <img className='w-5' style={imageStyle} src={arrow} alt='arrow' />
      </button>
    </div>
  );
};

export default OrderBy;
