import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import ProductGrid from "./ProductGrid";
import { sortProductsAlphabetically, filterProductsBySearch } from "../../utils/sortingUtils";

const HandleInfinite = ({
  status,
  data,
  ref,
  hasNextPage,
  isFetchingNextPage,
  onEdit,
  onDelete,
  searchTerm = "",
  sortOrder = "",
}) => {
  // Show loading spinner
  if (status === "pending") {
    return <LoadingSpinner />;
  }

  // Show error message
  if (status === "error") {
    return (
      <ErrorMessage message={"An error occurred while fetching posts."} />
    );
  }

  // Get all posts from all pages
  let allPosts = data?.pages?.flat() || [];

  // Apply search filter
  allPosts = filterProductsBySearch(allPosts, searchTerm);

  // Apply alphabetical sorting
  allPosts = sortProductsAlphabetically(allPosts, sortOrder);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Infinite Scroll Posts</h1>

      {/* No results message */}
      {searchTerm && allPosts.length === 0 && (
        <div className="text-center text-gray-500 mb-6">
          No posts found for "{searchTerm}"
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid
        posts={allPosts}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Load more section */}
      <div ref={ref} className="flex justify-center mt-8">
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && data?.pages?.length > 0 && (
          <div className="text-lg text-gray-600">No more posts to load</div>
        )}
      </div>
    </div>
  );
};

export default HandleInfinite;
