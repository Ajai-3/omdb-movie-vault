import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = 'Search for a movie...',
}: Props) {
  return (
    <div className='search-bar'>
      <span className='search-bar__icon'>🔍</span>
      <input
        type='text'
        className='search-bar__input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete='off'
        spellCheck={false}
        aria-label='Search movies'
      />
      {value && (
        <button
          className='search-bar__clear'
          onClick={() => onChange('')}
          aria-label='Clear search'
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
