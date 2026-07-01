import { useState } from "react";
import { ArrowLeft, MoreVertical, Search, X } from "lucide-react";
import type { Article } from "@/app/types";
import { articles } from "@/app/data/articles";
import { GREEN } from "@/app/data/constants";

function AuthorAvatar({ article, size = 28 }: { article: Article; size?: number }) {
  if (article.avatarBrand) {
    return (
      <div
        className="rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white"
        style={{ width: size, height: size, backgroundColor: GREEN, fontSize: size * 0.45 }}
      >
        w
      </div>
    );
  }
  if (article.avatarUrl) {
    return (
      <img
        src={article.avatarUrl}
        alt={article.author}
        className="rounded-full flex-shrink-0 object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: GREEN }}
    />
  );
}

function ArticleCard({
  article,
  onPress,
}: {
  article: Article;
  onPress?: () => void;
}) {
  const coverSrc = article.coverUrl;

  return (
    <div
      onClick={onPress}
      className="mx-4 rounded-[20px] p-4 active:opacity-90 cursor-pointer"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="flex gap-3 items-start">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[13px] text-gray-500 leading-snug line-clamp-2 mb-4">
            {article.excerpt}
          </p>

          {/* Author row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AuthorAvatar article={article} size={28} />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-semibold text-gray-800">
                    {article.author}
                  </span>
                  {article.authorVerified && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="#1D9BF0" />
                      <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">{article.readTime}</p>
              </div>
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 flex items-center justify-center text-gray-400 rounded-full hover:bg-gray-200"
            >
              <MoreVertical size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Cover image */}
        <div className="flex-shrink-0">
          {coverSrc ? (
            <img
              src={coverSrc as string}
              alt={article.title}
              className="rounded-xl object-cover"
              style={{ width: 100, height: 110 }}
            />
          ) : (
            <div
              className="rounded-xl bg-gray-200"
              style={{ width: 100, height: 110 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export function SearchScreen({ onBack, onArticle }: { onBack: () => void; onArticle: (a: Article) => void }) {
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.author.toLowerCase().includes(query.toLowerCase())
      )
    : articles;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F0F1F3" }}>
      <div className="bg-white px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex-shrink-0">
            <ArrowLeft size={22} strokeWidth={2} color="#374151" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2.5">
            <Search size={16} strokeWidth={1.8} color="#9CA3AF" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск материалов..."
              className="flex-1 text-[15px] bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={15} strokeWidth={2} color="#9CA3AF" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3 space-y-3">
        {results.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onPress={() => onArticle(article)}
          />
        ))}
        {results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Search size={32} strokeWidth={1.5} color="#D1D5DB" />
            <p className="text-[14px] text-gray-400">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
