import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { PieChart, Pie, Cell } from "recharts";
import { toast } from "react-toastify";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: {
      id: task.id,
      status: task.status,
      projectId: task.projectId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isEditing && editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      quill.clipboard.dangerouslyPasteHTML(description || "");
      quill.format("direction", "ltr");

      quill.root.style.color = "#000";

      quillRef.current = quill;

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        if (html !== description) {
          setDescription(html);
        }
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(task.description || "");
    }
  }, [isEditing, task.description]);

  useEffect(() => {
    return () => {
      quillRef.current = null;
    };
  }, []);

  const handleEdit = () => {
    setDescription(task.description);
    setIsEditing(true);
  };
  const handleCancel = () => {
    setDescription(task.description);
    setIsEditing(false);
  };
  const handleSave = () => {
    if (description.trim()) {
      dispatch(
        updateTask({
          id: task.id,
          description,
          projectId: task.projectId,
        })
      );
      setIsEditing(false);
      toast.success("Task description updated successfully");
    } else {
      toast.error("Description cannot be empty");
    }
  };

  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((t) => t.projectId === task.projectId)
  );

  const statusCount = [
    { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
    },
    { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
  ];

  const COLORS = ["#6c757d", "#f6ad55", "#48bb78"];

  if (isEditing) {
    return (
      <div
        ref={drag}
        className="card shadow-sm p-3 mb-3"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">{task.title}</h5>
          <div className="btn-group">
            <button
              className="btn btn-sm btn-success"
              onClick={handleSave}
              disabled={!description.trim()}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          ref={editorRef}
          style={{
            minHeight: "120px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={drag}
      className="card shadow-sm p-3 mb-3 border-0"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}
      onClick={() => navigate(`/project/${task.projectId}`)}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="fw-semibold">{task.title}</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: description || "<em>No description</em>",
            }}
            className="text-secondary mt-2"
          />
        </div>
        <div className="text-end">
          <PieChart width={90} height={90}>
            <Pie
              data={statusCount}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={35}
              innerRadius={18}
            >
              {statusCount.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <button
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            Edit Description
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
