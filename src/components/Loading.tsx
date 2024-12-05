import { FC } from 'react';

interface LoadingProps {
  text: string;
}

export const Loading: FC<LoadingProps> = ({ text }) => {
  return <div className='text-green-600'>{text}</div>;
};
