import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import Notification from './components/Notification';
import BackToTopButton from './components/BackToTopButton';
import { WATCHES } from './constants';
import type { Watch, FilterCategory, WatchCategory } from './types';

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
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);


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
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        if (searchTerm.length > 1) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const matchingWatches = WATCHES
                .filter(watch => watch.name.toLowerCase().includes(lowercasedSearchTerm))
                .map(watch => watch.name);
            
            const uniqueNames = [...new Set(matchingWatches)];

            setSuggestions(uniqueNames.slice(0, 5));
        } else {
            setSuggestions([]);
        }

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

        const filtered = watches.filter(watch => {
            const categoryMatch = activeCategories.length === 0 || activeCategories.includes(watch.category);
            const favoriteMatch = !showOnlyFavorites || favorites.includes(watch.id);
            const searchMatch = 
                !lowercasedSearchTerm ||
                watch.name.toLowerCase().includes(lowercasedSearchTerm) ||
                watch.description.toLowerCase().includes(lowercasedSearchTerm);
            
            return categoryMatch && favoriteMatch && searchMatch;
        });

        setFilteredWatches(filtered);
    }, [debouncedSearchTerm, activeCategories, showOnlyFavorites, watches, favorites]);


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

    const handleSuggestionClick = useCallback((suggestion: string) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    }, []);

    const handleShare = useCallback(async (imageUrl: string) => {
        const watch = watches.find(w => w.imageUrl === imageUrl);
        const watchName = watch ? watch.name : 'relógio conceito';
        const shareText = `Veja este incrível relógio conceito: ${watchName}!`;

        const shareData = {
            title: `Horologia Conceito - ${watchName}`,
            text: shareText,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setNotificationMessage('Link do portfólio copiado!');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
                setNotificationMessage('Não foi possível copiar o link.');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            }
        }
    }, [watches]);

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
                    suggestions={suggestions}
                    onFilterChange={handleFilterChange}
                    onSearchChange={setSearchTerm}
                    onSuggestionClick={handleSuggestionClick}
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
            <BackToTopButton />
        </>
    );
};

export default App;