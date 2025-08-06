import React from "react";

const ProductForm = ({ formData, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={onSubmit}>
            {/* Title Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Image URL Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                </label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            {/* Description Field */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default ProductForm; 