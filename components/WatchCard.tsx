
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
            {
                threshold: 0.1,
            }
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
            className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(watch.id);
                }}
                className={`favorite-btn absolute top-3 left-3 p-1.5 bg-black bg-opacity-50 rounded-full z-20 transition-transform duration-200 hover:scale-110 ${isFavorited ? 'favorited' : ''}`}
                aria-label="Toggle Favorite"
            >
                <svg className={`w-6 h-6 transition-colors duration-200 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'fill-transparent stroke-white'}`} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </button>
            <div onClick={onImageClick} className="w-full h-full aspect-square">
                 <img src={thumbnailUrl} alt={watch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex flex-col justify-end p-4 pointer-events-none">
                <h3 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-4">{watch.name}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform group-hover:translate-y-0 translate-y-4">{watch.description}</p>
            </div>
            <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded z-10">
                {watch.id}-{watch.category.charAt(0)}
            </div>
        </div>
    );
};

export default WatchCard;
