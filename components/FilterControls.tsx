
import React, { useState } from 'react';
import type { FilterCategory } from '../types';
import { WATCH_CATEGORIES } from '../constants';

interface FilterControlsProps {
    activeFilter: FilterCategory;
    searchTerm: string;
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, searchTerm, onFilterChange, onSearchChange }) => {
    const [showFilters, setShowFilters] = useState(false);

    const filterButtons: { label: string; filter: FilterCategory }[] = [
        { label: 'Todos', filter: 'all' },
        ...WATCH_CATEGORIES.map(cat => ({ label: cat, filter: cat })),
        { label: 'Favoritos', filter: 'favorites' }
    ];

    return (
        <>
            <div className="mb-10 max-w-2xl mx-auto">
                <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-gray-800 overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-300 bg-gray-800 pr-20"
                        type="text"
                        id="search-input"
                        placeholder="Pesquisar por nome ou descrição..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />

                    <button onClick={() => setShowFilters(!showFilters)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V3h-2v6z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                {filterButtons.map(({ label, filter }) => (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`py-2 px-4 rounded-lg transition ${activeFilter === filter ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default FilterControls;
