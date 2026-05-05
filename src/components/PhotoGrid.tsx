import React, { useState } from 'react';
import { X, ImageIcon } from 'lucide-react';
import { Photo } from '../types';

interface Props {
    photos: Photo[];
}

const PhotoGrid: React.FC<Props> = ({ photos }) => {
    const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

    if (photos.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-[#F7E7CE]/50">
                <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-light">Галеријата е празна. Бидете први кои ќе споделат момент!</p>
            </div>
        );
    }

    return (
        <>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {photos.map(photo => (
                    <img
                        key={photo.id}
                        src={photo.file_url}
                        alt="Wedding moment"
                        className="w-full rounded-2xl cursor-pointer hover:opacity-90 transition-opacity bg-gray-100"
                        onClick={() => setLightboxPhoto(photo.file_url)}
                        loading="lazy"
                    />
                ))}
            </div>

            {lightboxPhoto && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                    <button onClick={() => setLightboxPhoto(null)} className="absolute top-6 right-6 text-white/70 hover:text-white">
                        <X size={32} />
                    </button>
                    <img
                        src={lightboxPhoto}
                        alt="Fullscreen moment"
                        className="max-w-full max-h-[90vh] rounded-lg object-contain"
                    />
                </div>
            )}
        </>
    );
};

export default PhotoGrid;