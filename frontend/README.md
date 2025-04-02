Below is a clean, professional README file for your full‐stack Task Manager application:

---

```markdown
# Task Manager Full-Stack Application

## Overview
The **Task Manager** application is a full‐stack web application that allows users to register, log in, and manage their own tasks securely. The app features JWT‐based authentication and provides a modern, responsive frontend built with Next.js, Tailwind CSS, Redux Toolkit, Axios, React Hook Form, and Zod for validation. The backend is powered by Node.js, Express, Prisma ORM, and Supabase PostgreSQL.

## Features
- **User Authentication**
  - User registration with name, email, and password (passwords are securely hashed)
  - Login with JWT-based authentication
  - Auto-login on refresh via persistent localStorage
  - Logout functionality
- **Task Management**
  - Authenticated users can view, create, update, and delete their tasks
  - Each task includes a title, an optional description, and a status (pending/completed)
  - Users only see and manage their own tasks
- **Modern Frontend**
  - Built with Next.js (App Directory) and Tailwind CSS
  - Global state management with Redux Toolkit
  - API communication using Axios
  - Form handling and validation with React Hook Form and Zod
  - Toast notifications for user feedback (using React Toastify)
  - Smooth animations and responsive UI

## Technologies Used
- **Frontend:**
  - Next.js (v13+ with App Directory)
  - Tailwind CSS
  - Redux Toolkit & React-Redux
  - Axios
  - React Hook Form & Zod
  - React Toastify
- **Backend:**
  - Node.js & Express.js
  - Prisma ORM
  - Supabase PostgreSQL
  - JSON Web Tokens (JWT)
  - Bcrypt.js for password hashing
  - CORS for secure cross-origin requests

## Project Structure
```
/backend
├── server.js                 // Express server & API routes
├── prisma/
│    └── schema.prisma        // Prisma schema for User & Task models
├── .env                      // Environment variables (DATABASE_URL, DIRECT_URL, JWT_SECRET)
└── package.json              // Backend dependencies and scripts

/frontend (Next.js App using App Directory)
├── src/
│    ├── app/
│    │    ├── layout.js        // Global layout (wraps Redux Provider, AuthGuard, and Header)
│    │    ├── page.jsx         // Landing page
│    │    ├── auth/
│    │    │    ├── login/page.jsx       // Login page (with React Hook Form, Zod, and Toasts)
│    │    │    └── register/page.jsx    // Register page (auto-login after registration)
│    │    └── tasks/
│    │         ├── page.jsx             // Tasks dashboard (CRUD operations)
│    │         ├── create/page.jsx      // Create Task page
│    │         └── update/[id]/page.jsx   // Update Task page
│    ├── components/
│    │       ├── Header.js              // Global header (displays user info and logout)
│    │       └── Providers.js           // Redux Provider and AuthGuard component
│    ├── redux/
│    │     ├── store.js                // Redux store configuration
│    │     └── slices/
│    │           ├── authSlice.js      // Auth slice (stores token and user details)
│    │           └── taskSlice.js      // Task slice (stores tasks)
│    ├── api.js                        // API functions (using Axios)
│    └── globals.css                   // Global styles (Tailwind CSS, loader styles, etc.)
└── package.json                       // Frontend dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Supabase account with a PostgreSQL database instance

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

#### 2. Setup the Backend
- Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file with:
  ```env
  DATABASE_URL=your_supabase_database_url
  DIRECT_URL=your_supabase_direct_url
  JWT_SECRET=your_secret_key
  ```
- Run Prisma migrations:
  ```bash
  npx prisma migrate dev --name init
  ```
- Start the backend server:
  ```bash
  npm start
  ```
  The backend server runs on `http://localhost:5000`.

#### 3. Setup the Frontend
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file (if needed) and set:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000  # For production, use your deployed backend URL (e.g., https://task-manager-dtiv.onrender.com)
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
  The frontend will run on `http://localhost:3000`.

## Usage
- **Registration & Login:**
  - Visit `/auth/register` to create a new account.
  - After registration, you are automatically logged in.
  - Visit `/auth/login` to sign in; successful login stores your token and user details, redirecting you to the tasks dashboard.
- **Task Management:**
  - Once logged in, view your tasks at `/tasks`.
  - Create tasks at `/tasks/create`.
  - Update or delete tasks from the dashboard.
  - Only tasks belonging to the logged-in user are accessible.
- **Persistent Session:**
  - JWT and user details are stored in Redux and localStorage, ensuring you remain logged in on refresh.
- **Notifications:**
  - Toast notifications inform you of successful or failed operations (login, task creation, updates, deletions).

## Deployment
- **Backend Deployment:**
  - Deploy the backend on platforms like Render, Heroku, or Fly.io. Update environment variables accordingly.
- **Frontend Deployment:**
  - Deploy the Next.js frontend on Vercel, Netlify, or Render. Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend URL.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss your ideas.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For inquiries or support, please contact [your-email@example.com].
```

---

This README covers the overview, features, tech stack, project structure, setup instructions, usage, deployment details, and contribution guidelines. Adjust the repository URLs, contact details, and any environment-specific instructions as needed.