import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#ffc658", "#82ca9d"];

const TaskStatusChart = ({ projectId }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );

  const statusCount = ["To Do", "In Progress", "Done"].map((status) => ({
    name: status,
    value: tasks.filter((t) => t.status === status).length,
  }));

  return (
    <PieChart width={400} height={250}>
      <Pie
        data={statusCount}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label
      >
        {statusCount.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TaskStatusChart;
