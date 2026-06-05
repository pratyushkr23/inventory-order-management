export default function CustomerTable({
  customers,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">
                {customer.full_name}
              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.phone_number}
              </td>

              <td className="p-4">
                <button
                  onClick={() =>
                    onDelete(customer.id)
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