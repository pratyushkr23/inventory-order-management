import { useEffect, useState } from "react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Notification from "../components/Notification";
import ConfirmModal from "../components/ConfirmModal";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productApi";

export default function Products() {
  const [products, setProducts] =
    useState([]);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [deleteProductId, setDeleteProductId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [notification, setNotification] =
    useState({
      message: "",
      type: "success",
    });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreate(product) {
    try {
      await createProduct(product);

      await loadProducts();

      setNotification({
        message:
          "Product created successfully",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to create product",
        type: "error",
      });
    }
  }

  function handleDelete(id) {
    setDeleteProductId(id);
  }

  async function confirmDelete() {
    try {
      await deleteProduct(deleteProductId);

      await loadProducts();

      setNotification({
        message:
          "Product deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to delete product",
        type: "error",
      });
    }

    setDeleteProductId(null);
  }

  function handleEdit(product) {
    setEditingProduct(product);
  }

  async function handleUpdate(
    id,
    product
  ) {
    try {
      await updateProduct(
        id,
        product
      );

      await loadProducts();

      setEditingProduct(null);

      setNotification({
        message:
          "Product updated successfully",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to update product",
        type: "error",
      });
    }
  }

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() =>
          setNotification({
            message: "",
            type: "success",
          })
        }
      />

      <ConfirmModal
        isOpen={deleteProductId !== null}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteProductId(null)
        }
      />

      <h1 className="text-3xl font-bold mb-6">
        Product Management
      </h1>

      <ProductForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}