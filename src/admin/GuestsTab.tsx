import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { Wedding } from '../types';

interface Props {
    weddings: Wedding[];
    selectedWeddingId: string;
    setSelectedWeddingId: (id: string) => void;
    csvPreview: { guest_name: string; table_number: number }[];
    setCsvPreview: (data: { guest_name: string; table_number: number }[]) => void;
    uploadingGuests: boolean;
    existingGuests: { guest_name: string; table_number: number }[];
    onCSVUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmUpload: () => void;
}

const GuestsTab: React.FC<Props> = ({
                                        weddings,
                                        selectedWeddingId,
                                        setSelectedWeddingId,
                                        csvPreview,
                                        setCsvPreview,
                                        uploadingGuests,
                                        existingGuests,
                                        onCSVUpload,
                                        onConfirmUpload,
                                    }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F7E7CE]/50 max-w-2xl">
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Select Wedding</label>
            <select
                className="w-full border p-3 rounded-lg mb-6 outline-none focus:border-[#C9A84C]"
                value={selectedWeddingId}
                onChange={(e) => setSelectedWeddingId(e.target.value)}
            >
                {weddings.map(w => <option key={w.id} value={w.id}>{w.bride_name} & {w.groom_name}</option>)}
            </select>

            <div className="border-2 border-dashed border-[#F7E7CE] rounded-2xl p-8 text-center mb-6">
                <label className="cursor-pointer flex flex-col items-center">
                    <Upload size={32} className="text-[#C9A84C] mb-4" />
                    <span className="font-medium">Upload CSV File</span>
                    <span className="text-xs text-gray-400 mt-2">Format: guest_name, table_number</span>
                    <input type="file" accept=".csv" className="hidden" onChange={onCSVUpload} />
                </label>
            </div>

            {csvPreview.length > 0 && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif text-xl">Preview ({csvPreview.length} guests)</h3>
                        <div className="flex gap-2">
                            <button onClick={() => setCsvPreview([])} className="p-2 text-gray-400 hover:text-red-500">
                                <Trash2 size={20} />
                            </button>
                            <button onClick={onConfirmUpload} disabled={uploadingGuests} className="bg-[#C9A84C] text-white px-4 py-2 rounded-lg">
                                {uploadingGuests ? 'Uploading...' : 'Confirm Upload'}
                            </button>
                        </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr><th className="p-2">Name</th><th className="p-2">Table</th></tr>
                            </thead>
                            <tbody>
                            {csvPreview.map((g, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{g.guest_name}</td>
                                    <td className="p-2">{g.table_number}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {existingGuests.length > 0 && csvPreview.length === 0 && (
                <div>
                    <h3 className="font-serif text-xl mb-4">Current Guests ({existingGuests.length})</h3>
                    <div className="max-h-64 overflow-y-auto border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr><th className="p-2">Name</th><th className="p-2">Table</th></tr>
                            </thead>
                            <tbody>
                            {existingGuests.map((g, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{g.guest_name}</td>
                                    <td className="p-2">{g.table_number}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestsTab;