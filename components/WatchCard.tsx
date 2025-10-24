import React, { useState, useEffect, useRef } from 'react';
import type { Watch } from '../types';

interface WatchCardProps {
    watch: Watch;
    isFavorited: boolean;
    onToggleFavorite: (id: number) => void;
    onImageClick: () => void;
}

const WatchCard: React.FC<WatchCardProps> = ({ watch, isFavorited, onToggleFavorite, onImageClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const originalUrl = watch.imageUrl;
    const extensionIndex = originalUrl.lastIndexOf('.');
    const thumbnailUrl = extensionIndex !== -1 
        ? originalUrl.substring(0, extensionIndex) + 'l' + originalUrl.substring(extensionIndex)
        : originalUrl;

    return (
        <div
            ref={cardRef}
            className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg group transition-all duration-700 ease-out flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="relative">
                <div onClick={onImageClick} className="w-full h-full aspect-square cursor-pointer overflow-hidden">
                     <img 
                        src={thumbnailUrl} 
                        alt={watch.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy" 
                     />
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(watch.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/50 rounded-full z-10 transition-transform duration-200 hover:scale-110"
                    aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    <svg className={`w-6 h-6 transition-all duration-300 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'}`} viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white">{watch.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{watch.category}</p>
                <p className="text-sm text-gray-300 mt-2 flex-grow">{watch.description}</p>
                <div className="text-right text-xs font-mono text-gray-500 mt-4">
                    ID: {watch.id}
                </div>
            </div>
        </div>
    );
};

export default WatchCard;