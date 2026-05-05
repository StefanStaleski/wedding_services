import React, {useEffect, useRef, useState} from 'react';
import { Search, Image as ImageIcon } from 'lucide-react';

const LandingPage: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setCardsVisible(true); },
            { threshold: 0.15 }
        );
        if (cardsRef.current) observer.observe(cardsRef.current);
        return () => observer.disconnect();
    }, []);

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
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"/>

                <div
                    className="relative z-10 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-out"
                    style={{opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)'}}
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-6 font-light">
                        Дигитално свечено искуство
                    </p>
                    <h1 className="text-7xl md:text-9xl font-serif text-white tracking-widest mb-6">
                        Мигови
                    </h1>
                    <div className="w-16 h-px bg-white/40 mb-6"/>
                    <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-md">
                        Секој миг зачуван. Секој гостин на своето место.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-bounce"
                    >
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 flex-grow bg-[#FDFAF5]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Услуги</p>
                        <h2 className="text-4xl font-serif font-light text-[#2C2C2C]">Сè на едно место</h2>
                        <div className="w-12 h-px bg-[#C9A84C] mx-auto mt-6"/>
                    </div>

                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div
                            style={{
                                opacity: cardsVisible ? 1 : 0,
                                transform: cardsVisible ? 'translateY(0)' : 'translateY(28px)',
                                transition: 'opacity 0.7s ease 0s, transform 0.7s ease 0s'
                            }}
                            className="group rounded-2xl shadow-sm p-10 flex flex-col items-center text-center border-2 border-[#F7E7CE]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className="w-16 h-16 rounded-full bg-[#F7E7CE] flex items-center justify-center mb-6 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                                <Search size={28}/>
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Распоред на Седење</h3>
                            <div className="w-8 h-px bg-[#C9A84C]/40 mb-4"/>
                            <p className="text-gray-500 font-light leading-relaxed">
                                Беспрекорна организација без хартиени списоци. Вашиот дигитален распоред на седење им
                                овозможува на гостите веднаш да ја пронајдат својата маса. Елегантно, модерно и без
                                мешаници пред влезот.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            style={{
                                opacity: cardsVisible ? 1 : 0,
                                transform: cardsVisible ? 'translateY(0)' : 'translateY(28px)',
                                transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s'
                            }}
                            className="group rounded-2xl shadow-sm p-10 flex flex-col items-center text-center border-2 border-[#F7E7CE]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className="w-16 h-16 rounded-full bg-[#F7E7CE] flex items-center justify-center mb-6 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                                <ImageIcon size={28}/>
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Дигитална Галерија</h3>
                            <div className="w-8 h-px bg-[#C9A84C]/40 mb-4"/>
                            <p className="text-gray-500 font-light leading-relaxed">
                                Погледнете ја прославата низ очите на вашите гости. Дозволете им директно од својот
                                телефон да ги споделат фотографиите со вас во реално време.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-[#1F1F1F] text-white/70 border-t border-white/10">
                {/* The premium gradient line you liked */}
                <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent"/>

                <div
                    className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10">

                    {/* Left Side: Brand Anchor - Centered on mobile, Left on desktop */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30">
                        Елегантност во секој детаљ.
                      </span>
                    </div>

                    {/* Right Side: Links & Copyright - Centered on mobile, Right on desktop */}
                    <div className="flex flex-col items-center md:items-end gap-6 md:gap-4">
                        <a
                            href="https://instagram.com/migovi.mk"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 md:gap-2 text-sm tracking-[0.2em] uppercase text-white/50 hover:text-[#C9A84C] transition-all duration-300 active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                <circle cx="12" cy="12" r="4"/>
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                            </svg>
                            migovi.mk
                        </a>

                        {/* Subtle divider only visible on mobile to separate social from copyright */}
                        <div className="w-8 h-px bg-white/10 md:hidden"/>

                        <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/20 font-light">
                            © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;