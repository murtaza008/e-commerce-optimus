import axios from "axios";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Local storage for persistent data
const getLocalPosts = () => {
  const stored = localStorage.getItem('posts');
  return stored ? JSON.parse(stored) : null;
};

const setLocalPosts = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

// Initialize local storage with API data if empty
const initializeLocalStorage = async () => {
  if (!getLocalPosts()) {
    const response = await api.get('/posts');
    // Add image URLs to posts
    const postsWithImages = response.data.map(post => ({
      ...post,
      imageUrl: `https://picsum.photos/300/200?random=${post.id}`
    }));
    setLocalPosts(postsWithImages);
  }
};

//Product Details
export const getProductDetails = async (id) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const post = posts.find(p => p.id === parseInt(id));
  return post;
};

// Pagination
export const getProducts = async (page, limit) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const start = page * limit;
  const end = start + limit;
  const paginatedPosts = posts.slice(start, end);

  return {
    products: paginatedPosts,
    total: posts.length,
    skip: start,
    limit
  };
};

// Infinite Scroll
export const fetchProducts = async ({ pageParam = 0 }) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const limit = 8;
  const start = pageParam * limit;
  const end = start + limit;

  return posts.slice(start, end);
};

// Search Products
export const searchProducts = async (query) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.body.toLowerCase().includes(query.toLowerCase())
  );

  return {
    products: filteredPosts,
    total: filteredPosts.length,
    skip: 0,
    limit: filteredPosts.length
  };
};

// Edit Product (PATCH) - Update local storage
export const editProduct = async (id, updatedData) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const updatedPosts = posts.map(post =>
    post.id === parseInt(id)
      ? {
        ...post,
        title: updatedData.title,
        body: updatedData.description,
        imageUrl: updatedData.image
      }
      : post
  );

  setLocalPosts(updatedPosts);

  // Return the updated post
  return updatedPosts.find(post => post.id === parseInt(id));
};

// Delete Product - Remove from local storage
export const deleteProduct = async (id) => {
  await initializeLocalStorage();
  const posts = getLocalPosts();
  const updatedPosts = posts.filter(post => post.id !== parseInt(id));

  setLocalPosts(updatedPosts);

  // Return success response
  return {
    id: parseInt(id),
    success: true,
    deleted: true
  };
};
