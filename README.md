EDLIST — Project Management Dashboard
A full-stack project management dashboard for organizing projects, tracking tasks, reviewing priorities, and monitoring project progress. EDLIST brings project analytics, task management, team directories, global search, and a Gantt-style timeline into one workspace.
<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-555555?logo=express&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Database-4169e1?logo=postgresql&logoColor=white" />
</p>

Table of Contents
- Features
- Tech Stack
- Project Structure
- Getting Started
- API Endpoints
- Available Scripts
- Data Model
- License
Features
- Project dashboard: View tasks for a selected project, with charts for task-priority distribution and task status.
- Project and task management: Create projects and tasks, inspect task details, and update task status.
- Task assignment: Retrieve tasks authored by or assigned to a specific user.
- Project timeline: Explore projects on a Gantt-style timeline with day, month, and year views.
- Global search: Search across tasks, projects, and users from one place.
- Team and user directories: Browse filterable team and user data grids, with CSV export available from the grid toolbar.
- Priority navigation: Quickly access Urgent, High, Medium, Low, and Backlog views.
- Dashboard preferences: Use a collapsible sidebar and persisted interface preferences, including dark mode.
- Relational data model: Store users, teams, projects, tasks, team-project relationships, task assignments, comments, and attachments in PostgreSQL.
Tech Stack
Frontend
- Next.js 16 — App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Redux Toolkit and RTK Query for application state and API data fetching
- Material UI X Data Grid
- Recharts for dashboard visualizations
- gantt-task-react for the project timeline
- Lucide React for icons
Backend
- Node.js and Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- Helmet, CORS, and Morgan middleware
Project Structure
client-management/
├── client/                         # Next.js frontend
│   ├── src/
│   │   ├── app/                    # App Router pages and Redux provider
│   │   ├── components/             # Shared UI components
│   │   ├── lib/                    # Shared utilities and UI styles
│   │   ├── state/                  # Redux state and RTK Query API
│   │   └── types/                  # TypeScript types
│   └── package.json
└── server/                         # Express API
    ├── prisma/
    │   ├── schema.prisma           # PostgreSQL data model
    │   ├── seed.ts                 # Sample-data seeding script
    │   └── seedData/               # JSON seed records
    ├── src/
    │   ├── controllers/            # Request handlers
    │   ├── routes/                 # API route definitions
    │   └── index.ts                # Express server entry point
    └── package.json
Getting Started
Prerequisites
Make sure you have the following installed and available:
- Node.js and npm
- A running PostgreSQL instance
- Git
1. Clone the repository
git clone https://github.com/Amremam-1/client-management.git
cd client-management
2. Configure and start the backend
Install the backend dependencies:
cd server
npm install
Create a .env file inside the server/ directory:
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/client_management?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/client_management?schema=public"
Replace USER, PASSWORD, and client_management with your PostgreSQL username, password, and database name. Keep database credentials private, and never commit your .env file.
Generate the Prisma client and create or update the database schema:
npx prisma generate
npx prisma db push
Start the API server:
npm run dev
With the configuration above, the API runs at http://localhost:5000.
3. Configure and start the frontend
Open a second terminal at the repository root and install the frontend dependencies:
cd client
npm install
Create a .env.local file inside the client/ directory:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/
Start the Next.js development server:
npm run dev
Open http://localhost:3000 in your browser.
Optional: Load sample data
The backend includes JSON seed data. After configuring the database and generating the Prisma client, run this command from the server/ directory:
npm run seed
Warning: The seed script deletes existing records from the project tables before inserting sample data. Run it only against a disposable development database—not a database containing data you need to keep.

API Endpoints
The Express server exposes the following routes directly from its base URL. The current route configuration does not use an /api prefix.
Method	Endpoint	Description
GET	/projects	Retrieve projects
POST	/projects	Create a project
GET	/tasks?projectId={projectId}	Retrieve tasks for a project
POST	/tasks	Create a task
PATCH	/tasks/{taskId}/status	Update a task's status
GET	/tasks/user/{userId}	Retrieve tasks authored by or assigned to a user
GET	/search?query={term}	Search tasks, projects, and users
GET	/users	Retrieve users
GET	/teams	Retrieve teams


Available Scripts
Run commands from the relevant directory.
Frontend (client/)
Command	Description
npm run dev	Start the Next.js development server
npm run build	Create a production build
npm run start	Run the production build
npm run lint	Run ESLint


Backend (server/)
Command	Description
npm run dev	Build/watch TypeScript and run the development API server
npm run build	Compile TypeScript into dist/
npm start	Start the compiled server
npm run seed	Clear existing project data and insert the JSON sample data


Data Model
The Prisma schema defines relationships between User, Team, Project, ProjectTeam, Task, and TaskAssignment, along with Comment and Attachment records associated with tasks and users.
License
No open-source license is currently specified in this repository. Contact the repository owner before redistributing or reusing the project.
