import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import HandleInfinite from "../components/UI/HandleInfinite";
import PostActions from "../components/UI/PostActions";
import ProductFilters from "../components/UI/ProductFilters";
import DebounceIndicator from "../components/UI/DebounceIndicator";
import { sortProductsAlphabetically, filterProductsBySearch } from "../utils/sortingUtils";
import { useDebouncedSearch, useDebouncedFilter } from "../utils/debounce";

const Infinite = () => {
  // State for filtering
  const [searchInput, setSearchInput] = useState(""); // For immediate input updates
  const [searchTerm, setSearchTerm] = useState(""); // For debounced search
  const [sortInput, setSortInput] = useState(""); // For immediate sort updates
  const [sortOrder, setSortOrder] = useState(""); // For debounced sort
  const [isSearching, setIsSearching] = useState(false); // For debounce indicator

  // Get infinite scroll data
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products-infinite"],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage, allPages) => {
        // JSONPlaceholder has 100 posts, so we can load up to 12 pages (8 items per page)
        return lastPage.length === 8 && allPages.length < 12 ? allPages.length : undefined;
      },
      initialPageParam: 0,
    });

  // Infinite scroll observer
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Load more posts when in view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Debounced search function
  const debouncedSearch = useDebouncedSearch((value) => {
    setSearchTerm(value);
    setIsSearching(false); // Hide indicator when search is complete
  }, 500);

  // Debounced sort function
  const debouncedSort = useDebouncedFilter((value) => {
    setSortOrder(value);
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

  return (
    <PostActions queryKey="products-infinite">
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

          <HandleInfinite
            status={status}
            data={data}
            ref={ref}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onEdit={onEdit}
            onDelete={onDelete}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
          />
        </div>
      )}
    </PostActions>
  );
};

export default Infinite;
