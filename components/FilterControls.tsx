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
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    
    const filterButtons: { label: string; filter: FilterCategory }[] = [
        { label: 'Todos', filter: 'all' },
        ...WATCH_CATEGORIES.map(cat => ({ label: cat, filter: cat })),
        { label: 'Favoritos', filter: 'favorites' }
    ];

    return (
        <div className="mb-12 sticky top-4 z-30 bg-black/50 backdrop-blur-lg p-4 rounded-xl border border-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        type="text"
                        id="search-input"
                        placeholder="Pesquisar por nome ou descrição..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        aria-label="Pesquisar relógios"
                    />
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                            className={`p-1 rounded-md transition-colors ${isFilterVisible ? 'text-amber-400' : 'text-gray-400 hover:text-white'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                            aria-label={isFilterVisible ? "Ocultar filtros" : "Mostrar filtros"}
                            aria-expanded={isFilterVisible}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                           </svg>
                        </button>
                    </div>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterVisible ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
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
        </div>
    );
};

export default FilterControls;