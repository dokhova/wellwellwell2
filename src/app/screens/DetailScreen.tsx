import challengeImg from "@/imports/challenge-opt.jpg";
import type { Screen } from "@/app/types";
import { eventMeta } from "@/app/data/plans";
import { UNSPLASH } from "@/app/data/constants";
import { EventDetailScreen } from "@/app/screens/EventDetailScreen";

export function DetailScreen({ onNavigate, backTo }: { onNavigate: (s: Screen) => void; backTo: Screen }) {
  return (
    <EventDetailScreen
      title="Челлендж: Вечерний цифровой детокс"
      coverSrc={challengeImg}
      authorName="Гена Лохтин"
      authorAvatarUrl={UNSPLASH.avatarGena}
      authorVerified
      badgeDate="22 июня 2026"
      paragraphs={articleBodies[3]}
      meta={eventMeta[0]}
      onBack={() => onNavigate(backTo)}
      onProfile={() => onNavigate("profile")}
    />
  );
}

// ─── Screen: Article Detail ───────────────────────────────────────────────────
