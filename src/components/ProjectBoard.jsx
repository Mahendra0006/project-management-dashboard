import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { moveTask } from "../features/tasks/taskSlice";
import { useDrop } from "react-dnd";

// Column component
const Column = ({ status, tasks, onDrop, projectId }) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status && item.projectId === projectId) {
        onDrop(item.id, status, projectId);
      }
    },
  }));

  const statusColors = {
    "To Do": {
      background: "#f8f9fa",
      color: "#212529",
    },
    "In Progress": {
      background: "#f0f2f5",
      color: "#212529",
    },
    Done: {
      background: "#f8fafc",
      color: "#212529",
    },
  };

  const getStatusStyle = (status) => {
    const style = statusColors[status] || {
      background: "#f8f9fa",
      color: "#212529",
    };
    return {
      ...style,
      minHeight: "300px",
    };
  };

  return (
    <div
      ref={drop}
      className="col rounded p-3 m-2 shadow-sm"
      style={getStatusStyle(status)}
    >
      <h5 className="text-center mb-3 text-dark">{status}</h5>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

// Main ProjectBoard component
const ProjectBoard = ({ projectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );

  const handleDrop = (taskId, newStatus, draggedProjectId) => {
    if (projectId === draggedProjectId) {
      dispatch(moveTask({ taskId, newStatus, projectId }));
    }
  };

  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="row">
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onDrop={handleDrop}
          projectId={projectId}
        />
      ))}
    </div>
  );
};

export default ProjectBoard;
