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
    <form onSubmit={handleSubmit} className='grow max-w-md mx-auto'>
      <div className='relative'>
        <input
          type='text'
          placeholder={artistName === '' ? 'Artist Name' : artistName}
          value={nameValue}
          required
          onChange={(e) => setNameValue(e.target.value.toLowerCase())}
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-e-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <button
          type='submit'
          disabled={nameValue.length < 3}
          className={`absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ${
            nameValue.length < 8
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-300 text-white'
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
};
