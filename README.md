# Kids Game Management App

A modern, full-stack application for managing users and games, built with Next.js, Supabase, Zustand, and Tailwind CSS. Supports admin and player roles, CRUD operations, and a responsive UI for both desktop and mobile.

## Features
- User and game management (CRUD)
- Supabase authentication and database
- RESTful API endpoints
- Role-based access (admin, player)
- Responsive, mobile-friendly UI
- State management with Zustand
- Modern design with Tailwind CSS
- Extensible and scalable architecture

## Quickstart

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd kids-game-mgt
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
   - Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Run the development server:**
   ```sh
   yarn dev
   # or
   npm run dev
   ```

## Supabase Setup
See [`docs/supabase-setup.md`](docs/supabase-setup.md) for step-by-step instructions to create your Supabase project, tables, and configure authentication.

## Database Schemas
See [`docs/schemas.sql`](docs/schemas.sql) for SQL to create the `users`, `games`, and `user_games` tables.

## API Endpoints
See [`docs/api.md`](docs/api.md) for available RESTful API endpoints and usage examples.

## Folder Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - UI and logic components
- `src/store/` - Zustand state management
- `src/utils/` - Utility functions
- `src/styles/` - CSS
- `src/pages/api/` - API routes

## Testing
- Run `yarn lint` to check for lint errors
- Run `yarn build` to test the production build
- Add tests in the appropriate files using `.test.ts(x)` naming

## Deployment
- The project includes a GitHub Actions workflow for CI/CD
- To deploy, push to `main` and the workflow will build and deploy

## Contributing
- Use feature branches for new features or fixes
- Follow the pull request template in `.github/instructions/pull-request-template.md`
- Request code review before merging

## License
MIT
