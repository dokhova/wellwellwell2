import planSeed1 from "@/imports/plan-seed-1.png";
import planSeed2 from "@/imports/plan-seed-2.png";
import planSeed3 from "@/imports/plan-seed-3.png";
import planSeed4 from "@/imports/plan-seed-4.png";
import planSeed5 from "@/imports/plan-seed-5.png";
import planSeed6 from "@/imports/plan-seed-6.png";
import planSeed7 from "@/imports/plan-seed-7.png";
import planSeed8 from "@/imports/plan-seed-8.png";
import planSeed9 from "@/imports/plan-seed-9.png";
import planSeed10 from "@/imports/plan-seed-10.png";
import { PLAN_TAGS } from "@/app/types";
import type { EventMeta, HomeFeedPlan, PlanTag, TagFilter } from "@/app/types";
export { PLAN_TAGS };
import { P_AVATARS, UNSPLASH } from "@/app/data/constants";

export const PLAN_TAG_LABELS: Record<PlanTag, string> = {
  running: "Бег",
  cycling: "Велоспорт",
  yoga: "Йога",
  recovery: "Восстановление",
  other: "Другое",
};

export const DEFAULT_PLAN_AUTHOR = {
  name: "Гена Лохтин",
  avatarUrl: UNSPLASH.avatarGena,
};

export const DEFAULT_PLAN_PARTICIPANTS = [
  UNSPLASH.avatarMaria,
  P_AVATARS.m1,
  P_AVATARS.w1,
  P_AVATARS.m2,
  P_AVATARS.w2,
  P_AVATARS.m3,
];

export const PLAN_TAG_GRADIENTS: Record<PlanTag, string> = {
  running: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
  cycling: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
  yoga: "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
  recovery: "linear-gradient(135deg, var(--muted-foreground) 0%, var(--primary) 100%)",
  other: "linear-gradient(135deg, var(--accent) 0%, var(--muted-foreground) 100%)",
};

export const homeFeedPlans: HomeFeedPlan[] = [
  {
    id: 1,
    tag: "running",
    isChallenge: true,
    format: "offline",
    duration: "21 день",
    title: "21 день бега",
    description: "21 день подряд выходишь на пробежку, минимум 10 минут. Цель не результат, а закрепить привычку бегать. Пропустил день — счёт с начала.",
    habit: { title: "Ежедневная пробежка", durationMin: 15 },
    coverUrl: planSeed1 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 2, 3, 4, 5, 6, 7], repeat: { type: "days", days: 21 } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 21 день",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/1",
  },
  {
    id: 2,
    tag: "recovery",
    isChallenge: true,
    format: "online",
    duration: "14 дней",
    title: "14 дней без смартфона перед сном",
    description: "14 вечеров убираешь телефон за час до сна. Экран вечером бьёт по мелатонину и сдвигает засыпание. Отбой для гаджетов в 21:00.",
    habit: { title: "Отбой для гаджетов", durationMin: 60 },
    coverUrl: planSeed2 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.recovery,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "evening", weekdays: [1, 2, 3, 4, 5, 6, 7], repeat: { type: "days", days: 21 } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Вечер · 14 дней",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/2",
  },
  {
    id: 3,
    tag: "running",
    format: "offline",
    duration: "8 недель",
    title: "5 км с нуля",
    description: "8 недель, 3 пробежки в неделю. Старт с лёгкого бега 2,4 км в разговорном темпе, каждую неделю дистанция растёт. К 7 неделе бежишь 4,8 км, на 8 неделе контрольный забег 5 км. Между пробежками дни восстановления и ходьба.",
    habit: { title: "Беговая тренировка", durationMin: 30 },
    coverUrl: planSeed3 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 5], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 8 недель",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/3",
  },
  {
    id: 4,
    tag: "running",
    format: "offline",
    duration: "8 недель",
    title: "8 км",
    description: "8 недель, 3 беговых дня плюс короткая силовая. Лёгкий бег, силовая и длительный бег, который растёт с 3,2 км до 7,3 км. На 8 неделе забег 8 км.",
    habit: { title: "Беговая тренировка + силовая", durationMin: 40 },
    coverUrl: planSeed4 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 5], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 8 недель",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/4",
  },
  {
    id: 5,
    tag: "running",
    format: "offline",
    duration: "8 недель",
    title: "10 км",
    description: "8 недель, 3 пробежки в неделю: две лёгкие и одна длительная. Длительный бег растёт с 4,8 км до 8,9 км, на 8 неделе забег 10 км.",
    habit: { title: "Беговая тренировка", durationMin: 45 },
    coverUrl: planSeed5 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 5], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 8 недель",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/5",
  },
  {
    id: 6,
    tag: "running",
    format: "offline",
    duration: "12 недель",
    title: "Полумарафон",
    description: "12 недель, 3 пробежки в неделю: лёгкий, темповый и длинный бег. Длинная пробежка растёт с 6,4 км до 19,3 км, по дороге контрольные забеги 5 и 10 км. Финал на 12 неделе — полумарафон 21,1 км.",
    habit: { title: "Беговая тренировка", durationMin: 60 },
    coverUrl: planSeed6 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 6], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 12 недель",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/6",
  },
  {
    id: 7,
    tag: "running",
    format: "offline",
    duration: "10 недель",
    title: "Весенняя подготовка",
    description: "10 недель для тех, кто уже бегает. Чередуешь силовую, интервалы и длительный бег. Длительный растёт с 50 до 90 минут, темповые и интервалы добавляют скорость. Разгоняет форму к сезону стартов.",
    habit: { title: "Беговая тренировка", durationMin: 50 },
    coverUrl: planSeed7 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.running,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 5], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 10 недель",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/7",
  },
  {
    id: 8,
    tag: "cycling",
    format: "offline",
    duration: "Бессрочно",
    title: "Велосипед с нуля",
    description: "Спокойные выезды на низком пульсе набирают базу выносливости без перегруза суставов. 3 выезда в неделю по 45 минут в темпе, на котором можешь говорить.",
    habit: { title: "Лёгкий выезд", durationMin: 45 },
    coverUrl: planSeed8 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.cycling,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "day", weekdays: [1, 3, 5], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "День · Бессрочно",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/8",
  },
  {
    id: 9,
    tag: "cycling",
    format: "offline",
    duration: "Бессрочно",
    title: "Длинные дистанции на велосипеде",
    description: "Один длинный выезд в неделю растит выносливость для дальних маршрутов. Темп спокойный, главное — время в седле.",
    habit: { title: "Длинный выезд", durationMin: 90 },
    coverUrl: planSeed9 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.cycling,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "day", weekdays: [7], repeat: { type: "weekly" } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "День · Бессрочно",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/9",
  },
  {
    id: 10,
    tag: "recovery",
    format: "online",
    duration: "Бессрочно",
    title: "Дыхание перед сном",
    description: "Медленное дыхание перед сном включает парасимпатику и ускоряет засыпание. 5 минут, вдохи длиннее выдохов.",
    habit: { title: "Медленное дыхание", durationMin: 5 },
    coverUrl: planSeed10 as unknown as string,
    gradient: PLAN_TAG_GRADIENTS.recovery,
    schedule: { mode: "partOfDay", timeMode: "partOfDay", time: null, partOfDay: "evening", weekdays: [1, 2, 3, 4, 5, 6, 7], repeat: { type: "days", days: 21 } },
    participants: DEFAULT_PLAN_PARTICIPANTS,
    participantsLabel: "100+ чел.",
    timeDate: "Вечер · Бессрочно",
    author: DEFAULT_PLAN_AUTHOR,
    shareUrl: "https://wellwellwell.app/plans/10",
  },
];

