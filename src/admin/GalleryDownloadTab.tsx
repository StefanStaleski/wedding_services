// src/admin/GalleryDownloadTab.tsx
import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Wedding, Photo } from '../types';
import { supabase } from '../services/supabase';

type Props = {
    weddings: Wedding[];
    selectedWeddingId: string;
    setSelectedWeddingId: (id: string) => void;
};

const GalleryDownloadTab: React.FC<Props> = ({
                                                 weddings,
                                                 selectedWeddingId,
                                                 setSelectedWeddingId,
                                             }) => {
    const [loading, setLoading] = useState(false);

    const selectedWedding = weddings.find(w => w.id === selectedWeddingId);

    const handleDownloadZip = async () => {
        if (!selectedWedding) return;

        setLoading(true);
        try {
            const { data: photos, error } = await supabase
                .from('photos')
                .select('file_url, uploaded_at')
                .eq('wedding_id', selectedWedding.id)
                .order('uploaded_at', { ascending: true });

            if (error) throw error;
            if (!photos || photos.length === 0) {
                alert('No photos found for this wedding.');
                return;
            }

            const zip = new JSZip();
            const folder = zip.folder(selectedWedding.slug || 'gallery');

            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i];
                const response = await fetch(photo.file_url);
                if (!response.ok) throw new Error(`Failed to fetch photo ${i + 1}`);

                const blob = await response.blob();
                const ext = blob.type.includes('png')
                    ? 'png'
                    : blob.type.includes('webp')
                        ? 'webp'
                        : 'jpg';

                folder?.file(`photo-${String(i + 1).padStart(3, '0')}.${ext}`, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, `${selectedWedding.slug}-gallery.zip`);
        } catch (err) {
            console.error(err);
            alert('Failed to download gallery zip.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-serif text-[#C9A84C] mb-4">
                Gallery Download
            </h2>

            <label className="block mb-4">
                <span className="block mb-2 font-medium">Select wedding</span>
                <select
                    value={selectedWeddingId}
                    onChange={(e) => setSelectedWeddingId(e.target.value)}
                    className="w-full rounded-lg border px-4 py-3"
                >
                    <option value="">Choose a wedding</option>
                    {weddings.map(w => (
                        <option key={w.id} value={w.id}>
                            {w.bride_name} & {w.groom_name} ({w.slug})
                        </option>
                    ))}
                </select>
            </label>

            <button
                onClick={handleDownloadZip}
                disabled={!selectedWeddingId || loading}
                className="px-5 py-3 rounded-lg bg-[#C9A84C] text-white font-medium disabled:opacity-50"
            >
                {loading ? 'Preparing ZIP...' : 'Download all photos as ZIP'}
            </button>

            {selectedWedding && (
                <p className="mt-3 text-sm text-gray-600">
                    ZIP name: <strong>{selectedWedding.slug}-gallery.zip</strong>
                </p>
            )}
        </div>
    );
};

export default GalleryDownloadTab;