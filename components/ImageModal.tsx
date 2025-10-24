import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
    onShare: (imageUrl: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose, onShare }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setIsLoading(false);
    }, [imageUrl]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="relative max-w-4xl max-h-[90vh] flex items-center justify-center" 
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading && (
                    <div className="w-16 h-16 border-4 border-gray-600 border-t-amber-400 rounded-full animate-spin"></div>
                )}
                <img
                    src={imageUrl}
                    alt="Imagem do relógio em tela cheia"
                    className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                />
            </div>
             <div className="absolute top-4 right-4 flex gap-3">
                <Tooltip text="Partilhar Imagem">
                    <button 
                        onClick={() => onShare(imageUrl)} 
                        className="text-white hover:text-amber-400 transition p-3 bg-black/50 rounded-full" 
                        aria-label="Partilhar Imagem"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
                        </svg>
                    </button>
                </Tooltip>
                <Tooltip text="Fechar">
                    <button 
                        onClick={onClose} 
                        className="text-white hover:text-amber-400 transition p-3 bg-black/50 rounded-full"
                        aria-label="Fechar modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </Tooltip>
            </div>
            
        </div>
    );
};

export default ImageModal;
