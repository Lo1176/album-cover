import { FormEvent, useState } from 'react';

interface SearchBarProps {
  artistName: string;
  onSearch: (artistName: string) => void;
}

export const SearchBar = ({ artistName, onSearch }: SearchBarProps) => {
  const [nameValue, setNameValue] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevents page from reloading :)
    onSearch(nameValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex grow items-center gap-4 bg-transparent shadow-md'
    >
      <input
        type='text'
        placeholder={artistName === '' ? 'Artist Name' : artistName}
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value.toLowerCase())}
        className='w-full px-4 py-2 rounded-sm focus:outline-none focus:ring focus:ring-gray-500  bg-gray-900 text-white'
      />
      <button
        type='submit'
        disabled={nameValue.length < 3}
        className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring focus:ring-white transition-colors duration-300 ${
          nameValue.length < 8
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 focus:ring-blue-300'
        }`}
      >
        Search
      </button>
    </form>
  );
};
