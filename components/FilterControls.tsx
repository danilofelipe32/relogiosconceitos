
import React, { useState } from 'react';
import type { FilterCategory, WatchCategory } from '../types';
import { WATCH_CATEGORIES } from '../constants';
import SearchSuggestions from './SearchSuggestions';

interface FilterControlsProps {
    activeCategories: WatchCategory[];
    isFavoritesActive: boolean;
    searchTerm: string;
    suggestions: string[];
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
    onSuggestionClick: (suggestion: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeCategories, isFavoritesActive, searchTerm, suggestions, onFilterChange, onSearchChange, onSuggestionClick }) => {
    const [isDesktopPanelVisible, setIsDesktopPanelVisible] = useState(false);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleCloseMobileModal = () => {
        setIsMobileModalOpen(false);
    };

    const allFilterButtons: { label: string; filter: FilterCategory }[] = [
        { label: 'Todos', filter: 'all' },
        ...WATCH_CATEGORIES.map(cat => ({ label: cat, filter: cat })),
        { label: 'Favoritos', filter: 'favorites' }
    ];

    const renderFilterButtons = () => (
        <div className="flex flex-wrap items-center gap-2">
            {allFilterButtons.map(({ label, filter }) => {
                let isActive = false;
                if (filter === 'all') {
                    isActive = activeCategories.length === 0 && !isFavoritesActive;
                } else if (filter === 'favorites') {
                    isActive = isFavoritesActive;
                } else {
                    isActive = activeCategories.includes(filter as WatchCategory);
                }

                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`py-2 px-5 rounded-full text-xs font-medium uppercase tracking-wide transition-all duration-300 border ${
                            isActive 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                            : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );

    return (
        <>
            <div className="bg-gray-900/60 backdrop-blur-xl p-3 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                    
                    {/* Search Bar */}
                    <div className="relative flex-grow max-w-md group">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`w-5 h-5 transition-colors duration-300 ${isSearchFocused || searchTerm ? 'text-white' : 'text-gray-500'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            className="w-full bg-black/40 text-white placeholder-gray-600 border border-white/5 rounded-xl py-3 pl-12 pr-10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 focus:bg-black/60 transition-all duration-300 text-sm font-light"
                            type="text"
                            placeholder="Buscar modelo..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            autoComplete="off"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {isSearchFocused && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2">
                                <SearchSuggestions
                                    suggestions={suggestions}
                                    searchTerm={searchTerm}
                                    onSuggestionClick={onSuggestionClick}
                                />
                            </div>
                        )}
                    </div>

                    {/* Filter Toggle / Display */}
                    <div className="hidden lg:flex items-center">
                        {renderFilterButtons()}
                    </div>

                    {/* Mobile/Tablet Filter Trigger */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileModalOpen(true)}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Filtros"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                           </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Filter Modal */}
            <div
                className={`lg:hidden fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 transition-all duration-300 ${isMobileModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={handleCloseMobileModal} />
                
                <div
                    className={`relative bg-gray-900 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl transform transition-transform duration-300 ${isMobileModalOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95'}`}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-serif text-white">Filtros</h3>
                            <button onClick={handleCloseMobileModal} className="text-gray-500 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-start">
                            {renderFilterButtons()}
                        </div>
                        <button
                            onClick={handleCloseMobileModal}
                            className="mt-8 w-full bg-white text-black font-bold py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs"
                        >
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterControls;
