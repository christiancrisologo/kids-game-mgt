// Utility for scalable Supabase table references

export const TABLES = {
  USERS: "game_users",
  GAMES: "game_apps",
  USER_GAMES: "game_records",
  // Add more tables here as needed
};

export function getTable(name: keyof typeof TABLES) {
  return TABLES[name];
}

// Usage example:
// import { getTable } from "@/utils/supabaseTables";
// supabase.from(getTable("USERS"))
