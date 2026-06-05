import { useState } from "react";

export default function CustomerForm({
  onCreate,
}) {
  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      phone_number: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    setFormData({
      full_name: "",
      email: "",
      phone_number: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        Add Customer
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Customer
      </button>
    </form>
  );
}