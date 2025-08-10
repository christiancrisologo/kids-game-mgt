---
mode: agent
---

## Goal: Develop an App for managing the Game and User data and endpoints

## Setup the backend and database
- Suggest the best technology stack for the backend and database


### Schemas
- Suggest schemas for the following:
  - Users
  - Games
  - User Games
- User and game relationship: one-to-many
- suggest the best way to relate the user and game data

### Setup the database project
- Create a new project in Supabase
- Create a new database
- Create a new table for users
- Create a new table for games
- Create a new table for user games

### Setup the backend endpoints for the user and games API
- Create a new API for the user and games
- Create a new endpoint for the user and games
- Create and suggest the best way to CRUD wiht Restful API or suggest the best pattern


## Setup the UI Frontend

### Setup the frontend project with nextjs
- Create a new nextjs project
- Suggest the best technology stack for the frontend

### Login page 

- Create the first page of the app, where the user will:
  - Login with their credentials
  - Or register a new account


**UI Requirements:**
- Use Tailwind for styling inputs, buttons, and layout.
- Use Next.js for routing and page structure.
- Use Supabase Auth for authentication.
- 

---

### User Page 
- Create a page whereas the user can navigate the database record for the user
- Suggest the best way to display the users data and administer 

### Ganes Page 
- Create a page whereas the user can navigate the database record for the  games
- Suggest the best way to display the games data and administer 


**Recommendations:**
- Store current question index, answer history, and timer state in local React state or global store.
- Use `useEffect` to handle the countdown timer.
- Ensure a smooth transition to the next question after submission.

---

### Other Implementation Notes

- Use **Next.js** routing (`pages/` directory) to handle navigation.
- For question generation, consider creating a utility function to randomly generate problems based on the selected difficulty and operation.
- Ensure accessibility (proper labels, focus handling).
- Keep the code modular (e.g., separate components for Question, Timer, Results, etc.).
- Keep UI fun and colorful for kids, but clean.

