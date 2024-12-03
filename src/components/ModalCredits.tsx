import { FC } from 'react';
import Modal from 'react-modal';
import { Album } from '../models/discogsTypes';

interface ModalCreditsProps {
  artistRole: Credit;
  albumCoverAndTitle: Album;
  resourceUrlAlbum: string;
  handleCloseModal: () => void;
}

export interface Credit {
  name: string;
  role: string[];
  id: number;
}

const displayRoles = (roles: string[]) => roles.join(', ').toLowerCase();

export const ModalCredits: FC<ModalCreditsProps> = ({
  artistRole,
  albumCoverAndTitle,
  resourceUrlAlbum,
  handleCloseModal,
}) => {
  return (
    <Modal
      isOpen={!!resourceUrlAlbum}
      onRequestClose={handleCloseModal}
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      className='bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2'
    >
      <button
        onClick={handleCloseModal}
        className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none'
      >
        &times;
      </button>
      <div className='flex flex-col items-center'>
        <img
          src={albumCoverAndTitle.cover_image}
          alt={albumCoverAndTitle.title}
          className='w-full md:w-3/4 rounded-lg shadow-md mb-4'
        />
        <h2 className='text-xl font-semibold mb-2'>
          {albumCoverAndTitle.title}
        </h2>
        <ul className='text-left mt-4'>
          <li key={artistRole.name} className='mb-2'>
            <span className='font-bold'>{displayRoles(artistRole.role)}</span>{' '}
            {artistRole.name}
          </li>
        </ul>
      </div>
    </Modal>
  );
};
