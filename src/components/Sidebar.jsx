import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  Brain
} from "lucide-react";

const Sidebar = ({ sidebarOpen }) => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition";

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200`}
    >
      <div className="p-6 text-xl font-bold text-blue-600">
        MediScan AI
      </div>

      <nav className="space-y-2 px-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/ai-scan"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Brain size={18} />
          AI Scan
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FileText size={18} />
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;