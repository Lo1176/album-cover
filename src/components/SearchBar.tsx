import { FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (
    // type: 'release' | 'master' | 'artist' | 'label' | undefined,
    // format: 'album' | 'cd' | 'vinyl' | 'Compilation' | undefined,
    artistName: string
  ) => void;
}

// export type SearchType = Parameters<SearchBarProps['onSearch']>[0];
// export type SearchFormat = Parameters<SearchBarProps['onSearch']>[1];

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  // const [type, setType] = useState<SearchType>('release');
  // const [format, setFormat] = useState<SearchFormat>();
  const [artistName, setArtistName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevents page from reloading :)
    onSearch(artistName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-4 p-4 bg-transparent shadow-md'
    >
      <input
        type='text'
        placeholder={artistName === '' ? 'Artist Name' : artistName}
        value={artistName}
        onChange={(e) => setArtistName(e.target.value.toLowerCase())}
        className='w-full px-4 py-2 rounded-sm focus:outline-none focus:ring focus:ring-gray-500  bg-gray-900 text-white'
      />
      {/* <div className='flex gap-4'>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SearchType)}
          className='flex-1 px-4 py-2 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 bg-gray-900 text-white'
        >
          <option value='release'>Release</option>
          <option value='master'>Master</option>
          <option value='artist'>Artist</option>
          <option value='label'>Label</option>
        </select>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as SearchFormat)}
          className='flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500 bg-gray-900 text-white'
        >
          <option value=''>Any Format</option>
          <option value='album'>Album</option>
          <option value='cd'>CD</option>
          <option value='vinyl'>Vinyl</option>
          <option value='Compilation'>Compilation</option>
        </select>
      </div> */}
      <button
        type='submit'
        disabled={artistName.length < 3}
        className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
          artistName.length < 8
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 focus:ring-blue-300'
        }`}
      >
        Search
      </button>
    </form>
  );
};
