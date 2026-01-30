import { CACHE_KEY, CACHE_KEY_BOLIVIA, CACHE_TIME, API } from "@/constant/news";
import { LocalStorageService } from "@/services/localStorageService";
import type { NewsApiResponse, NewsApiResult, NewsItem, NewsService } from "@/types/news";

const saveToCache = (service: NewsService, key: string, data: NewsItem[]) => {
    service.saveToCache(key, data);
};

const loadFromCache = (service: NewsService, key: string): NewsItem[] | null => {
    return service.loadFromCache(key);
};

const mapInternationalNews = (results: NewsApiResult[]): NewsItem[] => {
    const map = new Map<string, NewsItem>();

    results.forEach((item) => {
        if (!item.link || (!item.title && !item.description && !item.image_url)) return;

        const key = item.title;
        if (!map.has(key!)) {
            map.set(key!, {
                title: item.title ?? "Noticia Reciente",
                link: item.link!,
                description: item.description ?? "",
                image: item.image_url,
                source: "Internacional",
            });
        }
    });

    return Array.from(map.values());
};

const mapBoliviaNews = (xmlString: string): NewsItem[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const map = new Map<string, NewsItem>();

    xmlDoc.querySelectorAll("item").forEach((item) => {
        const link = item.querySelector("link")?.textContent;
        if (!link || !link.includes("/economia/")) return;

        if (!map.has(link)) {
            map.set(link, {
                title: item.querySelector("title")?.textContent ?? "Noticia Reciente",
                link,
                description: item.querySelector("description")?.textContent ?? "",
                image: item.querySelector("enclosure")?.getAttribute("url") ?? "#",
                source: "Bolivia | El Deber",
                pubDate: item.querySelector("pubDate")?.textContent ?? "",
            });
        }
    });

    return Array.from(map.values());
};

export const fetchNewsInternational = async (setNews: (data: NewsItem[]) => void): Promise<void> => {
    const cached = loadFromCache(LocalStorageService, CACHE_KEY);
    if (cached) {
        setNews(cached);
        return;
    }

    try {
        const url = `${import.meta.env.VITE_NEWS_INTERNATIONAL}?apikey=${API}&category=business,technology&language=es&size=10`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: NewsApiResponse = await res.json();
        if (data.status !== "success" || !Array.isArray(data.results)) throw new Error("Respuesta inválida");

        const uniqueNews = mapInternationalNews(data.results);
        saveToCache(LocalStorageService,CACHE_KEY, uniqueNews);
        setNews(uniqueNews);
    } catch {
        if (cached) setNews(cached);
    }
};

export const fetchNewsBolivia = async (setNewsBolivia: (data: NewsItem[]) => void): Promise<void> => {
    const cached = loadFromCache(LocalStorageService,CACHE_KEY_BOLIVIA);
    if (cached) {
        setNewsBolivia(cached);
        return;
    }

    try {
        const url = `${import.meta.env.VITE_PROXY_NEWS}${encodeURIComponent(import.meta.env.VITE_NEWS_LOCALS)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();
        const uniqueNews = mapBoliviaNews(result.contents);

        saveToCache(LocalStorageService,CACHE_KEY_BOLIVIA, uniqueNews);
        setNewsBolivia(uniqueNews);
    } catch {
        if (cached) setNewsBolivia(cached);
    }
};
