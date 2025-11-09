import { createServerProvider } from '@/libs/server-provider';
import type { PlaylistWithRelations } from '../_functions/getPlaylistById';

export const PlaylistProvider =
  createServerProvider<PlaylistWithRelations>('Playlist');
