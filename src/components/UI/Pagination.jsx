import React from "react";

const Pagination = ({ page, handleNext, handlePrev }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 mb-4">
      <button
        disabled={page === 0}
        onClick={handlePrev}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <div className="px-4 py-2 bg-gray-100 rounded-lg">
        <span className="font-semibold text-gray-700">Page {page + 1}</span>
      </div>
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
