
import React, { useState } from 'react';
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
        <main id="portfolio" className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">Nossa Coleção Exclusiva</h2>
                <p className="mt-2 text-gray-400">Designs que desafiam o convencional.</p>
            </div>

            <FilterControls 
                activeFilter={activeFilter}
                searchTerm={searchTerm}
                onFilterChange={onFilterChange}
                onSearchChange={onSearchChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
        </main>
    );
};

export default Portfolio;
