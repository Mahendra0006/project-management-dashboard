import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/main.css";
import { useSelector } from "react-redux";

const App = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return (
    <div className={`app-container ${isDark ? "dark-mode" : ""}`} style={{ minHeight: '100vh' }}>
      {isAuthenticated ? (
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="flex-grow-1 d-flex">
            <Sidebar />
            <div className="main-content flex-grow-1" style={{
              minHeight: '100vh',
              background: isDark ? '#1a1a1a' : '#fff'
            }}>
              <div className="content-wrapper p-4 h-100">
                <AppRoutes />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-content flex-grow-1">
          <AppRoutes />
        </div>
      )}
    </div>
  );
};

export default App;
