import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface Props {
    uploading: boolean;
    onFileSelect: (files: File[]) => void;
    photoCount: number;
}

const PhotoUpload: React.FC<Props> = ({ uploading, onFileSelect, photoCount }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length) onFileSelect(files);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col items-center mb-12">
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleChange} className="hidden" />
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-[#C9A84C] text-white rounded-full px-8 py-4 font-medium flex items-center gap-3 shadow-md hover:bg-[#b59540] transition-colors disabled:opacity-50"
            >
                {uploading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                    <Upload size={20} />
                )}
                <span>{uploading ? 'Прикачување...' : 'Прикачи фотографии'}</span>
            </button>
            <p className="mt-4 text-sm text-gray-400">Вкупно фотографии: {photoCount}</p>
        </div>
    );
};

export default PhotoUpload;