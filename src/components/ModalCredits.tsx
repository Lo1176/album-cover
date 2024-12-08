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
      className='text-center rounded-sm focus:outline-none'
    >
      <div className='w-[600px] md:w-96 sm:w-80 bg-white flex flex-col items-center py-6 px-2 gap-6'>
        <img
          src={albumDetails.images[0].resource_url}
          alt={albumDetails.title}
          className='w-[500px] md:w-80 sm:w-72 rounded-sm shadow-[8px_12px_20px_0px_rgba(0,0,0,0.5)] object-cover'
        />
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <h2 className='font-dreadnoughtus tracking-widest text-3xl uppercase font-bold mb-1'>
              {albumDetails.title}
            </h2>
            <h2 className='text-xl uppercase font-semibold '>
              {albumDetails.artists_sort}
            </h2>
          </div>
          <p className='font-light '>
            {artistRole.role} {artistRole.name}
          </p>
        </div>
      </div>
    </Modal>
  );
};
