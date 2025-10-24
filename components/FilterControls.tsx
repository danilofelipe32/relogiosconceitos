import React from 'react';
import type { FilterCategory } from '../types';
import { WATCH_CATEGORIES } from '../constants';

interface FilterControlsProps {
    activeFilter: FilterCategory;
    searchTerm: string;
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, searchTerm, onFilterChange, onSearchChange }) => {
    const filterButtons: { label: string; filter: FilterCategory }[] = [
        { label: 'Todos', filter: 'all' },
        ...WATCH_CATEGORIES.map(cat => ({ label: cat, filter: cat })),
        { label: 'Favoritos', filter: 'favorites' }
    ];

    return (
        <div className="mb-12 sticky top-4 z-30 bg-black/50 backdrop-blur-lg p-4 rounded-xl border border-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className="relative mb-4">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        type="text"
                        id="search-input"
                        placeholder="Pesquisar por nome ou descrição..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        aria-label="Pesquisar relógios"
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {filterButtons.map(({ label, filter }) => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                                activeFilter === filter 
                                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterControls;
