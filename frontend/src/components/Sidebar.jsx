import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg mb-2 ${
      isActive
        ? "block px-4 py-3 rounded-lg bg-blue-600 text-white"
        : "block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 text-white border-r p-4 ">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          InventoryPro
        </h1>

        <p className="text-slate-400 text-sm">
          Order Management
        </p>
      </div>

      <nav>
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/customers" className={linkClass}>
          Customers
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          Orders
        </NavLink>
      </nav>
    </div>
  );
}