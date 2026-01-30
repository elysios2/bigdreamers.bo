import { CACHE_TIME } from '@/constant/news';
import type { NewsItem } from '@/types/news';

export const LocalStorageService = {

    saveToCache(key: string, data: NewsItem[]): void {
        localStorage.setItem(
            key,
            JSON.stringify({ data, timestamp: Date.now() })
        );
    },

    loadFromCache(key: string): NewsItem[] | null {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        try {
            const parsed = JSON.parse(cached) as {
                data: NewsItem[];
                timestamp: number;
            };

            if (Date.now() - parsed.timestamp < CACHE_TIME) {
                return parsed.data;
            }
        } catch {
            return null;
        }

        return null;
    }
}
