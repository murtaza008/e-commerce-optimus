import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct, deleteProduct } from "../../services/api";
import EditModal from "./EditModal";

const PostActions = ({ queryKey, children }) => {
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const queryClient = useQueryClient();

    // Edit post mutation
    const editMutation = useMutation({
        mutationFn: ({ id, updatedData }) => editProduct(id, updatedData),
        onSuccess: () => {
            // Refresh the data after edit
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });

    // Delete post mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            // Refresh the data after delete
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });

    // Handle edit button click
    const handleEdit = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    // Handle delete button click
    const handleDelete = (post) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteMutation.mutate(post.id);
        }
    };

    // Handle save edit
    const handleSaveEdit = (formData) => {
        if (selectedPost) {
            editMutation.mutate({
                id: selectedPost.id,
                updatedData: formData
            });
            setIsModalOpen(false);
            setSelectedPost(null);
        }
    };

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    return (
        <>
            {/* Render children with edit/delete handlers */}
            {children({ onEdit: handleEdit, onDelete: handleDelete })}

            {/* Edit Modal */}
            <EditModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveEdit}
            />
        </>
    );
};

export default PostActions; 