import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaChartPie, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Layout = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            ProjectPro
          </h1>
        </div>
        
        <nav className="px-4">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>

          <Link 
            to="/projects" 
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              location.pathname.startsWith('/projects') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaProjectDiagram className="mr-3" />
            Projects
          </Link>

          <Link 
            to="/analytics" 
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              location.pathname === '/analytics' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaChartPie className="mr-3" />
            Analytics
          </Link>

          <Link 
            to="/settings" 
            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              location.pathname === '/settings' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaCog className="mr-3" />
            Settings
          </Link>
        </nav>

        <div className="mt-auto p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user?.role}</p>
            </div>
          </div>
          <Link 
            to="/login" 
            className="mt-4 flex items-center px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
