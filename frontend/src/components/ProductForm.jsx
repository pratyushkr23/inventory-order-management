import { useState, useEffect } from "react";

export default function ProductForm({
  onCreate,
  onUpdate,
  editingProduct,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      sku: "",
      price: "",
      quantity_in_stock: "",
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
            name: editingProduct.name,
            sku: editingProduct.sku,
            price: editingProduct.price,
            quantity_in_stock:
                editingProduct.quantity_in_stock,
            });
        }
    }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        ...formData,
        price: Number(formData.price),
        quantity_in_stock: Number(
        formData.quantity_in_stock
        ),
    };

    if (editingProduct) {
        onUpdate(
        editingProduct.id,
        payload
        );
    } else {
        onCreate(payload);
    }

    setFormData({
        name: "",
        sku: "",
        price: "",
        quantity_in_stock: "",
    });
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct
        ? "Update Product"
        : "Add Product"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="quantity_in_stock"
          type="number"
          placeholder="Stock"
          value={formData.quantity_in_stock}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editingProduct
    ? "Update Product"
    : "Add Product"}
      </button>
    </form>
  );
}