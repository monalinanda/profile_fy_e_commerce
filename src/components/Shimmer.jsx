import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(10)].map((_, index) => (
        <div className="w-full h-48 mb-4 bg-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
