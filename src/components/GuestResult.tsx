import React from 'react';
import { Guest } from '../types';

interface Props {
    guest: Guest;
}

const GuestResult: React.FC<Props> = ({ guest }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center border border-[#F7E7CE]/50 transition-transform active:scale-95">
            <span className="text-lg font-medium">{guest.guest_name}</span>
            <div className="flex flex-col items-end">
                <span className="text-xs uppercase tracking-widest text-gray-400 mb-1">Маса</span>
                <span className="text-3xl font-serif text-[#C9A84C] leading-none">{guest.table_number}</span>
            </div>
        </div>
    );
};

export default GuestResult;