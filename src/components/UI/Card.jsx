import React from "react";
import ProductCard from "./ProductCard";

const Card = ({ product, onEdit, onDelete }) => {
  // For backward compatibility, treat product as post
  const post = product;

  return (
    <ProductCard
      post={post}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default Card;
