import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProjectBoard from "../components/ProjectBoard";
import { addTask } from "../features/tasks/taskSlice";
import { updateProject } from "../features/projects/projectSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);
  const tasks = useSelector((state) => state.tasks.tasks);
  const members = useSelector((state) => state.members.members);

  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const projectMembers = members.filter((m) => m.projectId === projectId);

  const taskValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Task title is required")
      .min(3, "Task title must be at least 3 characters")
      .max(100, "Task title must not exceed 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters"),
  });

  const projectValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Project name is required")
      .min(3, "Project name must be at least 3 characters")
      .max(100, "Project name must not exceed 100 characters"),
    description: Yup.string().min(
      3,
      "Description must be at least 3 characters"
    ),
  });

  const handleAddTask = (values, { resetForm }) => {
    dispatch(
      addTask({
        title: values.title.trim(),
        description: values.description.trim(),
        projectId,
        status: "To Do",
      })
    );
    resetForm();
    toast.success("Task added successfully");
  };

  return (
    <div className="container mt-4">
      {project ? (
        <div className="row">
          {/* Left Panel */}
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: project?.name || "",
                    description: project?.description || "",
                  }}
                  validationSchema={projectValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                      updateProject({
                        id: projectId,
                        name: values.name.trim(),
                        description: values.description.trim(),
                      })
                    );
                    setSubmitting(false);
                    toast.success("Project updated successfully");
                  }}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <div className="mb-3">
                        <Field
                          name="name"
                          type="text"
                          className={`form-control ${
                            errors.name && touched.name ? "is-invalid" : ""
                          }`}
                          placeholder="Project Name"
                        />
                        {errors.name && touched.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <Field
                          name="description"
                          as="textarea"
                          className={`form-control ${
                            errors.description && touched.description
                              ? "is-invalid"
                              : ""
                          }`}
                          rows="3"
                          placeholder="Project Description"
                        />
                        {errors.description && touched.description && (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Save Project Changes
                      </button>
                    </Form>
                  )}
                </Formik>

                <h5 className="mt-4">Project Members</h5>
                <div className="d-flex flex-wrap gap-2">
                  {projectMembers.map((member) => (
                    <div key={member.id} className="badge bg-primary me-2">
                      {member.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ProjectBoard projectId={projectId} />
          </div>

          {/* Right Panel */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Add Task</h5>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    projectId,
                  }}
                  validationSchema={taskValidationSchema}
                  onSubmit={handleAddTask}
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    values,
                    handleChange,
                  }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Task Title</label>
                        <input
                          type="text"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.title && touched.title ? "is-invalid" : ""
                          }`}
                          placeholder="Enter task title"
                        />
                        {errors.title && touched.title && (
                          <div className="invalid-feedback d-block">
                            {errors.title}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Task Description</label>
                        <textarea
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.description && touched.description
                              ? "is-invalid"
                              : ""
                          }`}
                          rows="3"
                          placeholder="Enter task description"
                        />
                        {errors.description && touched.description && (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={
                          isSubmitting ||
                          !values.title.trim() ||
                          !values.description.trim()
                        }
                      >
                        Add Task
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project Statistics</h5>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted small text-nowrap">
                      Total Tasks
                    </h6>
                    <h4 className="mb-0">{projectTasks.length}</h4>
                  </div>
                  <div>
                    <h6 className="text-muted small text-nowrap">
                      In Progress
                    </h6>
                    <h4 className="mb-0">
                      {
                        projectTasks.filter((t) => t.status === "In Progress")
                          .length
                      }
                    </h4>
                  </div>
                  <div>
                    <h6 className="text-muted small text-nowrap">Completed</h6>
                    <h4 className="mb-0">
                      {projectTasks.filter((t) => t.status === "Done").length}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <div className="text-center">
            <h1 className="display-4 text-dark mb-3">Project Not Found</h1>
            <p className="text-muted mb-4">
              The project you are looking for does not exist or has been
              deleted.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-warning btn-lg"
            >
              Go Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
