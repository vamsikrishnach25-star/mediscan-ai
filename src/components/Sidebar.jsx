import { NavLink } from "react-router-dom";
import { FiHome, FiCpu, FiFileText, FiSettings } from "react-icons/fi";

const Sidebar = ({ sidebarOpen }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
     }`;

  return (
    <aside
      className={`fixed top-16 h-[calc(100vh-4rem)] w-64
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800
      transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0`}
    >
      <nav className="mt-4 space-y-1 px-3">
        <NavLink to="/dashboard" className={linkClass}>
          <FiHome /> Dashboard
        </NavLink>

        <NavLink to="/ai-scan" className={linkClass}>
          <FiCpu /> AI Scan
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <FiFileText /> Reports
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <FiSettings /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
