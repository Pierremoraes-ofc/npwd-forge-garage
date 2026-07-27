import React from 'react';

const Icon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 21.5 24 8l17 13.5V40a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V21.5Z" fill="#171717" stroke="#ff6b00" strokeWidth="3"/>
    <path d="M13 24h22v18H13V24Z" fill="#232323" stroke="#ff6b00" strokeWidth="2"/>
    <path d="M16 35.5h16l-1.7-6.1a2 2 0 0 0-1.9-1.4h-8.8a2 2 0 0 0-1.9 1.4L16 35.5Z" fill="#ff6b00"/>
    <circle cx="19" cy="36" r="2" fill="white"/><circle cx="29" cy="36" r="2" fill="white"/>
  </svg>
);

export const GarageIcon = () => <Icon />;
export const NotificationIcon = () => <Icon size={32} />;