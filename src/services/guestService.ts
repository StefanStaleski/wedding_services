import { supabase } from './supabase';
import { Guest } from '../types';

const latinToCyrillic: Record<string, string> = {
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е',
    'z': 'з', 'i': 'и', 'j': 'ј', 'k': 'к', 'l': 'л', 'm': 'м',
    'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
    'u': 'у', 'f': 'ф', 'h': 'х', 'c': 'ц', 'q': 'љ', 'w': 'њ',
    'x': 'џ', 'y': 'ѕ',
};

export const transliterate = (input: string): string => {
    return input.toLowerCase().split('').map(c => latinToCyrillic[c] || c).join('');
};

export const searchGuests = async (weddingId: string, name: string): Promise<Guest[]> => {
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('wedding_id', weddingId)
        .ilike('guest_name', `%${name}%`);

    if (error) return [];
    return data || [];
};

export const bulkInsertGuests = async (guests: Omit<Guest, 'id'>[]): Promise<boolean> => {
    const { error } = await supabase.from('guests').insert(guests);
    return !error;
};

export const deleteGuestsByWedding = async (weddingId: string): Promise<boolean> => {
    const { error } = await supabase.from('guests').delete().eq('wedding_id', weddingId);
    return !error;
};