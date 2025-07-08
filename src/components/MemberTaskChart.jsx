import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MemberTaskChart = ({ projectId }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );
  const members = useSelector((state) =>
    state.members.members.filter((member) => member.projectId === projectId)
  );

  // Calculate task distribution per member
  const memberTasks = members.map((member) => {
    const memberTasks = tasks.filter((task) => task.assignedTo === member.id);
    return {
      name: member.name,
      total: memberTasks.length,
      todo: memberTasks.filter((t) => t.status === "To Do").length,
      inProgress: memberTasks.filter((t) => t.status === "In Progress").length,
      done: memberTasks.filter((t) => t.status === "Done").length,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={memberTasks}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="todo" name="To Do" fill="#8884d8" />
        <Bar dataKey="inProgress" name="In Progress" fill="#ffc658" />
        <Bar dataKey="done" name="Done" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MemberTaskChart;
