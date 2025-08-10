import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      // Get all games
      const { data, error } = await supabase.from('Games').select('*');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    case 'POST': {
      // Create a new game
      const { name, description } = req.body;
      const { data, error } = await supabase.from('Games').insert([{ name, description }]).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
