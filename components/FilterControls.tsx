import React, { useState } from 'react';
import type { FilterCategory, WatchCategory } from '../types';
import { WATCH_CATEGORIES } from '../constants';

interface FilterControlsProps {
    activeCategories: WatchCategory[];
    isFavoritesActive: boolean;
    searchTerm: string;
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeCategories, isFavoritesActive, searchTerm, onFilterChange, onSearchChange }) => {
    const [isDesktopPanelVisible, setIsDesktopPanelVisible] = useState(false);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const handleCloseMobileModal = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsMobileModalOpen(false);
            setIsAnimatingOut(false);
        }, 300); // Match transition duration
    };

    const allFilterButtons: { label: string; filter: FilterCategory }[] = [
        { label: 'Todos', filter: 'all' },
        ...WATCH_CATEGORIES.map(cat => ({ label: cat, filter: cat })),
        { label: 'Favoritos', filter: 'favorites' }
    ];

    const renderFilterButtons = () => (
        <div className="flex flex-wrap justify-center gap-2">
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
                        className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                            isActive 
                            ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );

    const desktopAriaLabel = isDesktopPanelVisible ? "Ocultar filtros" : "Mostrar filtros";

    return (
        <>
            <div className="sticky top-4 z-30 bg-black/50 backdrop-blur-lg p-4 rounded-xl border border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 flex items-center z-10">
                            <button
                                onClick={() => onSearchChange('')}
                                disabled={!searchTerm}
                                className="p-3 text-gray-400 disabled:cursor-default enabled:hover:text-white transition-colors focus:outline-none"
                                aria-label={searchTerm ? "Limpar busca" : "Ícone de busca"}
                            >
                                <div className="relative w-5 h-5" aria-hidden="true">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${searchTerm ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${searchTerm ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <input
                            className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-12 pr-36 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                            type="text"
                            placeholder="Pesquisar por nome ou descrição..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            aria-label="Pesquisar relógios"
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                            {searchTerm && (
                                <div className="animate-fade-in">
                                    <button
                                        onClick={() => onSearchChange('')}
                                        className="p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        aria-label="Limpar busca"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Desktop Button */}
                            <div className="hidden md:block">
                                <button
                                    onClick={() => setIsDesktopPanelVisible(prev => !prev)}
                                    className={`p-1 rounded-md transition-colors ${isDesktopPanelVisible ? 'text-amber-400 bg-amber-400/10' : 'text-gray-400'} hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                    aria-label={desktopAriaLabel}
                                    aria-expanded={isDesktopPanelVisible}
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                   </svg>
                                </button>
                            </div>

                             {/* Mobile Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMobileModalOpen(true)}
                                    className={`p-1 rounded-md transition-colors text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                    aria-label="Mostrar filtros"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                   </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`hidden md:block mt-4 transition-all duration-300 ease-out overflow-hidden ${isDesktopPanelVisible ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`} aria-hidden={!isDesktopPanelVisible}>
                        <div className="pt-2">
                            {renderFilterButtons()}
                        </div>
                    </div>
                </div>
            </div>

            {isMobileModalOpen && (
                 <div
                    className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-40 transition-opacity duration-300 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
                    onClick={handleCloseMobileModal}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={`bg-gray-900 rounded-t-xl p-6 w-full max-w-sm border-t border-gray-700 shadow-2xl transform transition-transform duration-300 ease-out ${isAnimatingOut ? 'translate-y-full' : 'translate-y-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-white text-center mb-6">Filtrar Coleção</h3>
                        {renderFilterButtons()}
                        <button
                            onClick={handleCloseMobileModal}
                            className="mt-6 w-full bg-amber-400 text-black font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        >
                            Ver Resultados
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterControls;