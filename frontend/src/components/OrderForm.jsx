import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";

export default function OrderForm({
  onCreate,
}) {
  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [items, setItems] =
    useState([
      {
        product_id: "",
        quantity: 1,
      },
    ]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const customerData =
        await getCustomers();

      const productData =
        await getProducts();

      setCustomers(customerData);
      setProducts(productData);
    } catch (error) {
      console.error(error);
    }
  }

  function addItem() {
    setItems([
      ...items,
      {
        product_id: "",
        quantity: 1,
      },
    ]);
  }

  function removeItem(index) {
    if (items.length === 1) return;

    setItems(
      items.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  }

  function updateItem(
    index,
    field,
    value
  ) {
    const updatedItems = [...items];

    updatedItems[index][field] =
      value;

    setItems(updatedItems);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onCreate({
      customer_id:
        Number(customerId),

      items: items.map((item) => ({
        product_id:
          Number(item.product_id),

        quantity:
          Number(item.quantity),
      })),
    });

    setCustomerId("");

    setItems([
      {
        product_id: "",
        quantity: 1,
      },
    ]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        Create Order
      </h2>

      <div className="space-y-4">

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
          className="w-full border p-2 rounded"
          required
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        <div className="space-y-4">

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center"
            >
              <select
                value={item.product_id}
                onChange={(e) =>
                  updateItem(
                    index,
                    "product_id",
                    e.target.value
                  )
                }
                className="col-span-7 border p-2 rounded"
                required
              >
                <option value="">
                  Select Product
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                    {" "}
                    (Stock:{" "}
                    {product.quantity_in_stock})
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                className="col-span-3 border p-2 rounded"
                required
              />

              <button
                type="button"
                onClick={() =>
                  removeItem(index)
                }
                className="col-span-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Order
          </button>

        </div>

      </div>
    </form>
  );
}