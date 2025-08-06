import React from "react";

const AlphabeticalFilter = ({ sortOrder, onSortChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Name:
            </label>
            <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">No sorting</option>
                <option value="a-z">A to Z</option>
                <option value="z-a">Z to A</option>
            </select>
        </div>
    );
};

export default AlphabeticalFilter; 