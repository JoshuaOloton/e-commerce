"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, Package, Users } from "lucide-react";
import { ReactElement } from "react";


function Card({ title, value, icon } : { title: string, value: string, icon: ReactElement }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex items-center gap-4">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

const Home = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  return (
    <div>
      {/* Main Content */}
      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Card title="Total Users" value="1,245" icon={<Users size={24} />} />
          <Card title="Active Listings" value="230" icon={<Package size={24} />} />
          <Card title="Pending Offers" value="15" icon={<Bell size={24} />} />
        </div>

        {/* Recent Activity */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span>John Doe made an offer on a product.</span>
              <span className="text-gray-500">2 mins ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Admin rejected an offer.</span>
              <span className="text-gray-500">15 mins ago</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-3 bg-green-600 text-white rounded-md">Manage Offers</button>
          <button className="p-3 bg-yellow-600 text-white rounded-md">View Notifications</button>
          <button className="p-3 bg-red-600 text-white rounded-md">Settings</button>
        </div>
      </div>
    </div>
  )
}

export default Home