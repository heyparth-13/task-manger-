<p align="center">
  <img src="https://img.icons8.com/fluency/96/task-planning.png" alt="TaskFlow Logo" width="80"/>
</p>

<h1 align="center">TaskFlow</h1>

<p align="center">
  <strong>A premium, full-stack task management application built for modern teams and individuals.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Express.js-4-green?style=for-the-badge&logo=express" alt="Express"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
</p>

---

## ✨ Features

- 🔐 **Secure Authentication** — Register & login with JWT-based auth and bcrypt password hashing
- 📋 **Full Task CRUD** — Create, read, update, and delete tasks with ease
- 🏷️ **Status & Priority** — Organize tasks by status (To Do, In Progress, Done) and priority (Low, Medium, High)
- 📊 **Dashboard Analytics** — Real-time summary cards showing task breakdowns at a glance
- 🔍 **Filter & Search** — Quickly filter tasks by status
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- 🎨 **Premium UI** — Handcrafted design with micro-animations, glassmorphism, and smooth transitions
- ⚡ **Zero-Config Database** — Uses a local JSON file database — no MongoDB setup required

---

## 🖼️ Screenshots

| Login Page | Dashboard |
|:---:|:---:|
| Split-screen layout with gradient hero | Premium stats cards & task grid |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Axios** | HTTP client for API calls |
| **React Hot Toast** | Toast notifications |
| **Lucide React** | Premium icon library |
| **date-fns** | Date formatting |

### Backend
| Technology | Purpose |
|---|---|
| **Express.js** | REST API framework |
| **bcryptjs** | Secure password hashing |
| **jsonwebtoken** | JWT authentication |
| **dotenv** | Environment variable management |
| **nodemon** | Development auto-restart |

---

## 📁 Project Structure

```
TaskFlow/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages & layouts
│   │   │   ├── (auth)/      # Login & Register pages
│   │   │   └── dashboard/   # Protected dashboard
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Button, Input
│   │   │   ├── layout/      # Sidebar, Header
│   │   │   └── tasks/       # TaskCard, TaskFormModal
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── services/        # API service layer
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
│
├── backend/                 # Express.js backend API
│   ├── server.js            # Entry point
│   └── src/
│       ├── config/          # Database (JSON file) & utilities
│       ├── controllers/     # Auth & Task business logic
│       ├── middleware/       # JWT auth & error handling
│       ├── models/          # Data models
│       ├── routes/          # API route definitions
│       └── utils/           # Token generation helpers
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/heyparth-13/task-manger-.git
cd task-manger-
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

The backend server will start on **http://localhost:5001**.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:3001**.

### 4. Open in Browser

Navigate to **http://localhost:3001** and create an account to get started!

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login & receive JWT token |
| `GET` | `/api/auth/me` | Get current user profile |

### Tasks (Protected — requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks for logged-in user |
| `GET` | `/api/tasks/:id` | Get a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## 🔒 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/heyparth-13">Parth</a>
</p>
