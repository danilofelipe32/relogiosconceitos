import React from 'react';

const About: React.FC = () => {
    return (
        <section className="bg-gray-900/50 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-400">A Essência da Horologia</h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
                    Cada relógio é uma declaração, uma peça de arte funcional que transcende o tempo. A nossa paixão é fundir a precisão da engenharia com a ousadia do design conceptual, criando peças que não são apenas usadas, mas sentidas. Exploramos materiais inovadores e mecanismos complexos para redefinir o que um relógio pode ser.
                </p>
            </div>
        </section>
    );
};

export default About;