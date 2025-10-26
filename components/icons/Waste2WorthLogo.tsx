import React from 'react';

export const Waste2WorthLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <defs>
      <linearGradient id="w2w-gradient-main" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ade80" /> {/* brand-green-400 */}
        <stop offset="100%" stopColor="#16a34a" /> {/* brand-green-600 */}
      </linearGradient>
       <linearGradient id="w2w-gradient-accent" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" /> {/* brand-green-500 */}
        <stop offset="100%" stopColor="#15803d" /> {/* brand-green-700 */}
      </linearGradient>
    </defs>
    
    {/* Arrow part of the cycle */}
    <path
      fill="url(#w2w-gradient-main)"
      d="M50,5 A45,45 0 1 1 12.7,24.8 L24.8,12.7 A35,35 0 1 0 50,15 V5z"
    />
    
    {/* Leaf part growing from the cycle, representing 'worth' */}
    <path
      fill="url(#w2w-gradient-accent)"
      d="M12.7,24.8 C25,45 50,45 57,30 S50,5 50,5 L50,15 C50,15 45,25 38,35 S20,40 12.7,24.8z"
    />
  </svg>
);
