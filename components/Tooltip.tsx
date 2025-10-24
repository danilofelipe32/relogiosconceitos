import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}
      <div className="absolute bottom-full mb-2 w-max max-w-xs left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1.5 px-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-200 ease-out pointer-events-none border border-gray-700 shadow-lg z-10 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;