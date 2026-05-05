import React from 'react';
import QRCode from 'react-qr-code';
import { Download } from 'lucide-react';

interface Props {
    id: string;
    label: string;
    url: string;
    downloadName: string;
    onDownload: (id: string, name: string) => void;
}

const QRCodeDisplay: React.FC<Props> = ({ id, label, url, downloadName, onDownload }) => {
    return (
        <div className="flex flex-col items-center p-6 border rounded-xl bg-gray-50">
            <h3 className="font-serif text-xl mb-6">{label}</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 w-48 h-48 overflow-hidden">
                <QRCode id={id} value={url} size={1024} fgColor="#2C2C2C" style={{ width: '100%', height: '100%' }} />
            </div>
            <button onClick={() => onDownload(id, downloadName)} className="flex items-center gap-2 text-[#C9A84C] font-medium">
                <Download size={18} /> Download PNG
            </button>
        </div>
    );
};

export default QRCodeDisplay;