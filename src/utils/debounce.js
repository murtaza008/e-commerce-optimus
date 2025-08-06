// Debounce utility function
export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Custom hook for debounced search
export const useDebouncedSearch = (searchFunction, delay = 500) => {
  const debouncedSearch = debounce(searchFunction, delay);
  return debouncedSearch;
};

// Custom hook for debounced filter changes
export const useDebouncedFilter = (filterFunction, delay = 300) => {
  const debouncedFilter = debounce(filterFunction, delay);
  return debouncedFilter;
}; 