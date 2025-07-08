import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const { name } = action.payload;
      const existingProject = state.projects.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      if (existingProject) {
        throw new Error("Project with this name already exists");
      }

      state.projects.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
});

export const { addProject, deleteProject, updateProject } =
  projectSlice.actions;
export default projectSlice.reducer;
