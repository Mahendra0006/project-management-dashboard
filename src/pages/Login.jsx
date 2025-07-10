import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [error, isAuthenticated, navigate, dispatch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    try {
      dispatch(loginStart());

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API

      if (!values.email) {
        throw new Error("Invalid credentials");
      }

      dispatch(
        loginSuccess({
          id: Date.now(),
          email: values.email,
          role: "admin",
          name: values.email.split("@")[0],
        })
      );
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(error.message || "Login failed. Please try again.")
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div
                className="card-header text-white text-center py-3"
                style={{ backgroundColor: "#6c5ce7" }}
              >
                <h4 className="fw-bold mb-0">Welcome</h4>
              </div>
              <div className="card-body p-5">
                <Formik
                  initialValues={{ email: "", role: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className={`form-control ${
                            errors.email && touched.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="Enter your email"
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                          Role
                        </label>
                        <Field
                          as="select"
                          name="role"
                          className={`form-select ${
                            errors.role && touched.role ? "is-invalid" : ""
                          }`}
                          id="role"
                        >
                          <option value="">Select role...</option>
                          <option value="admin">Admin</option>
                        </Field>
                        {errors.role && touched.role && (
                          <div className="invalid-feedback d-block">
                            {errors.role}
                          </div>
                        )}
                      </div>

                      <div className="d-grid pt-2">
                        <button
                          type="submit"
                          className="btn btn-lg text-white"
                          style={{ backgroundColor: "#6c5ce7" }}
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
