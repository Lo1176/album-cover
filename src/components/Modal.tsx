import { FC } from 'react';
import DiscogsTypes from '../models/discogsTypes';

interface ModalProps {
  coverImage: DiscogsTypes['cover_image'];
  title: DiscogsTypes['title'];
  handleCloseModal: () => void;
  credits: Credit[];
}

interface Credit {
  name: string;
  role: string;
  id: number;
}

export const Modal: FC<ModalProps> = ({
  coverImage,
  title,
  credits,
  handleCloseModal,
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative'>
        <button
          onClick={handleCloseModal}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        <img
          src={coverImage}
          alt={title}
          className='w-full h-auto rounded mb-4'
        />
        <h2 className='text-xl font-semibold mb-4'>{title}</h2>

        {/* Credits */}
        {credits && (
          <ul className='space-y-2'>
            {credits
              .filter((credit: Credit) => credit.id === 422014)
              .map((credit: Credit) => (
                <li key={credit.id} className='text-sm text-gray-700'>
                  <strong>{credit.name}</strong> - {credit.role}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
