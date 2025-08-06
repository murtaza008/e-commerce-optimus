import React from "react";

const ErrorMessage = ({ message = "An error occurred" }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-2xl mb-2">⚠️</div>
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
