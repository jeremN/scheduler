import React from 'react';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader loader--stroke">
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="28"></circle>
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="28"></circle>
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="28"></circle>
      </svg>
      <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="28"></circle>
      </svg>
    </div>
  );
};

export default Loader;
