export interface NewsItem {
    title: string;
    link: string;
    description: string;
    image?: string;
    source: "Bolivia | El Deber" | "Internacional";
    pubDate?: string;
}

export interface NewsApiResult {
    title?: string;
    link?: string;
    description?: string;
    image_url?: string;
    country?: string[];
}

export interface NewsApiResponse {
    status: string;
    results?: NewsApiResult[];
}

export interface NewsService {
    saveToCache: (key: string, data: NewsItem[]) => void;
    loadFromCache: (key: string) => NewsItem[] | null;
}
