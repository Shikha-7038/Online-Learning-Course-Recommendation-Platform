import React from 'react';

const ProgressBar = ({ progress = 0, showLabel = true }) => {
  const percentage = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="text-gray-800 font-medium">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;