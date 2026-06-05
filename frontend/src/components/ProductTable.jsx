export default function ProductTable({
  products,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">SKU</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No products available
          </div>
        )}

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">
                {product.name}
              </td>

              <td className="p-4">
                {product.sku}
              </td>

              <td className="p-4">
                ${product.price}
              </td>

              <td className="p-4">
                {product.quantity_in_stock}

                {product.quantity_in_stock < 5 && (
                    <span
                      className="
                        ml-2
                        px-2
                        py-1
                        text-xs
                        bg-red-100
                        text-red-700
                        rounded-full
                      "
                    >
                      Low Stock
                    </span>
                )}
                </td>

              <td className="p-4 space-x-2">

                <button
                    onClick={() => onEdit(product)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                    onDelete(product.id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}