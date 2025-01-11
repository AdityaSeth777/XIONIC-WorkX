import React from 'react';

export function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-circle" />
        <div className="preloader-circle" />
        <div className="preloader-circle" />
      </div>
    </div>
  );
}