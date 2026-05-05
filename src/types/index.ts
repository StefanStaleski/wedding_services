export interface Wedding {
    id: string;
    slug: string;
    bride_name: string;
    groom_name: string;
    wedding_date: string;
    venue_map_url?: string;
    has_seating: boolean;
    has_gallery: boolean;
    is_active: boolean;
    created_at: string;
}

export interface Guest {
    id: string;
    wedding_id: string;
    guest_name: string;
    table_number: number;
}

export interface Photo {
    id: string;
    wedding_id: string;
    file_url: string;
    uploaded_at: string;
}