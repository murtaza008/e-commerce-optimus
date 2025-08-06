import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../services/api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Post ID */}
          <span className="text-sm text-gray-500 mb-2">ID: {post.id}</span>
          {/* Post Image */}
          <img
            src={post.imageUrl || `https://picsum.photos/600/400?random=${post.id}`}
            alt={post.title}
            className="w-full h-80 object-cover mb-4"
          />
          {/* Post Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          {/* Post Description */}
          <p className="text-gray-700 leading-relaxed mb-4 text-center px-4">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
