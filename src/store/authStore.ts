import { create } from 'zustand';

import { User } from '@supabase/supabase-js';
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

import { supabase } from '@/utils/supabaseClient';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: '',
  login: async (email, password) => {
    set({ loading: true, error: '' });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) set({ error: error.message, loading: false });
    else set({ user: data.user, loading: false });
  },
  register: async (email, password) => {
    set({ loading: true, error: '' });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) set({ error: error.message, loading: false });
    else set({ user: data.user, loading: false });
  },
  logout: async () => {
    set({ loading: true, error: '' });
    const { error } = await supabase.auth.signOut();
    if (error) set({ error: error.message, loading: false });
    else set({ user: null, loading: false });
  },
  setUser: (user) => set({ user }),
}));
