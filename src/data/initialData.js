export const sampleProjects = [
  {
    id: "1",
    name: "Project A",
    description: "First sample project",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Project B",
    description: "Second sample project",
    createdAt: new Date().toISOString(),
  },
];

export const sampleTasks = [
  {
    id: "1",
    title: "Task 1",
    description: "First task description",
    status: "To Do",
    projectId: "1",
    assignedTo: "1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Second task description",
    status: "In Progress",
    projectId: "1",
    assignedTo: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "Third task description",
    status: "Done",
    projectId: "1",
    assignedTo: "1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Task 4",
    description: "Fourth task description",
    status: "To Do",
    projectId: "2",
    assignedTo: "2",
    createdAt: new Date().toISOString(),
  },
];

export const sampleMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    projectId: "1",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    projectId: "1",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    projectId: "2",
  },
];
