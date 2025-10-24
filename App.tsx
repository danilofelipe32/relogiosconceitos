import React, { useState, useEffect, useCallback } from 'react';
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
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const storedFavorites = localStorage.getItem('horologiaFavorites');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error('Failed to parse favorites from localStorage', error);
            return [];
        }
    });
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');


    useEffect(() => {
        // Simulating a fetch call
        setWatches(WATCHES);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('horologiaFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Failed to save favorites to localStorage', error);
        }
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
        setFavorites(prev => {
            const isFavorited = prev.includes(id);
            if (isFavorited) {
                setNotificationMessage('Removido dos favoritos.');
            } else {
                setNotificationMessage('Adicionado aos favoritos!');
            }
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            return isFavorited ? prev.filter(favId => favId !== id) : [...prev, id];
        });
    }, []);

    const handleShare = useCallback(async (imageUrl: string) => {
        const shareData = {
            title: 'Horologia Conceito',
            text: 'Veja este incrível relógio conceito!',
            url: window.location.href // Share the portfolio link instead of just the image
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
                setNotificationMessage('Link da imagem copiado!');
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
            <main>
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
            </main>
            <Footer />
            {modalImageUrl && (
                <ImageModal
                    imageUrl={modalImageUrl}
                    onClose={() => setModalImageUrl(null)}
                    onShare={handleShare}
                />
            )}
            <Notification message={notificationMessage} isVisible={showNotification} />
        </>
    );
};

export default App;