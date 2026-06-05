import { useEffect, useState } from "react";

import Notification from "../components/Notification";
import ConfirmModal from "../components/ConfirmModal";
import OrderTable from "../components/OrderTable";
import OrderForm from "../components/OrderForm";
import OrderDetails from "../components/OrderDetails";

import {
  getOrders,
  deleteOrder,
  createOrder,
  getOrderDetails,
} from "../api/orderApi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [deleteOrderId, setDeleteOrderId] =
    useState(null);

  const [notification, setNotification] =
    useState({
      message: "",
      type: "success",
    });

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete(id) {
    setDeleteOrderId(id);
  }

  async function confirmDelete() {
    try {
      await deleteOrder(deleteOrderId);

      await loadOrders();

      setNotification({
        message:
          "Order deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to delete order",
        type: "error",
      });
    }

    setDeleteOrderId(null);
  }

  async function handleCreate(order) {
    try {
      await createOrder(order);

      await loadOrders();

      setNotification({
        message:
          "Order created successfully",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message:
          error?.response?.data?.detail ||
          "Failed to create order",
        type: "error",
      });
    }
  }

  async function handleView(id) {
    try {
      const data =
        await getOrderDetails(id);

      setSelectedOrder(data);
    } catch (error) {
      console.error(error);
    }
  }

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
        isOpen={deleteOrderId !== null}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteOrderId(null)
        }
      />

      <h1 className="text-3xl font-bold mb-6">
        Order Management
      </h1>

      <OrderDetails
        order={selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
      />

      <OrderForm onCreate={handleCreate} />

      <OrderTable
        orders={orders}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
}