# Restaurant Simulator

A web-based restaurant simulation game for instructors and teams to compete in financial decision-making.

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   cd api && npm install && cd ..
   cd ui && npm install && cd ..
   ```
3. **Start the database (PostgreSQL via Docker Compose)**
   ```sh
   npm run db:start
   ```
4. **Initialize the database schema**
   ```sh
   npm run db:init
   ```
5. **Seed the database with demo data**
   ```sh
   npm run db:seed
   ```
6. **Start the app in development mode**
   ```sh
   npm run dev
   ```

## Script Commands

- `npm run dev` — Start both API and UI in development mode
- `npm run start` — Start both API and UI in production mode
- `npm run build` — Build both API and UI
- `npm run db:start` — Start the PostgreSQL database (Docker Compose)
- `npm run db:stop` — Stop the PostgreSQL database
- `npm run db:init` — Initialize the database schema (Prisma migrations)
- `npm run db:seed` — Seed the database with demo data
- `npm run api:start` — Start the API in production mode
- `npm run api:dev` — Start the API in development mode
- `npm run api:build` — Build the API
- `npm run ui:start` — Start the UI in production mode
- `npm run ui:dev` — Start the UI in development mode
- `npm run ui:build` — Build the UI

---

See the `/api/README.md` and `/ui/README.md` for more details on each package.