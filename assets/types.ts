export interface User {
    name: string;
    userId: string;
    email: string;
}
export interface Object {
    _id: string;
    created_by: string; // Référence à l'ID d'un utilisateur
    type: 'found' | 'lost';
    title: string;
    description: string;
    photo_url: string
    contact_info: string
    latitude: number;
    longitude: number;
    created_at: Date; // Par défaut: Date.now
    updated_at?: Date;
}