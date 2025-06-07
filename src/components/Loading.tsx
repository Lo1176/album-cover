import { Spinner } from './Spinner';

interface LoadingProps {
  text: string;
}

export const Loading = ({ text }: LoadingProps) => {
  return (
    <div className='relative flex items-center justify-center h-screen bg-gray-800'>
      <div className="absolute inset-0 bg-[url('/src/assets/images/main-page-presentation.webp')] bg-cover bg-center opacity-10"></div>
      <div className='relative z-10'>
        <div className='flex flex-col justify-center items-center h-screen  gap-4 text-gray-100'>
          <Spinner />
          {text}
        </div>
      </div>
    </div>
  );
};
