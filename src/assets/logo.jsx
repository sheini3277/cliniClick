import React from 'react';

const Logo = () => {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="80" fill="#ffffff" />
      <text x="10" y="50" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#ac2454">
        CliniClick
      </text>
      <circle cx="170" cy="40" r="20" fill="#ac2454" />
    </svg>
  );
};

export default Logo;