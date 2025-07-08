import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TaskProgressChart = ({ projectId }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );

  // Group tasks by date and status
  const taskProgress = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toLocaleDateString();
    acc[date] = acc[date] || { date, todo: 0, inProgress: 0, done: 0 };

    switch (task.status) {
      case "To Do":
        acc[date].todo += 1;
        break;
      case "In Progress":
        acc[date].inProgress += 1;
        break;
      case "Done":
        acc[date].done += 1;
        break;
    }

    return acc;
  }, {});

  // Convert to array and sort by date
  const data = Object.values(taskProgress).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="todo" name="To Do" stroke="#8884d8" />
        <Line
          type="monotone"
          dataKey="inProgress"
          name="In Progress"
          stroke="#ffc658"
        />
        <Line type="monotone" dataKey="done" name="Done" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TaskProgressChart;
