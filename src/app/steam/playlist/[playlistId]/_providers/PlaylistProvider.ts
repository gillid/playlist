import type { PlaylistWithRelations } from '../_functions/getPlaylistById';
import { createServerProvider } from '@/libs/server-provider';

export const PlaylistProvider =
  createServerProvider<PlaylistWithRelations>('Playlist');
