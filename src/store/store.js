import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";
import taskReducer from "../features/tasks/taskSlice";
import memberReducer from "../features/members/memberSlice";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    members: memberReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;
