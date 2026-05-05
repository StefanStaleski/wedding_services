import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Map, ChevronDown, ChevronUp } from 'lucide-react';
import GuestResult from '../components/GuestResult';
import VenueMap from '../components/VenueMap';
import { Wedding, Guest } from '../types';
import { getWeddingBySlug } from '../services/weddingService';
import {searchGuests, transliterate} from '../services/guestService'

const SeatingPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const [wedding, setWedding] = useState<Wedding | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedTerm, setDebouncedTerm] = useState<string>('');
    const [guests, setGuests] = useState<Guest[]>([]);
    const [searching, setSearching] = useState<boolean>(false);

    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

    // Fetch Wedding Details
    useEffect(() => {
        const fetchWedding = async () => {
            if (!slug) return;
            try {
                const data = await getWeddingBySlug(slug);
                if (!data || !data.is_active || !data.has_seating) {
                    setError("Настанот не е пронајден или распоредот е исклучен.");
                } else {
                    setWedding(data);
                }
            } catch (err) {
                setError("Настана грешка при вчитување на податоците.");
            } finally {
                setLoading(false);
            }
        };
        fetchWedding();
    }, [slug]);

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Search execution
    useEffect(() => {
        const fetchGuests = async () => {
            if (!wedding || debouncedTerm.trim().length < 2) {
                setGuests([]);
                return;
            }
            setSearching(true);
            try {
                const results = await searchGuests(wedding.id, transliterate(debouncedTerm));
                setGuests(results);
            } catch (err) {
                console.error("Грешка при пребарување", err);
            } finally {
                setSearching(false);
            }
        };
        fetchGuests();
    }, [debouncedTerm, wedding]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center text-[#C9A84C]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A84C]"></div>
            </div>
        );
    }

    if (error || !wedding) {
        return (
            <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-serif text-[#2C2C2C] mb-4">Жалиме</h2>
                <p className="text-gray-500">{error || "Настанот не е пронајден."}</p>
            </div>
        );
    }

    const dateFormatted = new Date(wedding.wedding_date).toLocaleDateString('mk-MK', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2C2C2C] pb-20">
            <div className="max-w-lg mx-auto px-6 pt-16">

                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-light tracking-widest mb-4">
                        {wedding.bride_name} & {wedding.groom_name}
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        {dateFormatted}
                    </p>
                </header>

                {/* Venue Map Collapsible */}
                {wedding.venue_map_url && <VenueMap url={wedding.venue_map_url} />}

                {/* Search Input */}
                <div className="relative mb-8 shadow-sm rounded-full">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-white border border-[#F7E7CE]/50 rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all placeholder-gray-300"
                        placeholder="Внесете го вашето име..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {searching && (
                        <p className="text-center text-sm text-gray-400 animate-pulse">Пребарување...</p>
                    )}

                    {!searching && searchTerm.length >= 2 && guests.length === 0 && (
                        <div className="text-center py-8 bg-white rounded-2xl shadow-sm border border-[#F7E7CE]/50">
                            <p className="text-gray-500 font-light">Не се пронајдени резултати за "{searchTerm}"</p>
                        </div>
                    )}

                    {!searching && guests.map((guest) => (
                        <GuestResult key={guest.id} guest={guest} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SeatingPage;