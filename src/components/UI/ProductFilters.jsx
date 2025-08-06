import React from "react";
import SearchBar from "./SearchBar";
import AlphabeticalFilter from "./AlphabeticalFilter";

const ProductFilters = ({
    searchTerm,
    onSearchChange,
    sortOrder,
    onSortChange
}) => {
    return (
        <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
            />

            {/* Alphabetical Filter */}
            <AlphabeticalFilter
                sortOrder={sortOrder}
                onSortChange={onSortChange}
            />
        </div>
    );
};

export default ProductFilters; 