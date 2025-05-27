# 🌟 Taskforge – Modern B2B Project Management SaaS

Welcome to **Taskforge**, a powerful and scalable project management platform tailored for B2B teams. Built using a modern fullstack stack, Taskforge offers an intuitive interface, real-time collaboration, and comprehensive features to supercharge productivity across organizations.

---

## 🚀 Tech Stack

| Tool / Framework            | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| **Next.js (App Router)**    | React-based framework for frontend development with SSR and client routing. |
| **Node.js + Express + TS**  | TypeScript-based backend for scalable API development.                      |
| **MongoDB + Mongoose**      | NoSQL document database used for storing all app data.                      |
| **Google & GitHub OAuth**   | Secure user authentication via Google and GitHub providers.                 |
| **ShadCN UI + TailwindCSS** | Customizable and modern UI components styled with utility-first CSS.        |
| **TanStack React Query**    | Handles client-server state management and caching efficiently.             |
| **React Hook Form + Zod**   | Declarative form state management with type-safe validation using schemas.  |

---

## 📌 Core Functionalities

- 🔐 **OAuth Authentication** – Login using Google or GitHub securely.
- 🏢 **Workspace Management** – Organize your work into isolated environments.
- 📊 **Project and Epic Management** – Plan and structure work using projects and epics.
- ✅ **Task Management** – Create, assign, prioritize, and track tasks.
- 🧩 **Kanban Board** – Visual workflow for managing tasks with drag-and-drop.
- 📋 **Data Table View** – Manage tasks in a sortable and searchable table format.
- 📅 **Calendar View** – Visualize task deadlines using an interactive calendar.
- ✉️ **Team Invites** – Invite collaborators to workspaces with custom roles.
- ⚙️ **Workspace & Project Settings** – Configure preferences and behaviors.
- 📎 **Image Uploads** – Upload avatars and task-related attachments.
- 🔍 **Advanced Filters & Search** – Quickly find tasks by keyword, status, assignee, etc.
- 📈 **Analytics Dashboard** – Track progress with visual insights and statistics.
- 👥 **Role-based Access** – Owner, Admin, and Member roles for granular permissions.
- 🌐 **Fully Responsive Design** – Optimized UX across all devices.

---

## 🛠 Getting Started

Follow these steps to run Taskforge locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskforge.git
cd taskforge
```

### 2. Install Dependencies

```bash
# Install frontend & backend dependencies
npm install
```

### 3. Setup Environment Variables

Rename the example environment file and provide your config:

```bash
cp .env.example .env.local
```

Add the following (example values): **Backend Environment**

```bash
# Backend
PORT=8000
NODE_ENV=development

MONGO_URI=

SESSION_SECRET="session_secret_key"
SESSION_EXPIRES_IN="1d"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=
```

Add the following (example values): **Frontend Environment**

```bash
VITE_API_BASE_URL="http://localhost:8000/api"
```

### 4. Start the Application

```bash
# Run frontend and backend concurrently (if configured)
npm run dev
```

Access the app at `http://localhost:3000`.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for full details.
