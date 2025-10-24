import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="relative h-screen flex items-center justify-center text-white bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://i.imgur.com/UBMXRgp.jpeg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="z-10 text-center p-4 max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Horologia Conceito</h1>
                <p className="mt-6 text-lg md:text-xl text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>Explorando os limites do design e da engenharia. Bem-vindo ao futuro da medição do tempo.</p>
                <a 
                    href="#portfolio" 
                    className="mt-10 inline-block border-2 border-amber-400 text-amber-400 font-bold py-3 px-8 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                    Ver Coleção
                </a>
            </div>
        </header>
    );
};

export default Header;