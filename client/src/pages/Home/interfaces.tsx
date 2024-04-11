interface Coordinates {
    longitude: number;
    latitude: number;
}

interface Attributes {
    external_id: string;
    magnitude: number;
    place: string;
    time: number;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: Coordinates;
}

interface Links {
    external_url: string;
}

export interface Feature {
    id: number;
    type: string;
    attributes: Attributes;
    links: Links;
}

interface Pagination {
    current_page: number;
    total: number;
    per_page: number;
}

export interface EarthquakeResponse {
    data: Feature[];
    pagination: Pagination;
}