export const CATEGORY_CHIPS: { label: string; value: TagFilter }[] = [
  { label: "Все", value: "all" },
  { label: "Бег", value: "running" },
  { label: "Велоспорт", value: "cycling" },
  { label: "Йога", value: "yoga" },
  { label: "Восстановление", value: "recovery" },
  { label: "Другое", value: "other" },
];

export const normalizePlanTag = (tag?: string): PlanTag =>
  PLAN_TAGS.includes(tag as PlanTag) ? (tag as PlanTag) : "other";
export const PLAN_CATEGORY_GRADIENTS: Record<string, string> = {
  "Бег": "linear-gradient(135deg, var(--brand-bright) 0%, var(--accent) 100%)",
  "Восстановление": "linear-gradient(135deg, var(--primary) 0%, var(--muted-foreground) 100%)",
  "Питание": "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
  "Другое": "linear-gradient(135deg, var(--muted-foreground) 0%, var(--border) 100%)",
};
export const DETAIL_AVATARS = [P_AVATARS.w1, P_AVATARS.m1, P_AVATARS.w2, P_AVATARS.m2];

export const eventMeta: Record<number, EventMeta> = {
  0: { // DetailScreen (Челлендж из Планов)
    date: "Пн. 22 июня 2026", time: "21:00 — 23:00",
    location: "Онлайн", locationSub: "Из любой точки мира",
    participants: 128, plusN: "+123", joinLabel: "Присоединиться",
  },
  1: { // Well Well Well
    date: "Вс. 28 июня 2026", time: "10:00 — 11:30",
    location: "Онлайн", locationSub: "Прямой эфир в приложении",
    participants: 312, plusN: "+307", joinLabel: "Присоединиться",
  },
  2: { // Весенняя подготовка
    date: "Сб. 5 июля 2026", time: "08:00 — 09:30",
    location: "Парк Горького", locationSub: "Москва, главная аллея",
    participants: 47, plusN: "+42", joinLabel: "Записаться",
  },
  3: { // Детокс
    date: "Пн. 22 июня 2026", time: "21:00 — 23:00",
    location: "Онлайн", locationSub: "Из любой точки мира",
    participants: 128, plusN: "+123", joinLabel: "Присоединиться",
  },
  4: { // Полумарафон
    date: "Вс. 15 сентября 2026", time: "09:00 — 13:00",
    location: "Лужники", locationSub: "Москва, старт у главного входа",
    participants: 840, plusN: "+835", joinLabel: "Зарегистрироваться",
  },
};
