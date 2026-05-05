import React from 'react';
import { Plus } from 'lucide-react';
import { Wedding } from '../types';
import { supabase } from '../services/supabase';
import { updateWedding } from '../services/weddingService';

interface Props {
    weddings: Wedding[];
    newBride: string; setNewBride: (v: string) => void;
    newGroom: string; setNewGroom: (v: string) => void;
    newSlug: string; setNewSlug: (v: string) => void;
    newDate: string; setNewDate: (v: string) => void;
    onCreateWedding: () => void;
    onToggle: (id: string, field: 'has_seating' | 'has_gallery' | 'is_active', currentVal: boolean) => void;
    onMapUpload: (e: React.ChangeEvent<HTMLInputElement>, weddingId: string) => void;
}

const WeddingsTab: React.FC<Props> = ({
                                          weddings,
                                          newBride, setNewBride,
                                          newGroom, setNewGroom,
                                          newSlug, setNewSlug,
                                          newDate, setNewDate,
                                          onCreateWedding,
                                          onToggle,
                                          onMapUpload,
                                      }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-4 items-end flex-wrap border border-[#F7E7CE]/50">
                <div className="flex-1 min-w-[200px]">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-1 block">Bride</label>
                    <input className="w-full border p-2 rounded-lg" value={newBride} onChange={e => setNewBride(e.target.value)} />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-1 block">Groom</label>
                    <input className="w-full border p-2 rounded-lg" value={newGroom} onChange={e => setNewGroom(e.target.value)} />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-1 block">Slug</label>
                    <input className="w-full border p-2 rounded-lg" value={newSlug} onChange={e => setNewSlug(e.target.value)} />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-1 block">Date</label>
                    <input type="date" className="w-full border p-2 rounded-lg" value={newDate} onChange={e => setNewDate(e.target.value)} />
                </div>
                <button onClick={onCreateWedding} className="bg-[#C9A84C] text-white px-6 py-2.5 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Create
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#F7E7CE]/50">
                <table className="w-full text-left">
                    <thead className="bg-[#F7E7CE]/30 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                        <th className="p-4">Couple</th>
                        <th className="p-4">Slug</th>
                        <th className="p-4">Map</th>
                        <th className="p-4">Seating</th>
                        <th className="p-4">Gallery</th>
                        <th className="p-4">Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {weddings.map(w => (
                        <tr key={w.id} className="border-b last:border-0 border-[#F7E7CE]/50">
                            <td className="p-4 font-medium">{w.bride_name} & {w.groom_name}</td>
                            <td className="p-4 text-gray-500">/{w.slug}</td>
                            <td className="p-4">
                                <label className="cursor-pointer text-[#C9A84C] text-sm hover:underline">
                                    {w.venue_map_url ? 'Update Map' : 'Upload Map'}
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onMapUpload(e, w.id)} />
                                </label>
                            </td>
                            <td className="p-4">
                                <button onClick={() => onToggle(w.id, 'has_seating', w.has_seating)} className={`px-3 py-1 rounded-full text-xs ${w.has_seating ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {w.has_seating ? 'ON' : 'OFF'}
                                </button>
                            </td>
                            <td className="p-4">
                                <button onClick={() => onToggle(w.id, 'has_gallery', w.has_gallery)} className={`px-3 py-1 rounded-full text-xs ${w.has_gallery ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {w.has_gallery ? 'ON' : 'OFF'}
                                </button>
                            </td>
                            <td className="p-4">
                                <button onClick={() => onToggle(w.id, 'is_active', w.is_active)} className={`px-3 py-1 rounded-full text-xs ${w.is_active ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    {w.is_active ? 'ACTIVE' : 'INACTIVE'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeddingsTab;