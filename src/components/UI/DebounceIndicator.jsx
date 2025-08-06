import React from "react";

const DebounceIndicator = ({ isActive, message = "Searching..." }) => {
    if (!isActive) return null;

    return (
        <div className="flex items-center text-sm text-gray-500 mb-2">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500 mr-2"></div>
            {message}
        </div>
    );
};

export default DebounceIndicator; 