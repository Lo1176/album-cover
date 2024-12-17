interface LoadingProps {
  text: string;
}

export const Loading = ({ text }: LoadingProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen  gap-4 text-gray-100'>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      ></div>
      {text}
    </div>
  );
};
