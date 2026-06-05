export default function OrderTable({
  orders,
  onDelete,
  onView,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">
              Order ID
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">
                #{order.id}
              </td>

              <td className="p-4">
                {order.customer_name}
              </td>

              <td className="p-4">
                <span className="font-semibold text-green-600">
                  ${order.total_amount}
                </span>
              </td>

              <td className="p-4">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </td>

              <td className="p-4 space-x-2">

                <button
                  onClick={() =>
                    onView(order.id)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onDelete(order.id)
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