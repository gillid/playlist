import React from 'react';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { ModalHeader } from '../ModalHeader';
import { SearchBar } from '../SearchBar';
import { AddFriendModalSearchResults } from './AddFriendModalSearchResults';

export const AddFriendModal: React.FC<{
  playlist: PlaylistWithRelations;
}> = ({ playlist }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <ModalHeader
        title='Add Friend'
        description='Search through your Steam friends list to add them to this playlist.'
      />

      <SearchBar
        placeholder='Search friends by name...'
        query={searchQuery}
        setQuery={setSearchQuery}
      />

      <AddFriendModalSearchResults
        playlist={playlist}
        searchQuery={searchQuery}
      />
    </>
  );
};
