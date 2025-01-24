import React from "react";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      icon: <MdDashboard />,
      link: "/dashboard",
      label: "Dashboard Management",
    },
    {
      icon: <MdDashboard />,
      link: "/products",
      label: "Product Management",
    },
    {
      icon: <MdDashboard />,
      link: "/orders",
      label: "Order Management",
    },
    // ... other menu items
  ];

  return (
    <div className="bg-gray-100 w-full min-w-80 max-w-96 h-screen">
      <div className="p-2">
        <h1 className="text-center text-2xl font-bold mb-4">Sureshop Vendor</h1>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center hover:bg-gray-300 px-4 py-1"
            >
              <div className="flex justify-center items-center">
                {item.icon}
              </div>
              <Link
                to={item.link}
                className="ml-4 text-gray-800"
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
