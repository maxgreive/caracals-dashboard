// Libraries and modules
import { supabaseServerClient } from '$lib/services/supabase.service';

import type { Tables } from '$lib/types/supabase';

/**
 * Gets the tournament by id
 *
 * @param id
 * @returns Tables<'tournaments'>
 */
async function getById(id: string): Promise<Tables<'tournaments'> | null> {
	const { data, error } = await supabaseServerClient.from('tournaments').select('*').eq('id', id);

	if (error == null) {
		return data[0];
	}

	console.error('UserDatabase:getById - ', error);
	return null;
}

/**
 * Gets all tournaments
 *
 * @returns Tables<'tournaments'>[]
 */
async function getAll(): Promise<Tables<'tournaments'>[] | null> {
  const { data, error } = await supabaseServerClient.from('tournaments').select('*');
  if (error == null) {
    data.sort((a, b) => {
      const dateA = new Date(a.start_date ?? 0);
      const dateB = new Date(b.start_date ?? 0);
      return dateA.getTime() - dateB.getTime();
    });
    return data;
  }
  console.error('TournamentDatabase:getAll - ', error);
  return null;
}

export const TournamentDatabase = {
  getById,
  getAll
};