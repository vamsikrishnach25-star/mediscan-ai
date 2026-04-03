import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AppLayout;