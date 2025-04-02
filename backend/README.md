# Task Manager Authentication System

## Overview
The **Task Manager Authentication System** is a user authentication API built with **Node.js, Express, Prisma ORM, and Supabase PostgreSQL**. It enables user registration, login, JWT-based authentication, and protected routes.

## Features
- **User Registration** with hashed passwords
- **JWT-based Authentication**
- **Login System** with token generation
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

### **Base URL**
```
https://task-manager-dtiv.onrender.com
```

### **1. Register a User**
**Endpoint:** `/register`  
**Method:** `POST`  
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### **2. User Login**
**Endpoint:** `/login`  
**Method:** `POST`  
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "your-jwt-token"
}
```

### **3. Protected Route** (Requires Authentication)
**Endpoint:** `/protected`  
**Method:** `GET`  
**Headers:**
```json
{
  "Authorization": "Bearer your-jwt-token"
}
```
**Response:**
```json
{
  "message": "You have accessed a protected route!",
  "userId": "user-id"
}
```

## Setup & Installation
### Prerequisites
- Node.js installed
- PostgreSQL Database (Supabase used in this project)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/lytcode404/mea-tec/tree/master/
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
   DIRECT_URL=your-supabse-db-url
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
This API is hosted on **Render**. If you want to deploy your own:
1. Push your code to **GitHub**.
2. Go to **Render** and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set environment variables (`DATABASE_URL`,, `DIRECT_URL`, `JWT_SECRET`).
5. Click **Deploy**.

## Frontend
This API can be integrated with any frontend framework. A **Next.js + Tailwind CSS** frontend is recommended.

## License
This project is licensed under the **MIT License**.

---
### Contributors
- **Dilshad** (Developer)

