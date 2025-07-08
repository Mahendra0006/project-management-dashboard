import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addProject, deleteProject } from "../features/projects/projectSlice";
import { addTask } from "../features/tasks/taskSlice";
import ProjectBoard from "../components/ProjectBoard";
import { toast } from "react-toastify";
import NoData from "../components/NoData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const tasks = useSelector((state) => state.tasks.tasks);

  const projectValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Project name is required")
      .min(3, "Project name must be at least 3 characters")
      .max(100, "Project name must not exceed 100 characters"),
  });

  const taskValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Task title is required")
      .min(3, "Task title must be at least 3 characters")
      .max(100, "Task title must not exceed 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters"),
  });

  const handleProjectSubmit = (values, { resetForm }) => {
    const newProject = {
      id: Date.now().toString(),
      name: values.name.trim(),
      description: "",
    };

    dispatch(addProject(newProject));
    resetForm();
    toast.success("Project added successfully!");
  };

  const handleTaskSubmit = (values, resetForm, projectId) => {
    dispatch(
      addTask({
        title: values.title.trim(),
        description: values.description.trim(),
        projectId,
        createdAt: new Date().toISOString(),
      })
    );
    resetForm();
    toast.success("Task added successfully!");
  };

  const handleDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId));
    toast.success("Project deleted successfully!");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={projectValidationSchema}
          onSubmit={handleProjectSubmit}
        >
          {({ errors, touched }) => (
            <Form className="d-flex gap-2">
              <div className="flex-grow-1">
                <Field
                  name="name"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                  placeholder="New project name"
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-outline-light bg-dark text-white fw-semibold px-3"
              >
                Add Project
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {projects.length === 0 ? (
        <NoData message="No projects available. Start by creating a new one!" />
      ) : (
        <div className="row">
          {projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.projectId === project.id
            );
            const toDo = projectTasks.filter(
              (t) => t.status === "To Do"
            ).length;
            const inProgress = projectTasks.filter(
              (t) => t.status === "In Progress"
            ).length;
            const done = projectTasks.filter((t) => t.status === "Done").length;

            return (
              <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0 fw-semibold">
                        {project.name}
                      </h5>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Task Counts */}
                    <div className="d-flex justify-content-between text-center mb-3">
                      <div className="flex-fill mx-1 p-2 rounded bg-light border">
                        <h6 className="mb-1 text-muted small">To Do</h6>
                        <strong className="fs-5 text-dark">{toDo}</strong>
                      </div>
                      <div className="flex-fill mx-1 p-2 rounded bg-light border">
                        <h6 className="mb-1 text-muted small">In Progress</h6>
                        <strong className="fs-5 text-dark">{inProgress}</strong>
                      </div>
                      <div className="flex-fill mx-1 p-2 rounded bg-light border">
                        <h6 className="mb-1 text-muted small">Done</h6>
                        <strong className="fs-5 text-dark">{done}</strong>
                      </div>
                    </div>

                    {/* Task Form */}
                    <Formik
                      initialValues={{ title: "", description: "" }}
                      validationSchema={taskValidationSchema}
                      onSubmit={(values, { resetForm }) =>
                        handleTaskSubmit(values, resetForm, project.id)
                      }
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="mb-2">
                            <label htmlFor="title" className="form-label small">
                              Task Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className={`form-control form-control-sm ${
                                errors.title && touched.title
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.title && touched.title && (
                              <div className="invalid-feedback">
                                {errors.title}
                              </div>
                            )}
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="description"
                              className="form-label small"
                            >
                              Description
                            </label>
                            <Field
                              name="description"
                              as="textarea"
                              rows={2}
                              className={`form-control form-control-sm ${
                                errors.description && touched.description
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.description && touched.description && (
                              <div className="invalid-feedback">
                                {errors.description}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary w-100"
                          >
                            Add Task
                          </button>
                        </Form>
                      )}
                    </Formik>

                    {/* Project Board */}
                    <div className="mt-3 flex-grow-1">
                      <ProjectBoard projectId={project.id} />
                    </div>

                    {/* View Button */}
                    <div className="mt-3 text-end">
                      <button
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="btn btn-sm btn-outline-dark text-white bg-dark"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
