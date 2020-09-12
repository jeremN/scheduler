import React from 'react';

import './Brand.scss';

const Brand = () => (
  <div className="brand">
    <span className="brand__logo">
      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2.5" width="21" height="21" rx="6" stroke="#1C85E8" strokeWidth="4"/>
      </svg>
    </span>
    <h1 className="brand__name">Scheduler</h1>
  </div>
);

export default Brand;