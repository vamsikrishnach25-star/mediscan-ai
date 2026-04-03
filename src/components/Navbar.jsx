import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const { toggleTheme } = useTheme();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("reports")) return "Reports";
    if (location.pathname.includes("ai-scan")) return "AI Scan";
    if (location.pathname.includes("settings")) return "Settings";
    return "MediScan AI";
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white dark:bg-gray-900 dark:border-gray-800">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu />
        </button>
        <h1 className="font-semibold text-lg">{getTitle()}</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          Theme
        </button>

        <button
          onClick={logout}
          className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;