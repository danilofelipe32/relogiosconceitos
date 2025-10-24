
import React, { useState, useEffect } from 'react';

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
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                {isLoading && (
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
                )}
                <img
                    src={imageUrl}
                    alt="Imagem do relógio em tela cheia"
                    className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
            <button onClick={() => onShare(imageUrl)} className="absolute top-4 left-4 text-white hover:text-yellow-400 transition p-2 bg-black bg-opacity-50 rounded-full" title="Partilhar Imagem">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
            </button>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-yellow-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ImageModal;
