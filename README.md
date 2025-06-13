# Platformatory Labs: Temporal.io Full Stack Example

This project demonstrates a modern full-stack application that integrates:

* **Temporal.io** for workflow orchestration
* **Node.js + Express** for backend API
* **MongoDB** for data persistence
* **Google OAuth 2.0** for authentication
* **React (Vite + Tailwind CSS)** for frontend UI

---

## 📁 Project Structure

```
Backend/
  ├── .env
  ├── package.json
  ├── server.js
  └── src/
      ├── Config/
      │   ├── db.config.js
      │   └── passport.js
      ├── controllers/
      ├── models/
      │   └── user.model.js
      ├── routes/
      └── temporal/
          ├── activities.js
          ├── worker.js
          └── workflows.js
Frontend/
  └── my-react-app/
      ├── .gitignore
      ├── eslint.config.js
      ├── index.html
      ├── package.json
      ├── README.md
      ├── vite.config.js
      ├── public/
      │   └── vite.svg
      └── src/
          ├── App.jsx
          ├── index.css
          ├── main.jsx
          └── assets/
              └── react.svg
```

---

## 🚀 Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/)

---

## ⚙️ 1. Start Temporal with Docker

```sh
docker run --name temporal -d -p 7233:7233 temporalio/auto-setup
docker run --name temporal-ui -d -p 8088:8080 \
  --env TEMPORAL_ADDRESS=host.docker.internal:7233 \
  temporalio/ui
```

* Temporal Server: [http://localhost:7233](http://localhost:7233)
* Temporal UI: [http://localhost:8088](http://localhost:8088)

> 🔗 For advanced setups, check out [Temporal's docker-compose example](https://github.com/temporalio/docker-compose).

---

## 🛠️ 2. Backend Setup

1. **Install dependencies**

   ```sh
   cd Backend
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file inside the `Backend/` directory with:

   ```env
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/temporal_app
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   SESSION_SECRET=your-secret
   ```

3. **Start the backend server**

   ```sh
   npm run server
   ```

   > Backend running at: [http://localhost:8080](http://localhost:8080)

---

## 🌐 3. Frontend Setup

1. **Install dependencies**

   ```sh
   cd Frontend/my-react-app
   npm install
   ```

2. **Start the frontend dev server**

   ```sh
   npm run dev
   ```

   > Frontend running at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 4. How to Use

* Open [http://localhost:5173](http://localhost:5173)
* Log in with Google
* View and update profile details
* Temporal workflows/activities reside under `Backend/src/temporal/`

---

## ⛓️ 5. API Routes Overview

### 🔐 Authentication Routes

| Method | Endpoint                | Description                            |
| ------ | ----------------------- | -------------------------------------- |
| GET    | `/auth/google`          | Redirect to Google OAuth login         |
| GET    | `/auth/google/callback` | Google OAuth callback                  |
| GET    | `/auth/logout`          | Logs out the current user              |
| GET    | `/auth/me`              | Returns the current authenticated user |

### 👤 User Routes

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/user/profile` | Fetch current user's profile |
| PUT    | `/api/user/profile` | Update user profile fields   |

---

## ⚙️ 6. Temporal Workflow Directory

* `workflows.js`: Define your workflows
* `activities.js`: Define activity functions
* `worker.js`: Register and run workers on a task queue

Example task queue: `user-task-queue`

---

## 🔗 Useful References

* 📘 [Temporal Documentation](https://docs.temporal.io/)
* ⚡ [Vite Documentation](https://vitejs.dev/)
* ⚛️ [React Documentation](https://react.dev/)

---

## 📄 License

MIT License
