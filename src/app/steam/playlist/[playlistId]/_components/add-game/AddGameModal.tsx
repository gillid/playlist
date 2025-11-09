'use client';

import React from 'react';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { ModalHeader } from '../ModalHeader';
import { SearchBar } from '../SearchBar';
import { AddGameModalSearchResults } from './AddGameModalSearchResults';

export const AddGameModal: React.FC<{ playlist: PlaylistWithRelations }> = ({
  playlist,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <ModalHeader
        title='Add Game'
        description='Search for a game by name. Start typing at least 3 characters to search.'
      />

      <SearchBar
        placeholder='Search games by name... (min 3 characters)'
        query={searchQuery}
        setQuery={setSearchQuery}
      />

      <AddGameModalSearchResults
        playlist={playlist}
        searchQuery={searchQuery.trim()}
      />
    </>
  );
};
