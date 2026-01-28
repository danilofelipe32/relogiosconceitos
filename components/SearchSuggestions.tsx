
import React from 'react';
import type { Watch } from '../types';

interface SearchSuggestionsProps {
    suggestions: Watch[];
    searchTerm: string;
    onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, searchTerm, onSuggestionClick }) => {

    const getHighlightedText = (text: string, highlight: string) => {
        if (!highlight) {
            return <span>{text}</span>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <strong key={i} className="text-gray-300 font-bold">{part}</strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    // Função auxiliar para obter thumbnail (similar ao WatchCard)
    const getThumbnail = (url: string) => {
        const extensionIndex = url.lastIndexOf('.');
        return extensionIndex !== -1 
            ? url.substring(0, extensionIndex) + 's' + url.substring(extensionIndex) // 's' para small square no Imgur
            : url;
    };

    return (
        <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-40 overflow-hidden animate-fade-in">
            <ul role="listbox">
                {suggestions.map((watch) => (
                    <li key={watch.id} className="border-b border-gray-800 last:border-0">
                        <button
                            onClick={() => onSuggestionClick(watch.name)}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:bg-gray-800 flex items-center gap-3"
                            role="option"
                            aria-selected="false"
                        >
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
                                <img 
                                    src={getThumbnail(watch.imageUrl)} 
                                    alt={watch.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium truncate">
                                {getHighlightedText(watch.name, searchTerm)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSuggestions;
