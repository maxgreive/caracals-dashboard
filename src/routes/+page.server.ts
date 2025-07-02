// Get all tournaments
import { TournamentDatabase } from '$lib/database/tournament.database';

import type { Tables } from '$lib/types/supabase';
import type { PageServerLoad } from './$types';
/**
 * Gets all tournaments
 *
 * @returns
 */
export const load: PageServerLoad = async () => {
  const tournaments = await TournamentDatabase.getAll();

  if (tournaments == null) {
    return {
      tournaments: []
    };
  }

  return {
    tournaments: tournaments as Tables<'tournaments'>[]
  };
}

