import { useEffect, useState } from "react";

import { getDashboardSummary } from "../api/dashboardApi";

import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!summary) {
    return (
      <div className="text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Inventory Management System
        </h1>

        <p className="text-gray-500 mt-2">
          Manage products, customers,
          orders and inventory efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <SummaryCard
          title="Total Products"
          value={summary.total_products}
          color="border-blue-500"
        />

        <SummaryCard
          title="Total Customers"
          value={summary.total_customers}
          color="border-green-500"
        />

        <SummaryCard
          title="Total Orders"
          value={summary.total_orders}
          color="border-purple-500"
        />

        <SummaryCard
          title="Low Stock Products"
          value={summary.low_stock_products}
          color="border-red-500"
        />
      </div>
    </div>
  );
}