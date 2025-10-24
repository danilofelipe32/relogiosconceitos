import React from 'react';

interface SearchSuggestionsProps {
    suggestions: string[];
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
                        <strong key={i} className="text-amber-400 font-bold">{part}</strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-40 overflow-hidden animate-fade-in">
            <ul role="listbox">
                {suggestions.map((suggestion, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onSuggestionClick(suggestion)}
                            className="w-full text-left px-4 pl-12 py-3 text-white hover:bg-amber-400/10 transition-colors duration-150 focus:outline-none focus:bg-amber-400/20"
                            role="option"
                            aria-selected="false"
                        >
                            {getHighlightedText(suggestion, searchTerm)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSuggestions;
