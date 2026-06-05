import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import ConfirmModal from "../components/ConfirmModal";

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../api/customerApi";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCustomerId, setDeleteCustomerId] =useState(null);
  const [notification, setNotification] =
    useState({
      message: "",
      type: "success",
    });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreate(customer) {
    try {
      await createCustomer(customer);

      await loadCustomers();

      setNotification({
        message:
          "Customer created successfully",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to create customer",
        type: "error",
      });
    }
  }

  async function handleDelete(id) {
    setDeleteCustomerId(id);
  }

  async function confirmDelete() {
    try {
      await deleteCustomer(deleteCustomerId);

      await loadCustomers();

      setNotification({
        message:
          "Customer deleted successfully",
        type: "success",
      });
    } catch {
      setNotification({
        message:
          "Failed to delete customer",
        type: "error",
      });
    }

    setDeleteCustomerId(null);
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customer Management
      </h1>

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
        isOpen={deleteCustomerId !== null}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteCustomerId(null)
        }
      />

      <CustomerForm
        onCreate={handleCreate}
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers by name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <CustomerTable
        customers={filteredCustomers}
        onDelete={handleDelete}
      />
    </div>
  );
}