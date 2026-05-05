import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import PhotoUpload from "../components/PhotoUpload";
import PhotoGrid from "../components/PhotoGrid";
import { Wedding, Photo } from '../types';
import { toast, Toaster } from 'sonner';
import { getPhotosByWedding, uploadPhoto } from '../services/photoService';
import { getWeddingBySlug } from '../services/weddingService';


const GalleryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const [wedding, setWedding] = useState<Wedding | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            try {
                const wedData = await getWeddingBySlug(slug);
                if (!wedData || !wedData.is_active || !wedData.has_gallery) {
                    setError("Галеријата не е достапна.");
                    return;
                }
                setWedding(wedData);
                const photoData = await getPhotosByWedding(wedData.id);
                setPhotos(photoData);
            } catch (err) {
                setError("Грешка при вчитување на галеријата.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !wedding) return;

        setUploading(true);
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };

            const compressedFile = await imageCompression(file, options);
            const newPhoto = await uploadPhoto(wedding.id, compressedFile);

            if (newPhoto) {
                setPhotos(prev => [newPhoto, ...prev]);
            }
        } catch (err) {
            console.error("Грешка при прикачување:", err);
            toast.error("Настана грешка при прикачувањето на сликата.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
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

    return (
        <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2C2C2C] pb-24">
            <Toaster position="bottom-center" />
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-16">

                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-serif font-light tracking-widest mb-4">
                        {wedding.bride_name} & {wedding.groom_name}
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Галерија</p>
                    <button
                        onClick={() => {
                            navigator.share
                                ? navigator.share({ title: `${wedding.bride_name} & ${wedding.groom_name}`, url: window.location.href })
                                : navigator.clipboard.writeText(window.location.href).then(() => {
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                });
                        }}
                        className={`mt-4 inline-flex items-center gap-2 px-5 py-2 border text-xs uppercase tracking-widest rounded-full transition-colors ${
                            copied
                                ? 'border-green-500 text-green-500'
                                : 'border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white'
                        }`}                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                        Сподели
                    </button>
                </header>

                {/* Upload Action */}
                <PhotoUpload
                    uploading={uploading}
                    photoCount={photos.length}
                    onFileSelect={async (files) => {
                        setUploading(true);
                        try {
                            for (const file of files) {
                                const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
                                const newPhoto = await uploadPhoto(wedding.id, compressed);
                                if (newPhoto) setPhotos(prev => [newPhoto, ...prev]);
                            }
                        } catch (err) {
                            toast.error("Настана грешка при прикачувањето на сликата.");
                        } finally {
                            setUploading(false);
                        }
                    }}
                />

                {/* Masonry Grid */}
                <PhotoGrid photos={photos} />
        </div>
        </div>
    );
};

export default GalleryPage;