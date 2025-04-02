# Task Manager Authentication System

## Overview
The **Task Manager Authentication System** is an API built with **Node.js, Express, Prisma ORM, and Supabase PostgreSQL**. It enables user registration, login with JWT-based authentication, and provides a complete task management system with protected routes.

## Features
- **User Registration** with hashed passwords
- **JWT-based Authentication**
- **Login System** with token generation
- **Task Management:** Create, read, update, and delete tasks for the logged-in user
- **Protected API Routes**
- **CORS enabled** to allow frontend communication
- **Prisma ORM** for database interaction with **Supabase PostgreSQL**

## Technologies Used
- **Node.js & Express.js** (Backend Framework)
- **Prisma ORM** (Database ORM for PostgreSQL)
- **Supabase PostgreSQL** (Cloud Database)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **CORS** (Cross-Origin Resource Sharing)

## API Endpoints

### Base URL
```
https://task-manager-dtiv.onrender.com
```

### 1. Authentication

#### **Register a User**
- **Endpoint:** `/api/auth/register`  
- **Method:** `POST`  
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **User Login**
- **Endpoint:** `/api/auth/login`  
- **Method:** `POST`  
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

#### **Logout**
- **Endpoint:** `/api/auth/logout`  
- **Method:** `POST`  
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### 2. Task Management (Protected Routes)
*All task endpoints require an `Authorization` header with a valid JWT token in the format: `Bearer your-jwt-token`.*

#### **Get Tasks**
- **Endpoint:** `/api/tasks`  
- **Method:** `GET`  
- **Response:**
  ```json
  [
    {
      "id": "task-id",
      "title": "Task Title",
      "description": "Task description",
      "completed": false,
      "userId": "user-id",
      "createdAt": "timestamp"
    },
    ...
  ]
  ```

#### **Create a New Task**
- **Endpoint:** `/api/tasks`  
- **Method:** `POST`  
- **Request Body:**
  ```json
  {
    "title": "New Task",
    "description": "Task description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "new-task-id",
    "title": "New Task",
    "description": "Task description",
    "completed": false,
    "userId": "user-id",
    "createdAt": "timestamp"
  }
  ```

#### **Update an Existing Task**
- **Endpoint:** `/api/tasks/:id`  
- **Method:** `PUT`  
- **Request Body:** *(Any fields to update, for example: title, description, completed)*
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Response:**
  ```json
  {
    "id": "task-id",
    "title": "Updated Task Title",
    "description": "Updated description",
    "completed": true,
    "userId": "user-id",
    "createdAt": "timestamp"
  }
  ```

#### **Delete a Task**
- **Endpoint:** `/api/tasks/:id`  
- **Method:** `DELETE`  
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Setup & Installation

### Prerequisites
- Node.js installed
- PostgreSQL Database (Supabase is used in this project)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/task-manager-auth.git
   cd backend
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL=your-supabase-database-url
   DIRECT_URL=your-supabase-db-direct-url
   JWT_SECRET=your-secret-key
   ```
4. **Run Database Migrations**
   ```sh
   npx prisma migrate dev --name init
   ```
5. **Start the Server**
   ```sh
   npm start
   ```
6. The server will run on `http://localhost:5000`

## Deployment
This API is hosted on **Render**. To deploy your own:
1. Push your code to **GitHub**.
2. Go to **Render** and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the environment variables (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`).
5. Click **Deploy**.

## Frontend
This API can be integrated with any frontend framework. A **Next.js + Tailwind CSS** frontend is recommended.

## License
This project is licensed under the **MIT License**.

---

### Contributors
- **Dilshad** (Developer) rdilshad3559@gmail.com
