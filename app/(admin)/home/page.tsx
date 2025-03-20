"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  return (
    <div>
      {/* Main Content */}
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome Back, Daniel! 👋
        </h2>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Total Sales", count: "₦1,250,000", color: "bg-blue-500" },
            { label: "Active Products", count: "45", color: "bg-green-500" },
            { label: "Pending Orders", count: "8", color: "bg-yellow-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg text-white shadow-md ${stat.color}`}
            >
              <h3 className="text-lg">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { text: "Manage Products", link: "/products", icon: "🛍️" },
            { text: "View Orders", link: "/seller/orders", icon: "📦" },
            { text: "Sales Analytics", link: "/seller/analytics", icon: "📊" },
          ].map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition"
            >
              <span className="text-3xl">{action.icon}</span>
              <p className="text-lg font-semibold">{action.text}</p>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Customer</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD123", customer: "John Doe", amount: "₦15,000", status: "Pending" },
                { id: "ORD124", customer: "Jane Smith", amount: "₦32,500", status: "Completed" },
              ].map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.amount}</td>
                  <td className={`py-2 ${order.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page