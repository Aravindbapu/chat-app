import React from 'react';

const Spinner = ({size = 32}) => (
  <div className="flex justify-center items-center w-full h-full py-8">
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="4" />
      <path className="opacity-75" fill="#8b5cf6" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
);

export default Spinner;
