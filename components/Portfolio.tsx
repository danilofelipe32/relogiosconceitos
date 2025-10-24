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
    onFilterChange: (filter: FilterCategory) => void;
    onSearchChange: (term: string) => void;
    onToggleFavorite: (id: number) => void;
    onCardClick: (imageUrl: string) => void;
    isLoadingMore: boolean;
    hasMore: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({
    watches,
    favorites,
    activeCategories,
    isFavoritesActive,
    searchTerm,
    onFilterChange,
    onSearchChange,
    onToggleFavorite,
    onCardClick,
    isLoadingMore,
    hasMore
}) => {
    return (
        <section id="portfolio" className="container mx-auto px-4 py-20 md:py-28">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-400">Coleção</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Cada peça é uma obra de arte conceitual, um vislumbre do futuro da horologia.</p>
            </div>

            <FilterControls 
                activeCategories={activeCategories}
                isFavoritesActive={isFavoritesActive}
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

            <div className="text-center pt-16 h-10">
                {isLoadingMore && (
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                         <div className="w-6 h-6 border-2 border-gray-600 border-t-amber-400 rounded-full animate-spin"></div>
                         <span>Carregando mais...</span>
                    </div>
                )}
                {!isLoadingMore && !hasMore && watches.length > 0 && (
                     <p className="text-gray-600">Você chegou ao fim da coleção.</p>
                )}
            </div>
        </section>
    );
};

export default Portfolio;