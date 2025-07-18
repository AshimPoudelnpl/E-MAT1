# Project Overview

## 📁 Project Structure
This is a **full-stack web application** with separate client and server components.

```
/workspace/
├── client/          # Frontend (React + Vite)
├── server/          # Backend (Node.js + Express)
└── .git/           # Git repository
```

## 🖥️ Frontend (Client)
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.8
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.6.1
- **HTTP Client**: Axios 1.10.0
- **UI Components**: React Icons, SweetAlert2
- **Build Tool**: Vite with ESLint configuration

### Client Dependencies:
- **Core**: React, React DOM, React Router DOM
- **State**: Redux Toolkit, React Redux
- **Styling**: Tailwind CSS (with Vite plugin)
- **HTTP**: Axios
- **Icons**: React Icons
- **Alerts**: SweetAlert2

### Client Scripts:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint linting
- `npm run preview` - Preview build

## ⚙️ Backend (Server)
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose 8.15.0
- **Authentication**: JWT + bcrypt/bcryptjs
- **File Upload**: Multer 2.0.1, Express FileUpload 1.5.1
- **Cloud Storage**: Cloudinary 2.6.1
- **Email**: Nodemailer 7.0.3
- **Security**: CORS, Cookie Parser

### Server Dependencies:
- **Framework**: Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt, bcryptjs
- **File Handling**: Multer, Express FileUpload
- **Cloud Services**: Cloudinary
- **Utilities**: UUID, Nodemailer, dotenv
- **Development**: Nodemon

### Server Scripts:
- `npm start` - Production server
- `npm run dev` - Development server with Nodemon

## 🏗️ Architecture
- **Frontend**: Single Page Application (SPA) with React
- **Backend**: RESTful API with Express.js
- **Database**: MongoDB (NoSQL)
- **File Storage**: Cloudinary integration
- **Authentication**: JWT-based auth system
- **Development**: Hot reload on both client and server

## 📂 Key Directories
- **client/src/pages/**: React page components
- **client/src/components/**: Reusable React components
- **client/src/store/**: Redux store configuration
- **server/routes/**: API route definitions
- **server/controllers/**: Business logic controllers
- **server/models/**: MongoDB/Mongoose models
- **server/middleware/**: Express middleware
- **server/config/**: Server configuration files

## 🚀 Getting Started
1. **Install dependencies**:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Development mode**:
   ```bash
   # Terminal 1 - Start server
   cd server && npm run dev
   
   # Terminal 2 - Start client
   cd client && npm run dev
   ```

This appears to be a modern full-stack web application with user authentication, file upload capabilities, and a responsive React frontend backed by a robust Node.js API server.