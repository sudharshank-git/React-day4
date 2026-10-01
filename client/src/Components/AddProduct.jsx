import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../hooks/useProducts";

const emptyForm = {
    name: "",
    category: "",
    price: "",
    brand: "",
    stock: "",
    rating: "",
    inStock: true,
};

export default function AddProduct() {
    const [formData, setFormData] = useState(emptyForm);
    const [formSuccess, setFormSuccess] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const getHeaders = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setIsEditing(false);
        setEditingId(null);
    };

    const { products, loading, error } = useProducts("/products");
    setFormLoading(loading);
    setFormError(error);

    const handleChange = (event) => {
        const { name, value , type, checked } = event.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
        setFormError("Please login first to add or update products.");
        return;
    }

    const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        brand: formData.brand.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        inStock: Boolean(formData.inStock),
    };

    if (!payload.name || !payload.category || !payload.brand) {
        setFormError("Name, category, and brand are required.");
        return;
    }

    if ([payload.price, payload.stock, payload.rating].some(Number.isNaN)) {
        setFormError("Price, stock, and rating must be valid numbers.");
        return;
    }

    try {
        let response;
        if (isEditing && editingId) {
            response = await axios.post(
            `http://localhost:4000/products/`,
            payload,
            { headers: getHeaders() },
        );
        const updatedProduct =
            response.data?.product?.[0] ?? response.data?.product;
        if (updatedProduct) {
            setProducts((prev) =>
                prev.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item,
                ),
            );
        }
        setFormSuccess("Product updated successfully.");
        } else {
            response = await axios.post("http://localhost:4000/products", payload, {
            headers: getHeaders(),
        });

        const newProduct = response.data?.product?.[0] ?? response.data?.product;
        if (newProduct) {
            setProducts((prev) => [newProduct, ...prev]);
        }
        setFormSuccess("Product added successfully.");
        }

        resetForm();
        } catch (err) {
        setFormError(
            err.response?.data?.message || err.message || "Unable to save product.",
        );
        } finally {
        setFormLoading(false);
        }
    };

    const handleEdit = (product) => {
        setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        rating: product.rating,
        inStock: product.instock ?? product.inStock ?? true,
        });
        setIsEditing(true);
        setEditingId(product.id);
        setFormError("");
        setFormSuccess("");
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
        setFormError("Please login first to delete products.");
        return;
        }

        if (!window.confirm("Delete this product?")) {
        return;
        }

        setFormError("");
        setFormSuccess("");

        try {
        await axios.delete(`http://localhost:4000/products/${id}`, {
            headers: getHeaders(),
        });

        setProducts((prev) => prev.filter((product) => product.id !== id));
        if (editingId === id) {
            resetForm();
        }
        setFormSuccess("Product deleted successfully.");
        } catch (err) {
        setFormError(
            err.response?.data?.message ||
            err.message ||
            "Unable to delete product.",
        );
        }
    };

    return (
        <section className="dashboard-product-panel">
        <div className="product-form-card">
            <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

            {formError && <div className="form-message form-error">{formError}</div>}
            {formSuccess && <div className="form-message form-success">{formSuccess}</div>}

            <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
                <div className="form-group full-width">
                <label htmlFor="name">Product Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Electronics"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                    id="brand"
                    name="brand"
                    type="text"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Apple"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min="100"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group full-width checkbox-row">
                <input
                    id="inStock"
                    name="inStock"
                    type="checkbox"
                    checked={Boolean(formData.inStock)}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">Available in stock</label>
                </div>
            </div>

            <div className="form-actions-row">
                <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                >
                {loading ? isEditing ? "Updating..." : "Saving..." : isEditing ? "Update Product" : "Add Product"}
                </button>
                {isEditing && (
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={resetForm}
                >
                    Cancel
                </button>
                )}
            </div>
            </form>
        </div>

        <div className="product-list-card">
            <div className="card-header-row">
            <h3>Products</h3>
            <span className="count-badge">{products.length}</span>
            </div>

            {loading && products.length === 0 ? (
            <p className="empty-state">Loading products...</p>
            ) : products.length === 0 ? (
            <p className="empty-state">No products found.</p>
            ) : (
            <div className="product-table-wrapper">
                <table className="product-table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>
                        {(product.instock ?? product.inStock)
                            ? "In stock"
                            : "Out of stock"}
                        </td>
                        <td>
                        <div className="table-actions">
                            <button
                            type="button"
                            className="btn btn-secondary btn-small"
                            onClick={() => handleEdit(product)}
                            >
                            Edit
                            </button>
                            <button
                            type="button"
                            className="btn btn-ghost btn-small danger"
                            onClick={() => handleDelete(product.id)}
                            >
                            Delete
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </section>
    );
}
