# Project Management Dashboard

A modern, feature-rich project management dashboard built with React and Redux, designed to help teams efficiently manage their projects and tasks.

## Features

- 📝 Task Management with Drag-and-Drop
- 📊 Project Tracking and Analytics
- 🎨 Theme Switching (Light/Dark Mode)
- 🔄 Real-time Updates
- 📱 Fully Responsive Design
- 📋 Rich Text Editing
- 📈 Data Visualization
- 🔐 Authentication System

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ProjectBoard.jsx  # Main task board component
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── Header.jsx        # Application header
├── features/       # Feature modules
│   └── theme/      # Theme management
│       └── themeSlice.js
├── routes/         # Application routing
│   └── AppRoutes.jsx
├── styles/         # Global styles
└── main.jsx        # Entry point
```

## Technologies Used

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Framework**: Bootstrap 5
- **Form Handling**: Formik & Yup
- **Drag & Drop**: React DnD
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Rich Text Editor**: React-Quill
- **Icons**: Lucide React

## Development

The project uses Vite as the build tool, providing fast hot module replacement (HMR) and optimized builds.

## Contributing

1. Fork the repository: [Mahendra0006/project-management-dashboard](https://github.com/Mahendra0006/project-management-dashboard)
2. Clone it to your local machine:
   ```bash
   git clone https://github.com/Mahendra0006/project-management-dashboard.git
   cd project-management-dashboard
   ```
3. git commit -m "Add: Your feature description"
4. Push to the branch (https://github.com/Mahendra0006/project-management-dashboard)
5. Open a Pull Request

## Live Demo

[🔗 GitHub Repository](https://github.com/Mahendra0006/project-management-dashboard)

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Special thanks to the open-source community for their amazing tools and libraries

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
