
import React from 'react';
import type { Watch, FilterCategory, WatchCategory } from '../types';
import WatchCard from './WatchCard';
import FilterControls from './FilterControls';

interface PortfolioProps {
    watches: Watch[];
    favorites: number[];
    activeCategories: WatchCategory[];
    isFavoritesActive: boolean;
    searchTerm: string;
    suggestions: Watch[];
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
    onSuggestionClick: (suggestion: string) => void;
    onToggleFavorite: (id: number) => void;
    onCardClick: (id: number) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({
    watches,
    favorites,
    activeCategories,
    isFavoritesActive,
    searchTerm,
    suggestions,
    onFilterChange,
    onSearchChange,
    onSuggestionClick,
    onToggleFavorite,
    onCardClick
}) => {
    return (
        <section id="portfolio" className="container mx-auto px-6 py-24 md:py-32">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="text-left max-w-2xl">
                    <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Coleção</h2>
                    <p className="text-lg text-gray-400 font-light leading-relaxed">
                        Uma curadoria de peças que desafiam a engenharia e definem o futuro do design horológico.
                    </p>
                </div>
            </div>

            <div className="sticky top-4 z-40 mb-12">
                <FilterControls 
                    activeCategories={activeCategories}
                    isFavoritesActive={isFavoritesActive}
                    searchTerm={searchTerm}
                    suggestions={suggestions}
                    onFilterChange={onFilterChange}
                    onSearchChange={onSearchChange}
                    onSuggestionClick={onSuggestionClick}
                />
            </div>

            {watches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {watches.map(watch => (
                        <WatchCard
                            key={watch.id}
                            watch={watch}
                            isFavorited={favorites.includes(watch.id)}
                            onToggleFavorite={onToggleFavorite}
                            onImageClick={() => onCardClick(watch.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-800 rounded-3xl">
                    <p className="text-2xl font-serif text-gray-600 mb-2">Nenhum resultado encontrado</p>
                    <p className="text-gray-500 font-light">Tente ajustar seus filtros ou termo de busca.</p>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
