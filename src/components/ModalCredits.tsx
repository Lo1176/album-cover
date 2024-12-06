import { FC } from 'react';
import Modal from 'react-modal';
import { Artist, ReleaseTypes } from '../models/discogsTypes';

interface ModalCreditsProps {
  artistRole: Artist;
  albumDetails: ReleaseTypes;
  handleCloseModal: () => void;
}

export const ModalCredits: FC<ModalCreditsProps> = ({
  artistRole,
  albumDetails,
  handleCloseModal,
}) => {
  return (
    <Modal
      isOpen={!!albumDetails.id}
      onRequestClose={handleCloseModal}
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      className=' rounded-sm'
    >
      <div className='bg-gray-50 flex flex-col items-center py-6 gap-6'>
        <img
          src={albumDetails.images[0].resource_url}
          alt={albumDetails.title}
          className='w-3/4 md:w-3/4 rounded-sm shadow-2xl '
        />
        <div>
          <h2 className='text-xl font-semibold mb-2'>{albumDetails.title}</h2>
          <h2 className='text-xl font-semibold mb-2'>
            {albumDetails.artists_sort}
          </h2>
          <ul className='text-left mt-4'>
            <li key={artistRole.name} className='mb-2'>
              <span className='font-bold'>{artistRole.role}</span>{' '}
              {artistRole.name}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
