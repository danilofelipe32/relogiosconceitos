
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="relative h-screen flex items-center justify-center text-white bg-cover bg-center bg-scroll md:bg-fixed" style={{ backgroundImage: "url('https://i.imgur.com/UBMXRgp.jpeg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="z-10 text-center p-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-yellow-400">Horologia Conceito</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Explorando os limites do design e da engenharia. Bem-vindo ao futuro da medição do tempo.</p>
                <a href="#portfolio" className="mt-8 inline-block bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300">Ver Coleção</a>
            </div>
        </header>
    );
};

export default Header;
