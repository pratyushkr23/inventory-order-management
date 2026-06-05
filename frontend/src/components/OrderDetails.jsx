export default function OrderDetails({
  order,
  onClose,
}) {
  if (!order) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Order #{order.id}
        </h2>

        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Close
        </button>
      </div>

      <p>
        <strong>Customer:</strong>{" "}
        {order.customer_name}
      </p>

      <p>
        <strong>Total:</strong>{" "}
        ${order.total_amount}
      </p>

      <hr className="my-4" />

      <h3 className="font-semibold mb-3">
        Items
      </h3>

      <div className="space-y-2">
        {order.items.map(
          (item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {item.product_name}
              </span>

              <span>
                Qty: {item.quantity}
              </span>

              <span>
                ${item.unit_price}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}