import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      // Get all users
      const { data, error } = await supabase.from('Users').select('*');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    case 'POST': {
      // Create a new user
      const { email, username } = req.body;
      const { data, error } = await supabase.from('Users').insert([{ email, username }]).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
