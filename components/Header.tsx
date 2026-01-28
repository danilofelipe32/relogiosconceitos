
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Atualiza o offset apenas enquanto o header estiver (ou quase estiver) visível para performance
            if (window.scrollY <= window.innerHeight) {
                setOffset(window.scrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://i.imgur.com/YF2Lh54.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ 
                    transform: `translateY(${offset * 0.5}px)`,
                    willChange: 'transform'
                }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
            <div className="z-20 text-center p-4 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.8)' }}>Horologia Conceito</h1>
                <p className="mt-6 text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>Explorando os limites do design e da engenharia. Bem-vindo ao futuro da medição do tempo.</p>
                <a 
                    href="#portfolio" 
                    className="mt-10 inline-block bg-transparent border-2 border-gray-300 text-gray-300 font-bold py-3 px-8 rounded-full hover:bg-gray-300 hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(209,213,219,0.5)]"
                >
                    Ver Coleção
                </a>
            </div>
            <div className="absolute bottom-10 animate-bounce z-20">
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
