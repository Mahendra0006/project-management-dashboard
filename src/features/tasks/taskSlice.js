import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, projectId, description } = action.payload;
      state.tasks.push({
        id: nanoid(),
        title,
        description,
        projectId,
        status: "To Do",
      });
    },
    moveTask: (state, action) => {
      const { taskId, newStatus, projectId } = action.payload;
      const taskIndex = state.tasks.findIndex(
        (t) => t.id === taskId && t.projectId === projectId
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = newStatus;
      }
    },
    deleteTask: (state, action) => {
      const { taskId, projectId } = action.payload;
      state.tasks = state.tasks.filter(
        (task) => !(task.id === taskId && task.projectId === projectId)
      );
    },
    updateTask: (state, action) => {
      const { id, description, projectId } = action.payload;
      const taskIndex = state.tasks.findIndex(
        (t) => t.id === id && t.projectId === projectId
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].description = description;
      }
    },
  },
});

export const { addTask, moveTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
