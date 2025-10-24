import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-8">
            <div className="container mx-auto px-4 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Horologia Conceito. Todos os direitos reservados.</p>
                <p className="mt-2 text-sm">
                    <a href="https://api.whatsapp.com/send?phone=5584999780963" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-300">Produzido por Danilo Arruda</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;