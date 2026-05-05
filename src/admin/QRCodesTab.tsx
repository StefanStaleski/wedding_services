import React from 'react';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { Wedding } from '../types';

interface Props {
    weddings: Wedding[];
    selectedWeddingId: string;
    setSelectedWeddingId: (id: string) => void;
    selectedWedding: Wedding | undefined;
    baseUrl: string;
    onDownloadQR: (id: string, name: string) => void;
}

const QRCodesTab: React.FC<Props> = ({
                                         weddings,
                                         selectedWeddingId,
                                         setSelectedWeddingId,
                                         selectedWedding,
                                         baseUrl,
                                         onDownloadQR,
                                     }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F7E7CE]/50">
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Select Wedding</label>
            <select
                className="w-full max-w-md border p-3 rounded-lg mb-8 outline-none focus:border-[#C9A84C]"
                value={selectedWeddingId}
                onChange={(e) => setSelectedWeddingId(e.target.value)}
            >
                {weddings.map(w => <option key={w.id} value={w.id}>{w.bride_name} & {w.groom_name}</option>)}
            </select>

            {selectedWedding && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
                    <QRCodeDisplay
                        id="qr-seating"
                        label="Seating Layout"
                        url={`${baseUrl}/${selectedWedding.slug}`}
                        downloadName={`${selectedWedding.slug}-seating`}
                        onDownload={onDownloadQR}
                    />
                    <QRCodeDisplay
                        id="qr-gallery"
                        label="Photo Gallery"
                        url={`${baseUrl}/${selectedWedding.slug}/gallery`}
                        downloadName={`${selectedWedding.slug}-gallery`}
                        onDownload={onDownloadQR}
                    />
                </div>
            )}
        </div>
    );
};

export default QRCodesTab;