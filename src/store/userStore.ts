import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username?: string;
  created_at?: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string;
  fetchUsers: () => Promise<void>;
  addUser: (email: string, username: string) => Promise<void>;
  updateUser: (id: string, email: string, username: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

import { supabase } from '@/utils/supabaseClient';
import { TABLES } from '@/utils/supabaseTables';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: '',
  fetchUsers: async () => {
    set({ loading: true, error: '' });
  const { data, error } = await supabase.from(TABLES.USERS).select('*');
    if (error) set({ error: error.message, loading: false });
    else set({ users: data || [], loading: false });
  },
  addUser: async (email, username) => {
    set({ loading: true, error: '' });
  const { error } = await supabase.from(TABLES.USERS).insert([{ email, username }]);
    if (error) set({ error: error.message, loading: false });
    else {
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    }
  },
  updateUser: async (id, email, username) => {
    set({ loading: true, error: '' });
  const { error } = await supabase.from(TABLES.USERS).update({ email, username }).eq('id', id);
    if (error) set({ error: error.message, loading: false });
    else {
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    }
  },
  deleteUser: async (id) => {
    set({ loading: true, error: '' });
  const { error } = await supabase.from(TABLES.USERS).delete().eq('id', id);
    if (error) set({ error: error.message, loading: false });
    else {
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    }
  },
}));
