import React from 'react';
import type { Watch, FilterCategory } from '../types';
import WatchCard from './WatchCard';
import FilterControls from './FilterControls';

interface PortfolioProps {
    watches: Watch[];
    favorites: number[];
    activeFilter: FilterCategory;
    searchTerm: string;
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
    onToggleFavorite: (id: number) => void;
    onCardClick: (imageUrl: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({
    watches,
    favorites,
    activeFilter,
    searchTerm,
    onFilterChange,
    onSearchChange,
    onToggleFavorite,
    onCardClick
}) => {
    return (
        <section id="portfolio" className="container mx-auto px-4 py-20 md:py-28">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-400">Coleção</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Cada peça é uma obra de arte conceitual, um vislumbre do futuro da horologia.</p>
            </div>

            <FilterControls 
                activeFilter={activeFilter}
                searchTerm={searchTerm}
                onFilterChange={onFilterChange}
                onSearchChange={onSearchChange}
            />

            {watches.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
                    {watches.map(watch => (
                        <WatchCard
                            key={watch.id}
                            watch={watch}
                            isFavorited={favorites.includes(watch.id)}
                            onToggleFavorite={onToggleFavorite}
                            onImageClick={() => onCardClick(watch.imageUrl)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">Nenhum relógio encontrado. Tente ajustar sua busca ou filtros.</p>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
