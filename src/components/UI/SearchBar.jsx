import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div style={{ marginBottom: "24px" }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px"
                }}
            />
        </div>
    );
};

export default SearchBar; 