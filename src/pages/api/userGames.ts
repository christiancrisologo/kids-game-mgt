import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      // Get all user-game relations
      const { data, error } = await supabase.from('UserGames').select('*');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    case 'POST': {
      // Create a new user-game relation
      const { user_id, game_id, score } = req.body;
      const { data, error } = await supabase.from('UserGames').insert([{ user_id, game_id, score }]).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
