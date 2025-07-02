// Get all tournaments
import { TournamentDatabase } from '$lib/database/tournament.database';
import { UserDatabase } from '$lib/database/user.database';

import type { Tables } from '$lib/types/supabase';
import type { PageServerLoad } from './$types';
/**
 * Gets all tournaments
 *
 * @returns
 */
export const load: PageServerLoad = async ({ params }) => {
  const tournamentId = params.id;
  const tournament = await TournamentDatabase.getById(tournamentId);
  console.log('tournament:', tournament)

  if (tournament == null) {
    return {
      tournament: null
    };
  }

  console.log("UserDatabase.getById(tournament.user ?? ''):", await UserDatabase.getById(tournament.user ?? ''))
  return {
    tournament: tournament as Tables<'tournaments'>,
    user: await UserDatabase.getById(tournament.user ?? '')
  };
}

