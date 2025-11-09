'use client';

import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/ui/input';

export const SearchBar: React.FC<{
  placeholder: string;
  query: string;
  setQuery(query: string): void;
}> = ({ placeholder, query, setQuery }) => {
  return (
    <div className='relative'>
      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />

      <Input
        type='text'
        name='search'
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className='pl-9'
      />

      {query.length > 0 && (
        <button
          type='button'
          className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors'
        >
          <XIcon className='h-4 w-4' onClick={() => setQuery('')} />
        </button>
      )}
    </div>
  );
};
