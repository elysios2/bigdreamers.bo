import React, {
    useEffect,
    useState,
    useRef,
    useMemo,
    RefObject,
} from "react";
import Morfeus from "@/assets/morfeus.webp";
import { fetchNewsBolivia, fetchNewsInternational } from "@/utils/news";
import type { NewsItem } from "@/types/news";

export default function News(): JSX.Element {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [newsBolivia, setNewsBolivia] = useState<NewsItem[]>([]);

    const scrollInternationalRef = useRef<HTMLDivElement>(null);
    const scrollBoliviaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNewsInternational(setNews);
        fetchNewsBolivia(setNewsBolivia);
    }, []);

    const memoNewsBolivia = useMemo<NewsItem[]>(() => newsBolivia, [newsBolivia]);

    const scrollHorizontal = (
        ref: React.RefObject<HTMLDivElement>,
        dir: "left" | "right"
    ): void => {
        if (!ref.current) return;

        const amount = dir === "left" ? -500 : 500;

        ref.current.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };
    
    const cardsAllowedScroll = 4;

    return (
        <div className="py-16 px-4 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Enteraté de las noticias económicas más importantes
            </h2>

            <section className="relative">
                <button
                    onClick={() => scrollHorizontal(scrollInternationalRef, "left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                >
                    ◀
                </button>

                <article
                    ref={scrollInternationalRef}
                    className="flex gap-6 md:overflow-hidden overflow-x-auto px-12 scroll-smooth"
                >
                    {news.map((n) => (
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
                                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 5 }}>
                                    {n.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </article>

                <button
                    onClick={() => scrollHorizontal(scrollInternationalRef, "right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                >
                    ▶
                </button>
            </section>

            
            {
                newsBolivia.length > 0 && (
                    <h2 className="text-3xl md:text-4xl font-bold my-12 text-center">
                        Enteraté de las noticias económicas locales
                    </h2>
                )
            }

            <section className="relative">
                {
                    newsBolivia.length >= cardsAllowedScroll &&(
                        <button
                            onClick={() => scrollHorizontal(scrollBoliviaRef, "left")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                        >
                            ◀
                        </button>
                    )
                }

                <article
                    ref={scrollBoliviaRef}
                    className="flex gap-6 md:overflow-hidden overflow-x-auto px-12 scroll-smooth"
                >
                    {memoNewsBolivia.map((n) => (
                        <a
                            key={n.link}
                            href={n.link}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group max-w-[320px] h-[420px]
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
                                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>
                                    {n.description}
                                </p>
                            </div>
                            <footer className="p-4 flex justify-end">
                                <span className="text-xs">
                                    {n.pubDate}
                                </span>
                            </footer>
                        </a>
                    ))}
                </article>
                
                {
                    newsBolivia.length >= cardsAllowedScroll && (
                        <button
                            onClick={() => scrollHorizontal(scrollBoliviaRef, "right")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-200/40 p-4 rounded-full"
                        >
                            ▶
                        </button>
                    )
                }
            </section>
        </div>
    );
}
