import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clear auth state
    navigate("/login");    // redirect to login
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 flex items-center justify-between">
      
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        MediScan AI
      </h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
