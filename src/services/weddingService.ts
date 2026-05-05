import { supabase } from './supabase';
import { Wedding } from '../types';

export const getWeddingBySlug = async (slug: string): Promise<Wedding | null> => {
    const { data, error } = await supabase
        .from('weddings')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) return null;
    return data;
};

export const getAllWeddings = async (): Promise<Wedding[]> => {
    const { data, error } = await supabase
        .from('weddings')
        .select('*')
        .order('wedding_date', { ascending: false });

    if (error) return [];
    return data || [];
};

export const createWedding = async (wedding: Omit<Wedding, 'id' | 'created_at'>): Promise<Wedding | null> => {
    const { data, error } = await supabase
        .from('weddings')
        .insert(wedding)
        .select()
        .single();

    if (error) { console.error(error); return null; }
    return data;
};

export const updateWedding = async (id: string, updates: Partial<Wedding>): Promise<boolean> => {
    const { error } = await supabase
        .from('weddings')
        .update(updates)
        .eq('id', id);

    return !error;
};