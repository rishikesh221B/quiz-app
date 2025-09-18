# 📚 Quiz App

A full-stack quiz platform built with **React (frontend)**, **Node.js + Express (backend)**, **MongoDB (database)**, and **Redis (caching)**.
It supports user authentication, quiz creation by admins, leaderboard tracking, and real-time score updates.

---

## 🚀 Features

* User registration & login (JWT authentication)
* Admin panel for creating & managing quizzes
* Quiz attempt system with scoring
* Leaderboard per quiz
* Responsive frontend built in React
* RESTful backend with Node.js & Express
* MongoDB for persistent storage
* Redis for caching leaderboard data

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* Redis

---

## 📂 Project Structure

```
quiz-app/              
│
├─ frontend/             # React frontend
│   ├─ src/
│   │   ├─ components/
│   │   ├─ pages/
│   │   ├─ App.js
│   │   └─ index.js
│   ├─ public/
│   │   └─ index.html
│   ├─ package.json
│   └─ .env             
│
├─ backend/              # Node.js + Express backend
│   ├─ routes/
│   ├─ models/
│   ├─ middleware/
│   ├─ config/           
│   ├─ server.js
│   ├─ package.json
│   └─ .env             
│
├─ .gitignore
└─ README.md
```



---

## 🔑 Environment Variables

### Backend `.env`

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
PORT=5000
```

### Frontend `.env`

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📝 Future Improvements

* Password reset (Forgot Password)
* Quiz categories & difficulty levels
* Timer-based quizzes
* Deployment on cloud (Heroku/Vercel/Render)

---

## 👨‍💻 Author

Developed by **Vijay Tejas Walishettar**

---
