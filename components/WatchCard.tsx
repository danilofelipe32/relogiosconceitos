
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
    const [isExploding, setIsExploding] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const hasDetails = watch.material || watch.dimensions || watch.movement;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const originalUrl = watch.imageUrl;
    const extensionIndex = originalUrl.lastIndexOf('.');
    const thumbnailUrl = extensionIndex !== -1 
        ? originalUrl.substring(0, extensionIndex) + 'l' + originalUrl.substring(extensionIndex)
        : originalUrl;

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isFavorited) {
            setIsExploding(true);
            setTimeout(() => setIsExploding(false), 700);
        }
        
        onToggleFavorite(watch.id);
    };

    return (
        <div
            ref={cardRef}
            className={`group relative flex flex-col transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
            {/* Image Container */}
            <div 
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-800 cursor-pointer"
                onClick={onImageClick}
            >
                <img 
                    src={thumbnailUrl} 
                    alt={watch.name} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                    loading="lazy" 
                />
                
                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Favorite Button - Absolute Positioned */}
                <button
                    onClick={handleToggleFavorite}
                    className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-black/20 hover:bg-white/20 border border-white/10 transition-all duration-300 transform active:scale-95"
                    aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    {isExploding && (
                        <span className="absolute inset-0 rounded-full bg-red-500/50 animate-ping"></span>
                    )}
                    <svg 
                        className={`w-5 h-5 transition-colors duration-300 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'fill-transparent stroke-white'}`} 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>

                {/* Quick Action Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="inline-block text-xs font-bold text-white uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        Expandir Imagem
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="mt-5 flex flex-col space-y-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{watch.category}</p>
                        <h3 
                            className="font-serif text-2xl text-gray-100 leading-tight group-hover:text-white transition-colors cursor-pointer"
                            onClick={() => hasDetails && setIsExpanded(prev => !prev)}
                        >
                            {watch.name}
                        </h3>
                    </div>
                    {/* Expand Details Arrow */}
                    {hasDetails && (
                        <button 
                            onClick={() => setIsExpanded(prev => !prev)}
                            className={`text-gray-500 hover:text-white transition-all duration-300 transform ${isExpanded ? 'rotate-180' : ''}`}
                            aria-label="Ver detalhes"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>

                <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {watch.description}
                </p>

                {/* Expandable Details Section */}
                <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                            <ul className="space-y-3 text-xs text-gray-300 font-light">
                                {watch.material && (
                                    <li className="flex flex-col">
                                        <span className="text-gray-500 uppercase text-[10px] tracking-wider mb-0.5">Material</span>
                                        <span>{watch.material}</span>
                                    </li>
                                )}
                                {watch.dimensions && (
                                    <li className="flex flex-col">
                                        <span className="text-gray-500 uppercase text-[10px] tracking-wider mb-0.5">Dimensões</span>
                                        <span>{watch.dimensions}</span>
                                    </li>
                                )}
                                {watch.movement && (
                                    <li className="flex flex-col">
                                        <span className="text-gray-500 uppercase text-[10px] tracking-wider mb-0.5">Movimento</span>
                                        <span>{watch.movement}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="mt-3 pt-3 border-t border-white/5 text-[10px] font-mono text-gray-600 flex justify-end">
                                REF: {String(watch.id).padStart(3, '0')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchCard;
