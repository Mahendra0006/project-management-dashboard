import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Moon, Sun } from "lucide-react";

const Settings = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  const appearanceBg = "#6c5ce7";

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">⚙️ Application Settings</h2>
        <p style={{ color: isDark ? "#ccc" : "#333", marginTop: "0.5rem" }}>
          Customize your preferences and appearance
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div
              className="card-header text-white"
              style={{ backgroundColor: appearanceBg }}
            >
              <h5 className="mb-0">Appearance</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                  <label
                    className="form-check-label fw-medium"
                    htmlFor="themeToggle"
                  >
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </label>
                </div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeToggle"
                  checked={isDark}
                  onChange={() => dispatch(toggleTheme())}
                  style={{
                    width: "3rem",
                    height: "1.5rem",
                    backgroundColor: isDark ? appearanceBg : appearanceBg,
                    borderColor: appearanceBg,
                  }}
                />
              </div>
              <small className="text-muted d-block mt-2">
                Toggle between light and dark themes to suit your mood.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
