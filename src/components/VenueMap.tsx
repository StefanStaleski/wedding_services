import React, { useState } from 'react';
import { Map, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    url: string;
}

const VenueMap: React.FC<Props> = ({ url }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#F7E7CE]/40 rounded-xl p-4 flex items-center justify-between text-[#2C2C2C] transition-colors hover:bg-[#F7E7CE]/70"
            >
                <div className="flex items-center gap-3">
                    <Map size={20} className="text-[#C9A84C]" />
                    <span className="font-medium">Мапа на салата</span>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="mt-4 bg-white p-2 rounded-2xl shadow-sm border border-[#F7E7CE]/50">
                    <img src={url} alt="Venue Map" className="w-full h-auto rounded-xl" />
                </div>
            )}
        </div>
    );
};

export default VenueMap;