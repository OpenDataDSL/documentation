import React from 'react';

import './styles.css';

export default function Loading() {
  return (
    <div className="overlay">
      <div className="overlayDoor" />
      <div className="overlayContent">
        <div className="loader">
          <div className="inner" />
        </div>
      </div>
    </div>
  );
}