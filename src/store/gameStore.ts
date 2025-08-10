import { create } from 'zustand';

interface Game {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

interface GameState {
  games: Game[];
  loading: boolean;
  error: string;
  fetchGames: () => Promise<void>;
  addGame: (name: string, description: string) => Promise<void>;
  updateGame: (id: string, name: string, description: string) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
}

import { supabase } from '@/utils/supabaseClient';

export const useGameStore = create<GameState>((set) => ({
  games: [],
  loading: false,
  error: '',
  fetchGames: async () => {
    set({ loading: true, error: '' });
    const { data, error } = await supabase.from('Games').select('*');
    if (error) set({ error: error.message, loading: false });
    else set({ games: data || [], loading: false });
  },
  addGame: async (name, description) => {
    set({ loading: true, error: '' });
    const { error } = await supabase.from('Games').insert([{ name, description }]);
    if (error) set({ error: error.message, loading: false });
    else {
      await useGameStore.getState().fetchGames();
      set({ loading: false });
    }
  },
  updateGame: async (id, name, description) => {
    set({ loading: true, error: '' });
    const { error } = await supabase.from('Games').update({ name, description }).eq('id', id);
    if (error) set({ error: error.message, loading: false });
    else {
      await useGameStore.getState().fetchGames();
      set({ loading: false });
    }
  },
  deleteGame: async (id) => {
    set({ loading: true, error: '' });
    const { error } = await supabase.from('Games').delete().eq('id', id);
    if (error) set({ error: error.message, loading: false });
    else {
      await useGameStore.getState().fetchGames();
      set({ loading: false });
    }
  },
}));
