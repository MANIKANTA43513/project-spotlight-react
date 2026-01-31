import React, { useState, useMemo } from 'react';
import { Search, User } from 'lucide-react';

const SAMPLE_NAMES = [
  'Alice Johnson',
  'Bob Williams',
  'Charlie Brown',
  'Diana Prince',
  'Edward Norton',
  'Fiona Apple',
  'George Harrison',
  'Hannah Montana',
  'Isaac Newton',
  'Julia Roberts',
  'Kevin Bacon',
  'Lisa Simpson',
  'Michael Jordan',
  'Nancy Drew',
  'Oscar Wilde',
  'Patricia Arquette',
  'Quentin Tarantino',
  'Rachel Green',
  'Samuel Jackson',
  'Tina Turner',
  'Uma Thurman',
  'Victor Hugo',
  'Wendy Williams',
  'Xavier Charles',
  'Yolanda Adams',
  'Zachary Taylor',
];

const SearchList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    // Escape special regex characters
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="highlight-match">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_NAMES;
    
    return SAMPLE_NAMES.filter(name =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="task-card">
      <h2 className="section-title">🔍 Live Search with Highlighting</h2>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search names..."
          className="input-base pl-12"
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {searchQuery.trim() ? (
          <span>
            Found <span className="font-semibold text-foreground">{filteredNames.length}</span>{' '}
            {filteredNames.length === 1 ? 'match' : 'matches'} for "{searchQuery}"
          </span>
        ) : (
          <span>Showing all {SAMPLE_NAMES.length} names</span>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredNames.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No matches found for "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        ) : (
          filteredNames.map((name, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={16} className="text-primary" />
              </div>
              <span className="text-foreground">
                {getHighlightedText(name, searchQuery)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchList;
