# Restaurant Simulator API

This is the backend API for the Restaurant Simulator app.

## Tech Stack
- Node.js + TypeScript
- Express.js
- Socket.IO
- Prisma ORM
- PostgreSQL

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development mode:
   ```bash
   npm run dev
   ```
3. Health check:
   Visit [http://localhost:4000/api/health](http://localhost:4000/api/health)

## Folder Structure
- `src/api` - REST API route handlers
- `src/services` - Business logic
- `src/sockets` - WebSocket event handlers
- `src/models` - ORM models/entities
- `src/db` - Database connection, migrations
- `src/middleware` - Middleware (auth, error handling)
- `src/utils` - Utilities and constants
- `src/config` - App config
- `src/types` - TypeScript types/interfaces
- `src/jobs` - Background jobs

---

This is a scaffold. Add your business logic, models, and routes as needed.