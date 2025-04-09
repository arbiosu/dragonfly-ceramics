export default function LoadingSkeleton() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <svg className='h-10 w-10 animate-spin text-blue-500' viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8v8z'
        ></path>
      </svg>
      <p className='mt-4 text-lg text-gray-700'>Loading...</p>
    </div>
  );
}
