import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="main-header relative h-screen flex items-center justify-center text-white bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="z-10 text-center p-4 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-white" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.8)' }}>Horologia Conceito</h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>Explorando os limites do design e da engenharia. Bem-vindo ao futuro da medição do tempo.</p>
                <a 
                    href="#portfolio" 
                    className="mt-10 inline-block bg-transparent border-2 border-amber-400 text-amber-400 font-bold py-3 px-8 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                >
                    Ver Coleção
                </a>
            </div>
            <div className="absolute bottom-10 animate-bounce">
                <a href="#portfolio" aria-label="Scroll to portfolio">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </div>
        </header>
    );
};

export default Header;