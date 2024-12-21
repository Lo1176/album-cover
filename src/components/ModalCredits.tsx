import Modal from 'react-modal';
import removeParenthesesAndNumbers from '../functions/removeParenthesesAndNumbers';
import { Artist, ReleaseTypes } from '../models/discogsTypes';

interface ModalCreditsProps {
  artistRole: Artist;
  albumDetails: ReleaseTypes;
  handleCloseModal: () => void;
}

export const ModalCredits = ({
  artistRole,
  albumDetails,
  handleCloseModal,
}: ModalCreditsProps) => {
  return (
    <Modal
      isOpen={!!artistRole && !!albumDetails}
      onRequestClose={handleCloseModal}
      overlayClassName='fixed flex justify-center items-center inset-0 bg-black bg-opacity-50'
      className='justify-items-center text-center rounded-sm focus:outline-none'
    >
      <div className='w-3/4 lg:w-[600px]   bg-white flex flex-col items-center py-6 px-2 gap-6'>
        <img
          src={albumDetails.images[0].resource_url}
          alt={albumDetails.title}
          className='w-3/4 lg:w-[500px] rounded-sm shadow-[8px_12px_20px_0px_rgba(0,0,0,0.5)] object-cover'
        />
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <h2 className='font-dreadnoughtus tracking-widest text-xl sm:text-3xl uppercase font-bold mb-1'>
              {albumDetails.title}
            </h2>
            <h2 className='text-md sm:text-xl uppercase font-semibold '>
              {removeParenthesesAndNumbers(albumDetails.artists_sort)}
            </h2>
          </div>
          {albumDetails.tracklist && (
            <ul
              className='flex justify-center flex-wrap
              '
            >
              {albumDetails.tracklist.map((track, index) => (
                <p
                  key={index + 1}
                  className='font-light uppercase text-xxs pl-2'
                >
                  {index + 1 + '. ' + track.title}
                </p>
              ))}
            </ul>
          )}

          <div className='flex justify-between items-center'>
            <div className='font-light uppercase text-xs text-start'>
              <p className='font-light'>{artistRole.role}</p>
              <p className='font-light'>{artistRole.name} </p>
            </div>
            <div className='font-light uppercase text-xs text-end'>
              <p>Released</p>

              <p>{albumDetails.year}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
