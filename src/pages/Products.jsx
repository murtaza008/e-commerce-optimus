import React, { useState, useCallback } from "react";
import { getProducts, searchProducts } from "../services/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductGrid from "../components/UI/ProductGrid";
import PostActions from "../components/UI/PostActions";
import Pagination from "../components/UI/Pagination";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import ProductFilters from "../components/UI/ProductFilters";
import DebounceIndicator from "../components/UI/DebounceIndicator";
import { sortProductsAlphabetically } from "../utils/sortingUtils";
import { useDebouncedSearch, useDebouncedFilter } from "../utils/debounce";

const Products = () => {
  // State for page management
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState(""); // For immediate input updates
  const [searchTerm, setSearchTerm] = useState(""); // For debounced search
  const [sortInput, setSortInput] = useState(""); // For immediate sort updates
  const [sortOrder, setSortOrder] = useState(""); // For debounced sort
  const [isSearching, setIsSearching] = useState(false); // For debounce indicator
  const limit = 8;

  // Get posts data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: () => searchTerm ? searchProducts(searchTerm) : getProducts(page, limit),
    placeholderData: keepPreviousData,
    enabled: !searchTerm || searchTerm.length >= 2,
  });

  // Handle next page
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Handle previous page
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  // Debounced search function
  const debouncedSearch = useDebouncedSearch((value) => {
    setSearchTerm(value);
    setPage(0); // Reset to first page when searching
    setIsSearching(false); // Hide indicator when search is complete
  }, 500);

  // Debounced sort function
  const debouncedSort = useDebouncedFilter((value) => {
    setSortOrder(value);
    setPage(0); // Reset to first page when sorting
  }, 300);

  // Handle search change
  const handleSearchChange = (value) => {
    // Update the input value immediately for better UX
    setSearchInput(value);
    // Show searching indicator
    setIsSearching(true);
    // Trigger debounced search
    debouncedSearch(value);
  };

  // Handle sort order change
  const handleSortChange = (value) => {
    // Update the sort input immediately for better UX
    setSortInput(value);
    // Trigger debounced sort
    debouncedSort(value);
  };

  // Show loading spinner
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Show error message
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  let posts = data?.products || [];

  // Apply alphabetical sorting using utility function
  posts = sortProductsAlphabetically(posts, sortOrder);

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <PostActions queryKey="products">
      {({ onEdit, onDelete }) => (
        <div className="p-6">
          {/* Product Filters */}
          <ProductFilters
            searchTerm={searchInput}
            onSearchChange={handleSearchChange}
            sortOrder={sortInput}
            onSortChange={handleSortChange}
          />

          {/* Debounce Indicator */}
          <DebounceIndicator
            isActive={isSearching && searchInput !== searchTerm}
            message="Searching..."
          />

          {/* No results message */}
          {searchTerm && posts.length === 0 && !isPending && (
            <div className="text-center text-gray-500 mb-6">
              No posts found for "{searchTerm}"
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid
            posts={posts}
            onEdit={onEdit}
            onDelete={onDelete}
          />

          {/* Pagination */}
          {!searchTerm && totalPages > 1 && (
            <div>
              <Pagination
                page={page}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </div>
          )}
        </div>
      )}
    </PostActions>
  );
};

export default Products;
