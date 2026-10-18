EDLIST — Project Management Dashboard
EDLIST is a full-stack project management dashboard for organizing projects, tracking tasks, reviewing priorities, and getting an overview of project progress. The application includes a data-rich dashboard, a project timeline, searchable project/task/user records, and team and user directories.
Features
- Project dashboard: View tasks for a selected project, with charts for task-priority distribution and task status.
- Project and task management: Create projects and tasks, view task details, and update task status.
- Task assignment: Retrieve tasks authored by or assigned to a specific user.
- Project timeline: View projects on a Gantt-style timeline, with day, month, and year display modes.
- Global search: Search across tasks, projects, and users.
- Team and user directories: Browse team and user records in filterable data grids, with CSV export available from the grid toolbar.
- Priority navigation: Quickly navigate to Urgent, High, Medium, Low, and Backlog views.
- Dashboard preferences: Collapsible sidebar and persisted UI preferences, including dark mode.
- Relational data model: PostgreSQL models for users, teams, projects, tasks, team-project relationships, task assignments, comments, and attachments.
Tech Stack
Frontend
- Next.js 16 (App Router)
- React 19 and TypeScript
- Tailwind CSS 4
- Redux Toolkit and RTK Query for application state and API data fetching
- Material UI X Data Grid
- Recharts for dashboard visualizations
- gantt-task-react for the project timeline
- Lucide React icons
Backend
- Node.js and Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- Helmet, CORS, and Morgan middleware
Project Structure
client-management/
├── client/                   # Next.js frontend
│   ├── src/
│   │   ├── app/              # App Router pages and Redux provider
│   │   ├── components/       # Shared UI components
│   │   ├── lib/              # Shared utilities and UI styles
│   │   ├── state/            # Redux state and RTK Query API
│   │   └── types/            # TypeScript types
│   └── package.json
└── server/                   # Express API
    ├── prisma/
    │   ├── schema.prisma     # PostgreSQL data model
    │   ├── seed.ts           # Sample-data seeding script
    │   └── seedData/         # JSON seed records
    ├── src/
    │   ├── controllers/      # Request handlers
    │   ├── routes/           # API route definitions
    │   └── index.ts          # Express server entry point
    └── package.json
Getting Started
Prerequisites
- Node.js and npm
- A running PostgreSQL instance
1. Clone the repository
git clone https://github.com/Amremam-1/client-management.git
cd client-management
2. Configure and start the backend
Install the backend dependencies:
cd server
npm install
Create a .env file inside server/ and configure your PostgreSQL connection. The backend uses port 5000 in this example so it does not conflict with the Next.js development server.
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/client_management?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/client_management?schema=public"
Replace USER, PASSWORD, and the database name with your local PostgreSQL details. Keep credentials private and do not commit the .env file.
Generate the Prisma client and create/update the database schema:
npx prisma generate
npx prisma db push
Start the API server:
npm run dev
With the configuration above, the API runs at http://localhost:5000.
3. Configure and start the frontend
Open a second terminal from the repository root:
cd client
npm install
Create a .env.local file inside client/:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/
Start Next.js:
npm run dev
Open http://localhost:3000 in your browser.
Optional: Load sample data
The backend includes JSON seed data. After configuring the database and generating the Prisma client, run this from the server/ directory:
npm run seed
Warning: The seed script deletes existing records from the project tables before inserting sample data. Run it only against a disposable development database, not a database containing data you need to keep.

API Endpoints
The Express server exposes the following routes directly from its base URL (there is no /api prefix in the current route configuration).
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
No open-source license is currently specified in the repository. Contact the repository owner before redistributing or reusing the project.
