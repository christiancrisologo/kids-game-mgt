# Copilot Instructions for Games app for user and games management  

## Project Overview
This project is a comprehensive management system for users and games, designed to support both administrative and player roles. As an admin, you can perform full CRUD operations on users and games, manage user roles, and oversee all data through a secure dashboard. The application exposes RESTful API endpoints for user and game management, leveraging Supabase for authentication, database, and real-time data synchronization. The system is built for scalability, extensibility, and security, supporting responsive UI for both desktop and mobile devices, and includes analytics and offline support for enhanced user experience.


## Architecture Principles
- **Separation of concerns**: Clearly separate data access, business logic, and presentation layers.
- **Scalability**: Design the system to handle growth in users, games, and data volume.
- **Security by design**: Apply least privilege, secure authentication, and data validation throughout.
- **Extensibility**: Structure code and data models to support future features (e.g., new game types, user roles).
- **Consistency**: Use consistent naming, error handling, and API design patterns.
- **Component-based design**: UI components should be modular and reusable.
- **API endpoint**: Endpoint to handle REST.
- **Authentication for login**: Endpoint for both admin and user login.
- **Responsive design**: Application should work across desktop and mobile devices.
- **Schemas**: Table schemas for users and games.

## Development Guidelines

### Code Organization
- Organize source code into `src/` with clear subfolders: `components/`, `pages/`, `hooks/`, `stores/`, `utils/`, and `api/`.
- Place reusable math utilities in `/utils/` or similar.
- Keep all business logic separate from UI components (e.g., in `services/` or `logic/`).
- Use zustand for state management, with stores in `stores/`.
- Use TypeScript throughout for type safety and maintainability.
- Co-locate tests with implementation files using `.test.ts(x)` naming.
- Use feature-based folder structure for scalable modules (e.g., `user/`, `game/`).
- Centralize API calls in `api/` with typed interfaces and error handling.
- Use React functional components and hooks for UI logic.
- Apply consistent code formatting with Prettier and enforce standards with ESLint.
- Document modules and functions with JSDoc/TSDoc comments.
- Prefer absolute imports using a configured `tsconfig.json` paths.


### User and Games management Patterns
- **User-game relationship**: Use a join table (e.g., `user_games`) to associate users with games, supporting many-to-many relationships (e.g., users can play multiple games, and games can have multiple users/players).
- **Role-based access**: Store user roles (admin, player) in the users table for permission management.
- **Game state tracking**: Store per-user game progress and results in the join table or a related table (e.g., `user_game_sessions`), referencing both user and game IDs.
- **Supabase best practices**: Use row-level security (RLS) policies to restrict data access based on user roles and ownership.
- **API endpoints**: Expose RESTful endpoints for CRUD operations on users, games, and their associations, leveraging Supabase auto-generated APIs.
- **Schema example**:
    - `users` (id, name, email, role, ...)
    - `games` (id, title, description, ...)
    - `user_games` (id, user_id, game_id, progress, score, ...)

### Data Management
- **Supabase as primary data store**: Use Supabase Postgres for all persistent data (users, games, progress, etc.), leveraging its built-in authentication, row-level security, and RESTful APIs.
- **Local storage for offline support**: Store minimal user progress and session data locally (e.g., with IndexedDB or localStorage) to enable offline practice and sync with Supabase when online.
- **Centralized state management**: Use zustand to manage in-memory application state (current user, quiz state, etc.) and coordinate between UI and backend.
- **Data synchronization**: Implement background sync logic to reconcile local changes with Supabase when connectivity is restored.
- **Performance analytics**: Track response times, accuracy rates, and learning patterns in a dedicated analytics table in Supabase for reporting and insights.

### Testing Approach
- Write comprehensive unit tests for all business logic, including math utilities, state management, and API integrations.
- Use integration tests to verify end-to-end flows (user registration, login, CRUD operations for users/games, progress tracking).
- Employ mocking for Supabase and external APIs to ensure tests are deterministic and fast.
- Automate accessibility testing (e.g., with axe-core) to ensure WCAG compliance.
- Perform cross-device and cross-browser UI testing for responsiveness and usability.
- Include performance and load testing for critical endpoints and large datasets.
- Integrate tests into CI/CD pipelines to catch regressions early.

### UI/UX Considerations
- **Admin dashboard**: Provide a clear dashboard for admins to view, search, and filter users and games.
- **Bulk actions**: Enable bulk user/game management (e.g., activate, deactivate, delete).
- **Role management**: Allow easy assignment and modification of user roles (admin, player).
- **Audit trails**: Display recent activity logs for user and game changes.
- **Confirmation dialogs**: Require confirmation for destructive actions (e.g., deletions).
- **Accessible forms**: Use clear labels, validation, and error messages for all admin forms.
- **Responsive tables**: Ensure user/game lists are readable and usable on all devices.


## Integration Points
- **Supabase integration**: Use Supabase for authentication, database, and RESTful API endpoints.
- **Math rendering**: Integrate MathJax or KaTeX for displaying mathematical equations in quizzes and results.
- **Analytics**: Connect to a learning analytics service or use Supabase analytics tables for tracking user performance and engagement.
- **Authentication**: Leverage Supabase Auth for secure user login, registration, and role management.
- **Accessibility**: Integrate automated accessibility testing tools (e.g., axe-core) into the CI/CD pipeline to ensure WCAG compliance.
- **State management**: Use zustand for centralized state management and synchronize with Supabase for persistent data.
- **Offline support**: Implement local storage (IndexedDB/localStorage) for offline progress, syncing with Supabase when online.

## Common Patterns
- Use consistent number formatting and precision handling
- Implement debounced input validation for mathematical expressions
- Create reusable components for common question types
- Maintain consistent scoring and feedback mechanisms
- Prefer hooks for shared logic (e.g., useUser, useGameProgress)
- Use optimistic UI updates for a responsive user experience
- Centralize error handling and user notifications
- Apply feature flags for experimental features
- Use environment variables for configuration (API keys, endpoints)
- Modularize API calls and data fetching logic

### Git instructions
- Use feature branches named as `<feature-number>/<feature-name>` for new features or fixes
- Always pull the latest changes from `main` before starting a new branch
- Commit changes in logical, small increments with clear messages
- Rebase your branch onto `main` regularly to minimize merge conflicts
- Run all tests and lint checks locally before pushing
- Push your branch to the remote repository and open a pull request using `pull-request-template.md`
- Request code review from at least one team member before merging
- Address review comments promptly and update the pull request as needed
- After approval, squash and merge the pull request into `main`
- Delete the feature branch after merging to keep the repository clean

**End of prompt_instruction.md**
