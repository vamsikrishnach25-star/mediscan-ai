import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input
              type="text"
              value="Vamsi Krishna"
              disabled
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              value="vamsi@example.com"
              disabled
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-gray-500">
              Currently using <strong>{theme}</strong> mode
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Security</h2>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current password"
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent"
          />
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-not-allowed"
            disabled
          >
            Update Password (Backend Required)
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Settings;
