import React, { useEffect, useState } from 'react';
import { Search, Image as ImageIcon } from 'lucide-react';

const LandingPage: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2C2C2C] flex flex-col">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://assets.mixkit.co/videos/preview/mixkit-wedding-rings-on-a-table-41793-large.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                <div
                    className="relative z-10 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-out"
                    style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-6 font-light">
                        Дигитално свечено искуство
                    </p>
                    <h1 className="text-7xl md:text-9xl font-serif text-white tracking-widest mb-6">
                        Мигови
                    </h1>
                    <div className="w-16 h-px bg-white/40 mb-6" />
                    <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-md">
                        Секој миг зачуван. Секој гостин на своето место.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-8 bg-white/20 animate-pulse" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 flex-grow bg-[#FDFAF5]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Услуги</p>
                        <h2 className="text-4xl font-serif font-light text-[#2C2C2C]">Сè на едно место</h2>
                        <div className="w-12 h-px bg-[#C9A84C] mx-auto mt-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center border border-[#F7E7CE]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-[#F7E7CE] flex items-center justify-center mb-6 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                                <Search size={28} />
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Распоред на Седење</h3>
                            <div className="w-8 h-px bg-[#C9A84C]/40 mb-4" />
                            <p className="text-gray-500 font-light leading-relaxed">
                                Беспрекорна организација без хартиени списоци. Вашиот дигитален распоред на седење им овозможува на гостите веднаш да ја пронајдат својата маса. Елегантно, модерно и без мешаници пред влезот.
                            </p>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center border border-[#F7E7CE]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-[#F7E7CE] flex items-center justify-center mb-6 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                                <ImageIcon size={28} />
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Дигитална Галерија</h3>
                            <div className="w-8 h-px bg-[#C9A84C]/40 mb-4" />
                            <p className="text-gray-500 font-light leading-relaxed">
                                Погледнете ја прославата низ очите на вашите гости. Дозволете им директно од својот телефон да ги споделат фотографиите со вас во реално време.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-[#2C2C2C]">
                <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
                    <h2 className="text-3xl font-serif tracking-widest text-white">Мигови</h2>
                    <div className="w-8 h-px bg-[#C9A84C]" />
                    <a
                    href="https://instagram.com/migovi.mk"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/40 hover:text-[#C9A84C] transition-colors duration-300 text-sm tracking-widest uppercase"
                    >
                    @migovi.mk
                </a>
                <p className="text-white/20 text-xs tracking-widest uppercase mt-4">
                    © {new Date().getFullYear()} Мигови
                </p>
        </div>
</footer>
</div>
);
};

export default LandingPage;