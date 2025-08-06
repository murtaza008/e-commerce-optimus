import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ProductForm from "./ProductForm";

const EditModal = ({ post, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: ""
  });

  // Update form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        image: post.imageUrl || "",
        description: post.body || ""
      });
    }
  }, [post]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Post">
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default EditModal; 