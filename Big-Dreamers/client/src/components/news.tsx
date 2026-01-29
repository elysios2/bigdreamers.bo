import React, {
    useEffect,
    useState,
    useRef,
    useMemo,
    RefObject,
} from "react";
import Morfeus from "@/assets/morfeus.webp";


interface NewsItem {
    title: string;
    link: string;
    description: string;
    image?: string;
    source: "Bolivia" | "Internacional";
}

interface NewsApiResult {
    title?: string;
    link?: string;
    description?: string;
    image_url?: string;
    country?: string[];
}

interface NewsApiResponse {
    status: string;
    results?: NewsApiResult[];
}

const CACHE_KEY = "economic_news_v3";
const CACHE_TIME = 1000 * 60 * 60;
const API_KEY = import.meta.env.VITE_API_KEY_NEWS;

export default function News(): JSX.Element {
    const [news, setNews] = useState<NewsItem[]>([]);
    const scrollRef: RefObject<HTMLDivElement> =
        useRef<HTMLDivElement>(null);

    const fetchNews = async (): Promise<void> => {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const parsed = JSON.parse(cached) as {
                data: NewsItem[];
                timestamp: number;
            };

            if (Date.now() - parsed.timestamp < CACHE_TIME) {
                setNews(parsed.data);
                return;
            }
        }

        try {
            const url =
                `https://newsdata.io/api/1/latest` +
                `?apikey=${API_KEY}` +
                `&category=business,technology` +
                `&language=es` +
                `&size=10`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data: NewsApiResponse = await res.json();

            if (data.status !== "success" || !Array.isArray(data.results)) {
                throw new Error("Respuesta inválida");
            }

            const map = new Map<string, NewsItem>();

            data.results.forEach((a) => {
                if (!a.link) return;

                if (!map.has(a.link)) {
                    map.set(a.link, {
                        title: a.title ?? "Sin título",
                        link: a.link,
                        description: a.description ?? "Sin descripción",
                        image: a.image_url,
                        source: a.country?.includes("bolivia")
                            ? "Bolivia"
                            : "Internacional",
                    });
                }
            });

            const uniqueNews = Array.from(map.values());

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data: uniqueNews,
                    timestamp: Date.now(),
                })
            );

            setNews(uniqueNews);
        } catch (error) {
            console.error("Error cargando noticias:", error);

            if (cached) {
                const parsed = JSON.parse(cached) as {
                    data: NewsItem[];
                };
                setNews(parsed.data);
            }
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const memoNews = useMemo<NewsItem[]>(() => news, [news]);

    const scroll = (dir: "left" | "right"): void => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -450 : 450,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-16 px-4 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Enteraté de las noticias económicas más importantes
            </h2>

            <div className="relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                >
                    ◀
                </button>

                <article
                    ref={scrollRef}
                    className="flex gap-6 md:overflow-hidden overflow-x-auto px-12 scroll-smooth"
                >
                    {memoNews.map((n) => (
                        <a
                            key={n.link}
                            href={n.link}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group min-w-[320px] h-[420px]
                                shadow-xl
                                flex flex-col rounded-xl overflow-hidden
                                dark:bg-gradient-to-b
                                dark:from-[#3480d2]
                                dark:to-[rgb(36,107,166)]
                            "
                        >
                            {/* Imagen */}
                            <div className="relative h-40 shrink-0">
                                {n.image && (
                                    <img
                                        src={n.image}
                                        alt={n.title}
                                        loading="lazy"
                                        className="
                                            h-full w-full object-cover
                                            transition-transform duration-300
                                            group-hover:scale-105
                                        "
                                    />
                                )}

                                <div className="absolute top-0 left-0 m-3 bg-slate-200 rounded-full">
                                    <img
                                        src={Morfeus}
                                        alt="Morfeus"
                                        className="h-10 w-10 rounded-full"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-5 border border-blue-500 rounded-b-xl flex flex-col flex-1">
                                <span className="text-xs text-yellow-400 uppercase">
                                    {n.source}
                                </span>

                                <h3 className="mt-2 font-semibold text-lg line-clamp-2">
                                    {n.title}
                                </h3>

                                <p className="mt-3 text-sm dark:text-gray-100 text-gray-600 overflow-hidden"
                                style={{display:"-webkit-box", WebkitBoxOrient:"vertical", WebkitLineClamp:5}}>
                                    {n.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </article>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                >
                    ▶
                </button>
            </div>
        </section>
    );
}
