import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import Notification from './components/Notification';
import { WATCHES } from './constants';
import type { Watch, FilterCategory, WatchCategory } from './types';

const INITIAL_LOAD = 20;
const LOAD_MORE_COUNT = 10;

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
    const [activeCategories, setActiveCategories] = useState<WatchCategory[]>([]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
            const categoryMatch = activeCategories.length === 0 || activeCategories.includes(watch.category);
            const favoriteMatch = !showOnlyFavorites || favorites.includes(watch.id);
            const searchMatch = 
                !lowercasedSearchTerm ||
                watch.name.toLowerCase().includes(lowercasedSearchTerm) ||
                watch.description.toLowerCase().includes(lowercasedSearchTerm);
            
            return categoryMatch && favoriteMatch && searchMatch;
        });

        setHasMore(filtered.length > visibleCount);
        setFilteredWatches(filtered.slice(0, visibleCount));

    }, [searchTerm, activeCategories, showOnlyFavorites, watches, favorites, visibleCount]);

    useEffect(() => {
        setVisibleCount(INITIAL_LOAD);
    }, [searchTerm, activeCategories, showOnlyFavorites]);

    const handleScroll = useCallback(() => {
        // Prevent loading if we are already loading, or if there are no more items
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 300 || isLoadingMore || !hasMore) {
            return;
        }
        
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT);
            setIsLoadingMore(false);
        }, 500); // Simulate network delay
    }, [isLoadingMore, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

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

    const handleFilterChange = (filter: FilterCategory) => {
        if (filter === 'all') {
            setActiveCategories([]);
        } else if (filter === 'favorites') {
            setShowOnlyFavorites(prev => !prev);
        } else { // It's a WatchCategory
            setActiveCategories(prev => {
                const newCategories = prev.includes(filter as WatchCategory)
                    ? prev.filter(cat => cat !== filter)
                    : [...prev, filter];
                return newCategories;
            });
        }
    };

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
                    activeCategories={activeCategories}
                    isFavoritesActive={showOnlyFavorites}
                    searchTerm={searchTerm}
                    onFilterChange={handleFilterChange}
                    onSearchChange={setSearchTerm}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={setModalImageUrl}
                    isLoadingMore={isLoadingMore}
                    hasMore={hasMore}
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