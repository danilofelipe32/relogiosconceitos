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
    const [isClicked, setIsClicked] = useState(false);
    const [feedbackIcon, setFeedbackIcon] = useState<'added' | 'removed' | null>(null);
    const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


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

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => setIsClicked(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isClicked]);

    useEffect(() => {
        if (feedbackIcon) {
            feedbackTimerRef.current = setTimeout(() => {
                setFeedbackIcon(null);
            }, 1000); // 1 second visibility
        }
        
        return () => {
            if (feedbackTimerRef.current) {
                clearTimeout(feedbackTimerRef.current);
            }
        };
    }, [feedbackIcon]);

    const originalUrl = watch.imageUrl;
    const extensionIndex = originalUrl.lastIndexOf('.');
    const thumbnailUrl = extensionIndex !== -1 
        ? originalUrl.substring(0, extensionIndex) + 'l' + originalUrl.substring(extensionIndex)
        : originalUrl;

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsClicked(true);
        
        if (feedbackTimerRef.current) {
            clearTimeout(feedbackTimerRef.current);
        }
        
        setFeedbackIcon(isFavorited ? 'removed' : 'added');
        onToggleFavorite(watch.id);
    };

    return (
        <div
            ref={cardRef}
            className={`relative bg-gray-900 border border-gray-800 rounded-lg shadow-lg group transition-all duration-300 ease-in-out flex flex-col hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/10 hover:-translate-y-2 hover:z-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="relative">
                <div onClick={onImageClick} className="w-full h-full aspect-square cursor-pointer overflow-hidden rounded-t-lg">
                     <img 
                        src={thumbnailUrl} 
                        alt={watch.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy" 
                     />
                </div>
                <div className="absolute top-3 right-3 z-10">
                    <div className={`absolute top-0 right-0 pointer-events-none transition-all duration-500 ease-out transform ${feedbackIcon ? 'opacity-100 scale-100 -translate-y-full' : 'opacity-0 scale-50 -translate-y-1/2'}`}>
                        {feedbackIcon === 'added' && (
                            <div className="p-1.5 bg-green-500/90 backdrop-blur-sm rounded-full shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                        {feedbackIcon === 'removed' && (
                            <div className="p-1.5 bg-red-500/90 backdrop-blur-sm rounded-full shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleToggleFavorite}
                        className={`p-2 bg-black/50 rounded-full transition-transform duration-300 ease-out hover:scale-110 ${isClicked ? 'scale-125' : ''}`}
                        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                        <svg className={`w-6 h-6 transition-all duration-300 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'}`} viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{watch.category}</p>
                <h3 className="text-xl font-bold text-white mt-1">{watch.name}</h3>
                <p className="text-sm text-gray-400 mt-2 flex-grow leading-relaxed">{watch.description}</p>
                <div className="text-right text-xs font-mono text-gray-600 mt-4">
                    ID: {String(watch.id).padStart(3, '0')}
                </div>
            </div>
        </div>
    );
};

export default WatchCard;