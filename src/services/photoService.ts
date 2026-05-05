import { supabase } from './supabase';
import { Photo } from '../types';
import imageCompression from 'browser-image-compression';

export const uploadPhoto = async (weddingId: string, file: File): Promise<Photo | null> => {
    // Compress before uploading
    const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    });

    const filename = `${weddingId}/${Date.now()}-${file.name}`;

    // Upload directly to Supabase storage
    const { error: uploadError } = await supabase.storage
        .from('wedding-photos')
        .upload(filename, compressed);

    if (uploadError) return null;

    const { data: urlData } = supabase.storage
        .from('wedding-photos')
        .getPublicUrl(filename);

    // Save record to photos table
    const { data, error } = await supabase
        .from('photos')
        .insert({ wedding_id: weddingId, file_url: urlData.publicUrl })
        .select()
        .single();

    if (error) return null;
    return data;
};

export const getPhotosByWedding = async (weddingId: string): Promise<Photo[]> => {
    const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('uploaded_at', { ascending: false });

    if (error) return [];
    return data || [];
};