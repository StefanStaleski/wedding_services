import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2C2C2C] flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-8xl md:text-9xl font-serif text-[#C9A84C] font-light tracking-widest mb-4">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-serif mb-2">
                    Страницата не е пронајдена
                </h2>
                <p className="text-gray-500 font-light mb-10 max-w-md mx-auto">
                    Page not found. The link you followed may be broken, or the page may have been removed.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-[#2C2C2C] text-white px-8 py-3 rounded-full font-medium tracking-wide hover:bg-[#C9A84C] transition-colors duration-300 shadow-md"
                >
                    Врати се на почетна
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;