
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import Notification from './components/Notification';
import { WATCHES } from './constants';
import type { Watch, FilterCategory } from './types';

const App: React.FC = () => {
    const [watches, setWatches] = useState<Watch[]>([]);
    const [filteredWatches, setFilteredWatches] = useState<Watch[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Simulating a fetch call
        setWatches(WATCHES);
        const storedFavorites = localStorage.getItem('horologiaFavorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('horologiaFavorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        const filtered = watches.filter(watch => {
            const matchesCategory =
                activeFilter === 'all' ||
                (activeFilter === 'favorites' && favorites.includes(watch.id)) ||
                watch.category === activeFilter;
            
            if (!matchesCategory) return false;

            const matchesSearch = 
                !lowercasedSearchTerm ||
                watch.name.toLowerCase().includes(lowercasedSearchTerm) ||
                watch.description.toLowerCase().includes(lowercasedSearchTerm);
            
            return matchesSearch;
        });

        setFilteredWatches(filtered);
    }, [searchTerm, activeFilter, watches, favorites]);


    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    }, []);

    const handleShare = useCallback(async (imageUrl: string) => {
        const shareData = {
            title: 'Horologia Conceito',
            text: 'Veja este incrível relógio conceito!',
            url: imageUrl
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(imageUrl);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Não foi possível copiar o link.');
            }
        }
    }, []);

    return (
        <>
            <Header />
            <Portfolio
                watches={filteredWatches}
                favorites={favorites}
                activeFilter={activeFilter}
                searchTerm={searchTerm}
                onFilterChange={setActiveFilter}
                onSearchChange={setSearchTerm}
                onToggleFavorite={toggleFavorite}
                onCardClick={setModalImageUrl}
            />
            <About />
            <Footer />
            {modalImageUrl && (
                <ImageModal
                    imageUrl={modalImageUrl}
                    onClose={() => setModalImageUrl(null)}
                    onShare={handleShare}
                />
            )}
            <Notification message="Link da imagem copiado!" isVisible={showNotification} />
        </>
    );
};

export default App;
