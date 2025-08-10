# API Endpoints

## Users
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Games
- `GET /api/games` - List games
- `POST /api/games` - Create game
- `PUT /api/games/:id` - Update game
- `DELETE /api/games/:id` - Delete game

## User-Games
- `GET /api/userGames` - List user-game associations
- `POST /api/userGames` - Create association
- `PUT /api/userGames/:id` - Update association
- `DELETE /api/userGames/:id` - Delete association

## Example Request
```sh
curl http://localhost:3000/api/users
```

## Notes
- All endpoints require authentication via Supabase Auth.
- See Supabase client usage in the codebase for details.
