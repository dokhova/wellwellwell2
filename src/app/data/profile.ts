import cover1 from "@/imports/cover1-opt.jpg";
import cover2 from "@/imports/cover2-opt.jpg";
import cover3 from "@/imports/cover3-opt.jpg";
import cover4 from "@/imports/cover4-opt.jpg";
import expertPhoto from "@/imports/photo_443373052130078088_c.jpg";
import { P_AVATARS, UNSPLASH } from "@/app/data/constants";
import { homeFeedPlans, normalizePlanTag } from "@/app/data/plans";
import type { PlanTag } from "@/app/types";

export const habits = [
  { icon: "🌅", name: "Утренняя зарядка", done: 7, total: 7, streak: 14 },
  { icon: "📖", name: "Чтение 20 минут", done: 5, total: 7, streak: 5 },
  { icon: "🧘", name: "Медитация", done: 4, total: 7, streak: 4 },
  { icon: "📵", name: "Без гаджетов до 9 утра", done: 6, total: 7, streak: 9 },
];

export const myEvents = [
  { id: 3, title: "Челлендж: Вечерний детокс", date: "22 июня 2026", cover: cover2 as unknown as string },
  { id: 2, title: "Программа весенней подготовки", date: "5 июля 2026", cover: cover3 as unknown as string },
  { id: 4, title: "Полумарафон", date: "15 сентября 2026", cover: cover1 as unknown as string },
];

export const myArticles = [
  { id: 3, title: "Челлендж: Вечерний цифровой детокс", readTime: "8 мин чтения", cover: cover2 as unknown as string },
  { id: 1, title: "Well Well Well — качалка привычек", readTime: "2 мин чтения", cover: cover4 as unknown as string },
];

export const subscriptionAvatars = [
  UNSPLASH.avatarMaria,
  UNSPLASH.avatarGena,
  UNSPLASH.avatarDmitry,
  P_AVATARS.w2,
  P_AVATARS.m1,
];

export interface ExpertConnection {
  id: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
}

export interface ExpertProfilePlan {
  id: number;
  title: string;
  axis: "Движение" | "Восстановление" | "Развитие";
  weeksCount: number | null;
  participantsCount: number;
  coverUrl?: string;
  gradient?: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  followersCount: number;
  followingCount: number;
  isFollowedByMe: boolean;
  isMe: boolean;
}

export const profileFollowers: ExpertConnection[] = [
  { id: "maria", name: "Мария Нестерова", avatarUrl: UNSPLASH.avatarMaria, isFollowedByMe: true },
  { id: "dmitry", name: "Дмитрий Савин", avatarUrl: UNSPLASH.avatarDmitry, isFollowedByMe: false },
  { id: "anna", name: "Анна Романова", avatarUrl: P_AVATARS.w2, isFollowedByMe: false },
  { id: "kirill", name: "Кирилл Волков", avatarUrl: P_AVATARS.m1, isFollowedByMe: true },
];

export const profileFollowing: ExpertConnection[] = [
  { id: "gena", name: "Гена Лохтин", avatarUrl: UNSPLASH.avatarGena, isFollowedByMe: true },
  { id: "olga", name: "Ольга Миронова", avatarUrl: P_AVATARS.w1, isFollowedByMe: true },
  { id: "ilya", name: "Илья Гордеев", avatarUrl: P_AVATARS.m3, isFollowedByMe: false },
];

const tagAxis: Record<PlanTag, ExpertProfilePlan["axis"]> = {
  running: "Движение",
  cycling: "Движение",
  yoga: "Развитие",
  recovery: "Восстановление",
  other: "Развитие",
};

const getWeeksCount = (duration?: string) => {
  if (!duration) return null;
  const weeksMatch = duration.match(/(\d+)\s*нед/);
  if (weeksMatch) return Number.parseInt(weeksMatch[1], 10);
  const daysMatch = duration.match(/(\d+)\s*(дн|день|дня|дней)/);
  if (daysMatch) return Math.max(1, Math.ceil(Number.parseInt(daysMatch[1], 10) / 7));
  return null;
};

const getParticipantsCount = (label: string, fallback: number) => {
  const parsed = Number.parseInt(label, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const expertPlans: ExpertProfilePlan[] = homeFeedPlans
  .filter((plan) => plan.author.name === "Гена Лохтин")
  .slice(0, 4)
  .map((plan) => ({
    id: plan.id,
    title: plan.isChallenge ? `Челлендж: ${plan.title}` : plan.title,
    axis: tagAxis[normalizePlanTag(plan.tag)],
    weeksCount: getWeeksCount(plan.duration),
    participantsCount: getParticipantsCount(plan.participantsLabel, plan.participants.length),
    coverUrl: plan.coverUrl,
    gradient: plan.gradient,
  }));

export const expertProfile: ExpertProfile = {
  id: "gena",
  name: "Гена Лохтин",
  bio: "Тренер по бегу и устойчивым привычкам. Собирает понятные планы для тех, кто хочет начать без перегруза и держать ритм.",
  photoUrl: expertPhoto as unknown as string,
  followersCount: profileFollowers.length,
  followingCount: profileFollowing.length,
  isFollowedByMe: false,
  isMe: false,
};
