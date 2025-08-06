import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 p-2 flex">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full">
        {/* Product Image */}
        <img
          src={post.imageUrl || `https://picsum.photos/300/200?random=${post.id}`}
          alt={post.title}
          className="h-40 w-full object-cover rounded mb-4"
        />
        
        {/* Product Title */}
        <h2 className="text-lg font-semibold text-center mb-2">
          {post.title}
        </h2>
        
        {/* Product ID */}
        <p className="text-gray-600 text-sm text-center mb-2">
          Post ID: {post.id}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <NavLink to={`/products/${post.id}`} className="flex-1">
            <button className="w-full px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Details
            </button>
          </NavLink>
          <button
            className="flex-1 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            onClick={() => onEdit(post)}
            type="button"
          >
            Edit
          </button>
          <button
            className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            onClick={() => onDelete(post)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 