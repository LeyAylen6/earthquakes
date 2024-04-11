type Color = "primary" | "secondary" | undefined

export interface DetailItem {
    ubication: string | number | boolean,
    title: string
    color: Color
}

export interface Comment {
    id: number;
    feature_id: number;
    body: string;
    created_at: string;
    updated_at: string;
}