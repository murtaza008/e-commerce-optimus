import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ posts, onEdit, onDelete }) => {
    return (
        <div className="flex flex-wrap -mx-2">
            {posts.map((post) => (
                <ProductCard
                    key={post.id}
                    post={post}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductGrid; 