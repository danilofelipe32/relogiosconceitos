import React from 'react';

const About: React.FC = () => {
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 text-center flex flex-col items-center">
                <span className="w-16 h-px bg-amber-400 mb-4"></span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-400">A Essência da Horologia</h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400 leading-loose">
                    Cada relógio é uma declaração, uma peça de arte funcional que transcende o tempo. Nossa paixão é fundir a precisão da engenharia com a ousadia do design, criando peças que não são apenas usadas, mas sentidas. Exploramos materiais inovadores e mecanismos complexos para redefinir o que um relógio pode ser.
                </p>
            </div>
        </section>
    );
};

export default About;
