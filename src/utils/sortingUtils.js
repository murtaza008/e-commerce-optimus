// Utility function to sort products alphabetically
export const sortProductsAlphabetically = (products, sortOrder) => {
    if (!products || !Array.isArray(products)) return products;

    const sortedProducts = [...products];

    if (sortOrder === "a-z") {
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "z-a") {
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    return sortedProducts;
};

// Utility function to filter products by search term
export const filterProductsBySearch = (products, searchTerm) => {
    if (!products || !Array.isArray(products)) return products;
    if (!searchTerm || searchTerm.trim() === "") return products;

    return products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
}; 