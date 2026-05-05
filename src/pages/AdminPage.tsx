import React, { useState, useEffect } from 'react';
import { Upload as UploadIcon, Users as UsersIcon, QrCode as QrIcon, Download as DownloadIcon } from 'lucide-react';
import { Wedding } from '../types';
import { toast, Toaster } from 'sonner';
import { getAllWeddings, createWedding, updateWedding } from '../services/weddingService';
import { bulkInsertGuests, deleteGuestsByWedding } from '../services/guestService';
import { supabase } from '../services/supabase';
import WeddingsTab from '../admin/WeddingsTab';
import GuestsTab from '../admin/GuestsTab';
import QRCodesTab from '../admin/QRCodesTab';
import GalleryDownloadTab from '../admin/GalleryDownloadTab';

type Tab = 'weddings' | 'guests' | 'qrcodes' | 'gallerydownload';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('weddings');
    const [weddings, setWeddings] = useState<Wedding[]>([]);
    const [selectedWeddingId, setSelectedWeddingId] = useState<string>('');
    const [existingGuests, setExistingGuests] = useState<{ guest_name: string; table_number: number }[]>([]);

    // Weddings state
    const [newBride, setNewBride] = useState('');
    const [newGroom, setNewGroom] = useState('');
    const [newSlug, setNewSlug] = useState('');
    const [newDate, setNewDate] = useState('');

    // Guests state
    const [csvPreview, setCsvPreview] = useState<{ guest_name: string; table_number: number }[]>([]);
    const [uploadingGuests, setUploadingGuests] = useState(false);

    useEffect(() => {
        fetchWeddings();
    }, []);

    useEffect(() => {
        const loadGuests = async () => {
            if (!selectedWeddingId) return;
            const { data } = await supabase
                .from('guests')
                .select('guest_name, table_number')
                .eq('wedding_id', selectedWeddingId)
                .order('table_number');
            setExistingGuests(data || []);
        };
        loadGuests();
    }, [selectedWeddingId]);

    const fetchWeddings = async () => {
        const data = await getAllWeddings();
        setWeddings(data);
        if (data.length > 0 && !selectedWeddingId) {
            setSelectedWeddingId(data[0].id);
        }
    };

    const handleCreateWedding = async () => {
        if (!newBride || !newGroom || !newSlug || !newDate) return toast.error('Fill all fields');
        const created = await createWedding({
            bride_name: newBride, groom_name: newGroom, slug: newSlug, wedding_date: newDate,
            has_seating: true, has_gallery: true, is_active: true,
        });
        if (created) {
            setNewBride(''); setNewGroom(''); setNewSlug(''); setNewDate('');
            fetchWeddings();
        }
    };

    const handleToggle = async (id: string, field: 'has_seating' | 'has_gallery' | 'is_active', currentVal: boolean) => {
        await updateWedding(id, { [field]: !currentVal });
        fetchWeddings();
    };

    const handleMapUpload = async (e: React.ChangeEvent<HTMLInputElement>, weddingId: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fileExt = file.name.split('.').pop();
        const filePath = `${weddingId}-map.${fileExt}`;
        try {
            const { error: uploadError } = await supabase.storage.from('venue-maps').upload(filePath, file, { upsert: true });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('venue-maps').getPublicUrl(filePath);
            await updateWedding(weddingId, { venue_map_url: publicUrl });
            fetchWeddings();
            toast.success('Map uploaded!');
        } catch (error) {
            console.error(error);
            toast.error('Upload failed.');
        }
    };

    const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const lines = text.split('\n');
            const parsed = lines.slice(1).map(line => {
                const [name, table] = line.split(',');
                return { guest_name: name?.trim(), table_number: parseInt(table?.trim()) };
            }).filter(g => g.guest_name && !isNaN(g.table_number));
            setCsvPreview(parsed);
        };
        reader.readAsText(file);
    };

    const confirmGuestUpload = async () => {
        if (!selectedWeddingId || csvPreview.length === 0) return;
        setUploadingGuests(true);
        await deleteGuestsByWedding(selectedWeddingId);
        const payload = csvPreview.map(g => ({ ...g, wedding_id: selectedWeddingId }));
        const success = await bulkInsertGuests(payload);
        setUploadingGuests(false);
        if (success) {
            toast.success('Guests updated successfully!');
            setCsvPreview([]);
        } else {
            toast.error('Failed to insert guests.');
        }
    };

    const downloadQR = (id: string, name: string) => {
        const svg = document.getElementById(id) as any;
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width; canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `${name}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    const selectedWedding = weddings.find(w => w.id === selectedWeddingId);
    const baseUrl = window.location.origin;

    return (
        <div className="min-h-screen bg-[#FDFAF5] font-sans text-[#2C2C2C] p-6">
            <Toaster position="bottom-center" richColors />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-serif mb-8 text-[#C9A84C]">Мигови Администрација</h1>

                <div className="flex gap-4 mb-8">
                    <button onClick={() => setActiveTab('weddings')}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'weddings' ? 'bg-[#C9A84C] text-white' : 'bg-white shadow-sm'}`}>
                        <UsersIcon size={18}/> Weddings
                    </button>
                    <button onClick={() => setActiveTab('guests')}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'guests' ? 'bg-[#C9A84C] text-white' : 'bg-white shadow-sm'}`}>
                        <UploadIcon size={18}/> Guests
                    </button>
                    <button onClick={() => setActiveTab('qrcodes')}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'qrcodes' ? 'bg-[#C9A84C] text-white' : 'bg-white shadow-sm'}`}>
                        <QrIcon size={18}/> QR Codes
                    </button>
                    <button onClick={() => setActiveTab('gallerydownload')}
                        className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'gallerydownload' ? 'bg-[#C9A84C] text-white' : 'bg-white shadow-sm'}`}>
                        <DownloadIcon size={18} /> Gallery Download
                    </button>
                </div>

                {activeTab === 'weddings' && (
                    <WeddingsTab
                        weddings={weddings}
                        newBride={newBride} setNewBride={setNewBride}
                        newGroom={newGroom} setNewGroom={setNewGroom}
                        newSlug={newSlug} setNewSlug={setNewSlug}
                        newDate={newDate} setNewDate={setNewDate}
                        onCreateWedding={handleCreateWedding}
                        onToggle={handleToggle}
                        onMapUpload={handleMapUpload}
                    />
                )}

                {activeTab === 'guests' && (
                    <GuestsTab
                        weddings={weddings}
                        selectedWeddingId={selectedWeddingId}
                        setSelectedWeddingId={setSelectedWeddingId}
                        csvPreview={csvPreview}
                        setCsvPreview={setCsvPreview}
                        uploadingGuests={uploadingGuests}
                        existingGuests={existingGuests}
                        onCSVUpload={handleCSVUpload}
                        onConfirmUpload={confirmGuestUpload}
                    />
                )}

                {activeTab === 'qrcodes' && (
                    <QRCodesTab
                        weddings={weddings}
                        selectedWeddingId={selectedWeddingId}
                        setSelectedWeddingId={setSelectedWeddingId}
                        selectedWedding={selectedWedding}
                        baseUrl={baseUrl}
                        onDownloadQR={downloadQR}
                    />
                )}

                {activeTab === 'gallerydownload' && (
                    <GalleryDownloadTab
                        weddings={weddings}
                        selectedWeddingId={selectedWeddingId}
                        setSelectedWeddingId={setSelectedWeddingId}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;