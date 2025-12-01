
import React, { useState, useEffect, useRef } from 'react';
import type { Watch } from '../types';

interface WatchCardProps {
    watch: Watch;
    isFavorited: boolean;
    onToggleFavorite: (id: number) => void;
    onImageClick: () => void;
}

const MAGNIFIER_SIZE = 150;
const ZOOM_LEVEL = 2.5;

const WatchCard: React.FC<WatchCardProps> = ({ watch, isFavorited, onToggleFavorite, onImageClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [feedbackIcon, setFeedbackIcon] = useState<'added' | 'removed' | null>(null);
    const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Magnifier state
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({});

    const hasDetails = watch.material || watch.dimensions || watch.movement;

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
        
        if (!isFavorited) {
            setIsExploding(true);
            setTimeout(() => setIsExploding(false), 700);
        }

        if (feedbackTimerRef.current) {
            clearTimeout(feedbackTimerRef.current);
        }
        
        setFeedbackIcon(isFavorited ? 'removed' : 'added');
        onToggleFavorite(watch.id);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
            setShowMagnifier(false);
            return;
        }

        const bgPosX = -(x * ZOOM_LEVEL - MAGNIFIER_SIZE / 2);
        const bgPosY = -(y * ZOOM_LEVEL - MAGNIFIER_SIZE / 2);

        setMagnifierStyle({
            backgroundPosition: `${bgPosX}px ${bgPosY}px`,
            top: `${y - MAGNIFIER_SIZE / 2}px`,
            left: `${x - MAGNIFIER_SIZE / 2}px`,
            backgroundImage: `url(${watch.imageUrl})`,
            backgroundSize: `${rect.width * ZOOM_LEVEL}px ${rect.height * ZOOM_LEVEL}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
        });
    };

    return (
        <div
            ref={cardRef}
            className={`relative bg-gray-900 border border-gray-800 rounded-lg shadow-lg group transition-all duration-300 ease-in-out flex flex-col hover:border-gray-300/30 hover:shadow-2xl hover:shadow-gray-300/10 hover:-translate-y-2 hover:z-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="relative">
                <div 
                    onClick={onImageClick} 
                    onMouseEnter={() => setShowMagnifier(true)}
                    onMouseLeave={() => setShowMagnifier(false)}
                    onMouseMove={handleMouseMove}
                    className="w-full h-full aspect-square cursor-none overflow-hidden rounded-t-lg"
                    aria-label={`Ver detalhes de ${watch.name}`}
                    role="button"
                >
                     <img 
                        src={thumbnailUrl} 
                        alt={watch.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy" 
                     />
                    <div
                        style={magnifierStyle}
                        className={`absolute pointer-events-none rounded-full border-2 border-gray-300 bg-no-repeat shadow-2xl backdrop-invert-[5%] transition-all duration-200 ease-out ${showMagnifier ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                        aria-hidden="true"
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
                        className={`relative p-2 bg-black/50 rounded-full transition-transform duration-300 ease-out hover:scale-110 ${isClicked ? 'scale-125' : ''}`}
                        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                        {isExploding && (
                            <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                        )}
                        <svg className={`w-6 h-6 transition-all duration-300 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'}`} viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`p-5 flex-grow flex flex-col ${hasDetails ? 'cursor-pointer' : ''}`}
                onClick={() => hasDetails && setIsExpanded(prev => !prev)}
                onKeyDown={(e) => {
                  if (hasDetails && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setIsExpanded(prev => !prev);
                  }
                }}
                role={hasDetails ? 'button' : undefined}
                tabIndex={hasDetails ? 0 : -1}
                aria-expanded={isExpanded}
            >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{watch.category}</p>
                <h3 className="text-xl font-bold text-white mt-1">{watch.name}</h3>
                <p className="text-sm text-gray-400 mt-2 flex-grow leading-relaxed">{watch.description}</p>
                
                <div className={`transition-all duration-500 ease-in-out grid ${isExpanded ? 'grid-rows-[1fr] opacity-100 pt-4 mt-4 border-t border-gray-800' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <h4 className="text-sm font-bold text-gray-300 mb-2">Detalhes Técnicos:</h4>
                        <ul className="space-y-1 text-xs text-gray-500">
                            {watch.material && <li><strong>Material:</strong> {watch.material}</li>}
                            {watch.dimensions && <li><strong>Dimensões:</strong> {watch.dimensions}</li>}
                            {watch.movement && <li><strong>Movimento:</strong> {watch.movement}</li>}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-xs font-mono text-gray-600">
                        ID: {String(watch.id).padStart(3, '0')}
                    </div>
                    <div className={`flex items-center text-xs ${hasDetails ? 'text-gray-400/70' : 'text-gray-600'}`} aria-hidden="true">
                        <span className="mr-1">Detalhes</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchCard;
