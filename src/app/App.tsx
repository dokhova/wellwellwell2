import { useState } from "react";
import challengeImg from "@/imports/challenge-opt.jpg";
import cover1 from "@/imports/cover1-opt.jpg";
import cover2 from "@/imports/cover2-opt.jpg";
import cover3 from "@/imports/cover3-opt.jpg";
import cover4 from "@/imports/cover4-opt.jpg";
import avatarManBlack from "@/imports/avatarManBlack-opt.jpg";
import avatarGirl from "@/imports/avatarGirl-opt.jpg";
import avatarDmitry from "@/imports/avatarDmitry-opt.jpg";
import avatarBrand from "@/imports/avatar-brand.png";
import {
  Home,
  Calendar,
  User,
  Plus,
  Search,
  X,
  ArrowLeft,
  ChevronDown,
  MoreVertical,
  Image as ImageIcon,
  Trash2,
  Copy,
  MapPin,
  Users,
  Video,
  MessageCircle,
  Check,
  ChevronRight,
  Eye,
  Filter,
  Lock,
  Share2,
  Construction,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "home" | "plans" | "create" | "detail" | "article" | "search" | "planEvent" | "profile";

interface Plan {
  id: number;
  title: string;
  description: string;
  time: string;
  category?: string;
  place?: string;
  dayIndexes?: number[];
  avatarUrls?: string[];
  done?: boolean;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorVerified?: boolean;
  readTime: string;
  coverUrl: string | null;
  avatarUrl: string | null;
  avatarBrand?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const P_AVATARS = {
  w1: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=crop&w=80&h=80&q=80",
  w2: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?crop=entropy&cs=tinysrgb&fit=crop&w=80&h=80&q=80",
  m1: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?crop=entropy&cs=tinysrgb&fit=crop&w=80&h=80&q=80",
  m2: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?crop=entropy&cs=tinysrgb&fit=crop&w=80&h=80&q=80",
  m3: "https://images.unsplash.com/photo-1617746652908-91e66c07499a?crop=entropy&cs=tinysrgb&fit=crop&w=80&h=80&q=80",
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Питание с белком",
    description: "Составить и придерживаться плана питания с роста...",
    time: "9:00 – 9:45",
    category: "Питание",
    place: "Онлайн",
    dayIndexes: [2, 4],
    avatarUrls: [P_AVATARS.w1],
  },
  {
    id: 2,
    title: "Программа весенней подготовки",
    description: "Запланировать тренировки и распределить нагрузк...",
    time: "11:00 – 12:00",
    category: "Бег",
    place: "Парк Горького",
    dayIndexes: [2],
    avatarUrls: [P_AVATARS.m1, P_AVATARS.w2],
  },
  {
    id: 3,
    title: "Купить изотоники в продуктовом",
    description: "Составить список и купить изотоники после трениро...",
    time: "13:30 – 14:00",
    category: "Восстановление",
    place: "Магазин",
    dayIndexes: [2, 5],
  },
  {
    id: 4,
    title: "Звонок с коллегами",
    description: "Обсудить текущие задачи и дедлайны по проектам...",
    time: "16:00 – 17:00",
    category: "Другое",
    place: "Онлайн",
    dayIndexes: [3],
    avatarUrls: [P_AVATARS.m2, P_AVATARS.m3],
  },
  {
    id: 5,
    title: "Челлендж: Вечерний цифровой детокс",
    description: "Отложить гаджеты за 2 часа до сна и заняться отды...",
    time: "21:30 – 22:15",
    category: "Восстановление",
    dayIndexes: [0, 1, 2, 3, 4, 5, 6],
  },
];

const UNSPLASH = {
  phone: "https://images.unsplash.com/photo-1592890288564-76628a30a657?crop=entropy&cs=tinysrgb&fit=crop&w=300&h=300&q=80",
  shoes: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?crop=entropy&cs=tinysrgb&fit=crop&w=300&h=300&q=80",
  marathon: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?crop=entropy&cs=tinysrgb&fit=crop&w=300&h=400&q=80&crop=top",
  avatarMaria: avatarGirl as unknown as string,
  avatarGena: avatarManBlack as unknown as string,
  avatarDmitry: avatarDmitry as unknown as string,
  userAvatar: avatarManBlack as unknown as string,
};

const articles: Article[] = [
  {
    id: 1,
    title: "Well Well Well — качалка привычек",
    excerpt: "Это не ещё один список дел. Тут привычки реально прокачиваются.",
    author: "Well Well Well",
    authorVerified: true,
    readTime: "2 мин чтения",
    coverUrl: cover4 as unknown as string,
    avatarUrl: avatarBrand as unknown as string,
    avatarBrand: false,
  },
  {
    id: 2,
    title: "Программа весенней подготовки",
    excerpt: "Иногда всё идёт не по плану. Старт отменён, сезон расслабился...",
    author: "Мария Кузнецова",
    readTime: "5 мин чтения",
    coverUrl: cover3 as unknown as string,
    avatarUrl: UNSPLASH.avatarMaria,
  },
  {
    id: 3,
    title: "Челлендж: Вечерний цифровой детокс",
    excerpt: "Свет экрана вечером подавляет мелатонин и сдвигает циркадные часы.",
    author: "Гена Лохтин",
    readTime: "8 мин чтения",
    coverUrl: cover2 as unknown as string,
    avatarUrl: UNSPLASH.avatarGena,
  },
  {
    id: 4,
    title: "Полумарафон — это не только про бег",
    excerpt: "Когда говорят о дистанции 21,1 км, обычно представляют бегунов...",
    author: "Дмитрий Орлов",
    readTime: "6 мин чтения",
    coverUrl: cover1 as unknown as string,
    avatarUrl: UNSPLASH.avatarDmitry,
  },
];

const articleBodies: Record<number, string[]> = {
  1: [
    "Мы не делаем очередной трекер задач. Well Well Well — это среда, в которой привычки растут сами, потому что система выстроена правильно.",
    "Каждый план в приложении — не просто напоминание. Это маленький ритуал с контекстом: зачем, когда, с кем. Мозг лучше запоминает действие, когда у него есть история.",
    "Мы собрали механики из поведенческой психологии: цепочки привычек, социальная ответственность, микро-прогресс. Всё это встроено в интерфейс незаметно.",
    "Попробуйте одну привычку в течение 14 дней. Просто одну. Посмотрите, что произойдёт.",
  ],
  2: [
    "Весна — идеальное время, чтобы начать двигаться. Но «начать» и «удержать темп» — совсем разные вещи.",
    "Программа весенней подготовки рассчитана на 8 недель. В ней три уровня: восстановление, база и прогрессия. Каждая неделя строится поверх предыдущей.",
    "Первые две недели — только лёгкий бег и мобилизация. Не торопитесь. Организм после зимы нуждается в мягком старте, иначе травмы неизбежны.",
    "Добавьте программу в свои Планы и получайте напоминания в нужное время. Мария Кузнецова — тренер по бегу, 12 лет практики, мастер спорта.",
  ],
  3: [
    "Свет экрана вечером подавляет выработку мелатонина и сдвигает внутренние часы на 1,5–2 часа вперёд. Вы ложитесь позже, встаёте тяжелее.",
    "Челлендж простой: за два часа до сна убираем все экраны. Телефон, ноутбук, телевизор. Взамен — книга, прогулка, разговор.",
    "128 человек уже присоединились к этому плану. Многие отмечают, что уже через 3 дня качество сна заметно улучшается.",
    "Присоединяйтесь каждый вечер в 21:00. Никаких созвонов, никаких обязательств — просто общее намерение и взаимная поддержка в комментариях.",
  ],
  4: [
    "21,1 км — это не просто дистанция. Это точка, в которой вы встречаетесь с собой по-настоящему.",
    "Полумарафон требует минимум 12 недель подготовки при базовом уровне. Но главный ресурс — не ноги, а голова. Умение терпеть, замедляться и доверять плану.",
    "Дмитрий Орлов пробежал 14 полумарафонов. По его словам, каждый из них был разным: одни — триумфом, другие — уроком. Оба варианта ценны.",
    "В этой статье — практические советы по темпу, питанию на дистанции и восстановлению после финиша. Читайте перед стартом.",
  ],
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const weekDates = [29, 30, 1, 2, 3, 4, 5];
const weekDateMonths = ["июня", "июня", "июля", "июля", "июля", "июля", "июля"];

// ─── Colour tokens ─────────────────────────────────────────────────────────────

const GREEN = "var(--accent)";
const GREEN_LIGHT = "var(--secondary)";

// ─── Sub-components ────────────────────────────────────────────────────────────


function Avatar({ colors, size = 28 }: { colors: string[]; size?: number }) {
  if (colors.length === 1) {
    return (
      <div
        className="rounded-full flex-shrink-0"
        style={{
          width: size,
          height: size,
          backgroundColor: colors[0],
        }}
      />
    );
  }
  return (
    <div className="flex -space-x-1.5 flex-shrink-0">
      {colors.map((c, i) => (
        <div
          key={i}
          className="rounded-full border border-white"
          style={{ width: size - 4, height: size - 4, backgroundColor: c }}
        />
      ))}
    </div>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────

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

const PLAN_TAGS = ["running", "cycling", "yoga", "recovery", "other"] as const;
type PlanTag = typeof PLAN_TAGS[number];
type TagFilter = PlanTag | "all";

interface HomeFeedPlan {
  id: number;
  tag?: PlanTag;
  title: string;
  description: string;
  coverUrl?: string;
  gradient?: string;
  schedule: Schedule;
  participants: string[];
  participantsLabel: string;
  timeDate: string;
  address?: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  shareUrl: string;
}

const PLAN_TAG_LABELS: Record<PlanTag, string> = {
  running: "Бег",
  cycling: "Велоспорт",
  yoga: "Йога",
  recovery: "Восстановление",
  other: "Другое",
};

const homeFeedPlans: HomeFeedPlan[] = [
  {
    id: 1,
    tag: "running",
    title: "Бег с нуля",
    description: "Чередуешь бег и ходьбу, чтобы сердце и связки привыкали постепенно. 3 раза в неделю, старт с 1 минуты бега на 2 минуты шага, доля бега растёт каждую неделю. К концу бежишь полчаса без остановки.",
    coverUrl: cover1 as unknown as string,
    schedule: { timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 3, 5], end: { type: "weeks", weeks: 8 } },
    participants: [P_AVATARS.w1, P_AVATARS.m1, P_AVATARS.w2],
    participantsLabel: "100+ чел.",
    timeDate: "Утро · 8 недель",
    address: "3 раза в неделю",
    author: {
      name: "Мария Кузнецова",
      avatarUrl: UNSPLASH.avatarMaria,
    },
    shareUrl: "https://wellwellwell.app/plans/1",
  },
  {
    id: 2,
    tag: "cycling",
    title: "Вкат в сезон",
    description: "Низкая интенсивность набирает базу выносливости без перегруза суставов. 3 выезда в неделю по 40-60 минут в темпе, на котором можешь спокойно говорить. Через месяц длинные дистанции даются легче.",
    coverUrl: cover3 as unknown as string,
    schedule: { timeMode: "exact", time: "10:00-11:00", partOfDay: null, weekdays: [2, 4, 6], end: { type: "weeks", weeks: 4 } },
    participants: [P_AVATARS.m1, P_AVATARS.m2],
    participantsLabel: "2 чел.",
    timeDate: "40—60 мин · 4 недели",
    address: "3 выезда в неделю",
    author: {
      name: "Дмитрий Орлов",
      avatarUrl: UNSPLASH.avatarDmitry,
    },
    shareUrl: "https://wellwellwell.app/plans/2",
  },
  {
    id: 3,
    tag: "yoga",
    title: "Мобилизация по утрам",
    description: "10 минут суставной гимнастики после подъёма разгоняют кровоток и снимают скованность. Комплекс из 8 движений на таз, грудной отдел и голеностоп.",
    coverUrl: cover2 as unknown as string,
    schedule: { timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 2, 3, 4, 5, 6, 7], end: { type: "never" } },
    participants: [P_AVATARS.w2, P_AVATARS.w1, P_AVATARS.m3],
    participantsLabel: "4 чел.",
    timeDate: "Утро · Каждый день",
    author: {
      name: "Анна Соколова",
      avatarUrl: P_AVATARS.w2,
    },
    shareUrl: "https://wellwellwell.app/plans/3",
  },
  {
    id: 5,
    tag: "recovery",
    title: "Без смартфона перед сном",
    description: "Экран перед сном бьёт по мелатонину и сдвигает засыпание. Убираешь телефон за час до сна, в 22:00 отбой для гаджетов.",
    coverUrl: challengeImg as unknown as string,
    schedule: { timeMode: "exact", time: "22:00-23:00", partOfDay: null, weekdays: [1, 2, 3, 4, 5, 6, 7], end: { type: "weeks", weeks: 2 } },
    participants: [],
    participantsLabel: "Будь первым",
    timeDate: "с 22:00 · 14 дней",
    author: {
      name: "Гена Лохтин",
      avatarUrl: UNSPLASH.avatarGena,
    },
    shareUrl: "https://wellwellwell.app/plans/5",
  },
  {
    id: 4,
    tag: "other",
    title: "Стакан воды с утра",
    description: "За ночь теряешь жидкость, утренний стакан возвращает баланс и запускает обмен. 250-300 мл сразу после пробуждения, до кофе.",
    gradient: "linear-gradient(135deg, #00887F 0%, #2563EB 100%)",
    schedule: { timeMode: "partOfDay", time: null, partOfDay: "morning", weekdays: [1, 2, 3, 4, 5, 6, 7], end: { type: "never" } },
    participants: [P_AVATARS.m2],
    participantsLabel: "1 чел.",
    timeDate: "Утро · Каждый день",
    author: {
      name: "Well Well Well",
      avatarUrl: avatarBrand as unknown as string,
    },
    shareUrl: "https://wellwellwell.app/plans/4",
  },
];

const CATEGORY_CHIPS: { label: string; value: TagFilter }[] = [
  { label: "Все", value: "all" },
  { label: "Бег", value: "running" },
  { label: "Велоспорт", value: "cycling" },
  { label: "Йога", value: "yoga" },
  { label: "Восстановление", value: "recovery" },
  { label: "Другое", value: "other" },
];

const normalizePlanTag = (tag?: string): PlanTag =>
  PLAN_TAGS.includes(tag as PlanTag) ? (tag as PlanTag) : "other";

function HomeSheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/30" onClick={onClose}>
      <div
        className="w-full rounded-t-3xl bg-white px-4 pt-4 pb-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[17px] font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} strokeWidth={2} color="#6B7280" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FeedAvatarStack({ avatars, label }: { avatars: string[]; label: string }) {
  const visible = avatars.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <div className="flex -space-x-2.5">
        {visible.length > 0 ? (
          visible.map((url, index) => (
            <img
              key={`${url}-${index}`}
              src={url}
              alt=""
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
            />
          ))
        ) : (
          <div className="w-9 h-9 rounded-full border-2 border-white bg-white/25 flex items-center justify-center">
            <Users size={17} strokeWidth={1.8} color="#fff" />
          </div>
        )}
      </div>
      <span className="mt-1.5 text-[13px] font-medium text-white">{label}</span>
    </div>
  );
}

function FeedEventCard({
  plan,
  onOpen,
  onAuthor,
  onShare,
  onAuthorMenu,
}: {
  plan: HomeFeedPlan;
  onOpen: () => void;
  onAuthor: () => void;
  onShare: () => void;
  onAuthorMenu: () => void;
}) {
  const tag = normalizePlanTag(plan.tag);

  return (
    <article>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="relative w-full aspect-[4/5] overflow-hidden rounded-[20px] text-left active:opacity-95"
        style={{ background: plan.gradient ?? "#D1D5DB" }}
      >
        {plan.coverUrl && (
          <img src={plan.coverUrl} alt={plan.title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/75" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-black/50 px-3.5 py-1.5 text-[13px] font-medium text-white">
              {PLAN_TAG_LABELS[tag]}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0"
          >
            <Share2 size={18} strokeWidth={2} color="#fff" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
          <FeedAvatarStack avatars={plan.participants} label={plan.participantsLabel} />
          <h2
            className="mt-3 text-[30px] font-bold leading-[1.1] text-white"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {plan.title}
          </h2>
          <p className="mt-2 max-w-full truncate text-[15px] text-white/85">{plan.timeDate}</p>
          {plan.address && (
            <p className="mt-1 max-w-full truncate text-[14px] text-white/75">{plan.address}</p>
          )}
        </div>
      </div>

      <div className="h-14 px-4 flex items-center border-b border-gray-200/70">
        <button
          onClick={onAuthor}
          className="flex min-w-0 flex-1 items-center text-left"
        >
          <img src={plan.author.avatarUrl} alt={plan.author.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          <span className="ml-2.5 truncate text-[15px] font-medium text-gray-900">{plan.author.name}</span>
        </button>
        <button onClick={onAuthorMenu} className="w-8 h-8 flex items-center justify-end text-gray-400">
          <MoreVertical size={20} strokeWidth={1.9} />
        </button>
      </div>
    </article>
  );
}

function HomeScreen({
  onNavigate,
  onPlanOpen,
}: {
  onNavigate: (s: Screen, from?: Screen) => void;
  onPlanOpen: (id: number, from?: Screen) => void;
}) {
  const [tagFilter, setTagFilter] = useState<TagFilter>("all");
  const [sheet, setSheet] = useState<"filter" | "share" | "author" | null>(null);
  const [activePlan, setActivePlan] = useState<HomeFeedPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const plansWithTag = homeFeedPlans.map((plan) => ({
    ...plan,
    tag: normalizePlanTag(plan.tag),
  }));

  const visiblePlans = plansWithTag.filter((plan) => {
    if (tagFilter === "all") return true;
    return plan.tag === tagFilter;
  });

  const openShare = (plan: HomeFeedPlan) => {
    setActivePlan(plan);
    setCopied(false);
    setSheet("share");
  };

  const copyActivePlan = async () => {
    if (!activePlan) return;
    await navigator.clipboard?.writeText(activePlan.shareUrl);
    setCopied(true);
  };

  const openAuthorMenu = (plan: HomeFeedPlan) => {
    setActivePlan(plan);
    setSheet("author");
  };

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#F0F1F3" }}>
      {/* Header */}
      <div className="h-14 flex items-center justify-center px-4">
        <div className="text-center leading-none">
          <p className="text-[17px] font-semibold text-gray-900">WellWellWell</p>
          <p className="mt-0.5 text-[12px] text-gray-400">mini app</p>
        </div>
      </div>

      {/* Category row */}
      <div className="h-12 pl-4 flex items-center">
        <div className="min-w-0 flex-1 overflow-x-auto pr-3">
          <div className="flex gap-2">
            {CATEGORY_CHIPS.map((chip) => {
              const active = tagFilter === chip.value;
              return (
                <button
                  key={chip.value}
                  onClick={() => setTagFilter(chip.value)}
                  className="h-9 flex-shrink-0 rounded-full border px-3.5 text-[13px] font-medium transition-colors"
                  style={
                    active
                      ? { backgroundColor: GREEN, borderColor: GREEN, color: "#fff" }
                      : { backgroundColor: "#fff", borderColor: "#D1D5DB", color: "#374151" }
                  }
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="w-7 h-12 flex-shrink-0"
          style={{ background: "linear-gradient(90deg, rgba(240,241,243,0), #F0F1F3)" }}
        />
        <div className="flex items-center gap-4 pr-4 flex-shrink-0">
          <button onClick={() => setSheet("filter")} className="w-6 h-6 flex items-center justify-center">
            <Filter size={24} strokeWidth={1.9} color="#111827" />
          </button>
          <button onClick={() => onNavigate("search", "home")} className="w-6 h-6 flex items-center justify-center">
            <Search size={24} strokeWidth={1.9} color="#111827" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 space-y-6">
        {visiblePlans.length > 0 ? (
          visiblePlans.map((plan) => (
            <FeedEventCard
              key={plan.id}
              plan={plan}
              onOpen={() => onPlanOpen(plan.id, "home")}
              onAuthor={() => onNavigate("profile")}
              onShare={() => openShare(plan)}
              onAuthorMenu={() => openAuthorMenu(plan)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[20px] bg-white px-6 py-14 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: GREEN_LIGHT }}>
              <Filter size={22} strokeWidth={1.8} color={GREEN} />
            </div>
            <h3 className="text-[17px] font-semibold text-gray-900">
              {tagFilter === "all"
                ? "Событий пока нет"
                : tagFilter === "running"
                  ? "Забегов пока нет"
                  : tagFilter === "cycling"
                    ? "Заездов пока нет"
                    : tagFilter === "yoga"
                      ? "Занятий пока нет"
                      : tagFilter === "recovery"
                        ? "Событий пока нет"
                        : "Тут пока пусто"}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
              {tagFilter === "all"
                ? "Скоро тут появятся события"
                : "Загляни позже или посмотри события в других категориях"}
            </p>
            {tagFilter !== "all" && (
              <button
                onClick={() => setTagFilter("all")}
                className="mt-5 h-11 rounded-full px-5 text-[14px] font-semibold text-white"
                style={{ backgroundColor: GREEN }}
              >
                Показать все
              </button>
            )}
          </div>
        )}
      </div>

      {sheet === "filter" && (
        <HomeSheet title="Фильтры" onClose={() => setSheet(null)}>
          <div className="space-y-2">
            {["Дата", "Популярные", "Рядом"].map((item) => (
              <button
                key={item}
                onClick={() => setSheet(null)}
                className="w-full rounded-2xl bg-gray-100 px-4 py-3 text-left text-[15px] font-medium text-gray-900"
              >
                {item}
              </button>
            ))}
          </div>
        </HomeSheet>
      )}

      {sheet === "share" && activePlan && (
        <HomeSheet title="Поделиться" onClose={() => setSheet(null)}>
          <p className="mb-3 truncate text-[14px] text-gray-500">{activePlan.title}</p>
          <button
            onClick={copyActivePlan}
            className="h-12 w-full rounded-2xl text-[15px] font-semibold text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: GREEN }}
          >
            <Copy size={17} strokeWidth={2.2} />
            {copied ? "Ссылка скопирована" : "Скопировать ссылку"}
          </button>
        </HomeSheet>
      )}

      {sheet === "author" && activePlan && (
        <HomeSheet title={activePlan.author.name} onClose={() => setSheet(null)}>
          <div className="space-y-2">
            <button onClick={() => { setSheet(null); onNavigate("profile"); }} className="w-full rounded-2xl bg-gray-100 px-4 py-3 text-left text-[15px] font-medium text-gray-900">Открыть профиль</button>
            <button onClick={() => setSheet(null)} className="w-full rounded-2xl bg-gray-100 px-4 py-3 text-left text-[15px] font-medium text-gray-900">Пожаловаться</button>
          </div>
        </HomeSheet>
      )}
    </div>
  );
}

// ─── Screen: Analytics ───────────────────────────────────────────────────────

const PERIODS = ["День", "Неделя", "Месяц"] as const;
type Period = typeof PERIODS[number];

const weekRanges = [
  "22–28 июня 2026",
  "15–21 июня 2026",
  "8–14 июня 2026",
];

const chartData = [
  { day: "Пнд", value: 80 },
  { day: "Втр", value: 60 },
  { day: "Срд", value: 100 },
  { day: "Чтв", value: 40 },
  { day: "Птн", value: 90 },
  { day: "Суб", value: 30 },
  { day: "Вск", value: 0 },
];

function WorkInProgress() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: "#F0F1F3" }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "#DBECE7" }}
      >
        <Construction size={36} strokeWidth={1.8} color={GREEN} />
      </div>
      <h2 className="text-[20px] font-bold mb-2" style={{ color: "#1a1a1a" }}>
        В работе
      </h2>
      <p className="text-[14px] leading-relaxed" style={{ color: "#6B7280" }}>
        Этот раздел ещё в разработке.
        <br />
        Скоро здесь появится контент.
      </p>
    </div>
  );
}

function AnalyticsScreen() {
  return <WorkInProgress />;
}

function AnalyticsScreenOld() {
  const [period, setPeriod] = useState<Period>("Неделя");
  const [rangeIdx, setRangeIdx] = useState(0);

  const completion = 78;
  const habitsDone = 26;
  const delta = "+11%";
  const streak = 9;
  const bestStreak = 14;

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#F0F1F3" }}>
      <div className="px-4 pt-4 pb-6 space-y-3">

        {/* Period switcher */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="flex-1 py-1.5 rounded-lg text-[13px] transition-all"
                style={
                  period === p
                    ? { backgroundColor: "#fff", color: "#1a1a1a", fontWeight: 700, boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }
                    : { color: "#9CA3AF", fontWeight: 400 }
                }
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setRangeIdx(i => Math.min(weekRanges.length - 1, i + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-[14px] font-semibold text-gray-700">{weekRanges[rangeIdx]}</span>
            <button
              onClick={() => setRangeIdx(i => Math.max(0, i - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              style={{ opacity: rangeIdx === 0 ? 0.3 : 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Completion progress */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-3">Выполнение привычек за период</p>
          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${completion}%`,
                background: `linear-gradient(90deg, ${GREEN}99, ${GREEN})`,
              }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[12px] text-gray-400">Текущий результат</span>
            <span className="text-[15px] font-bold" style={{ color: GREEN }}>{completion}%</span>
          </div>
        </div>

        {/* Two stat cards */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
            <p className="text-[11px] text-gray-400 leading-tight">Отмечены выполненными</p>
            <p className="text-[28px] font-bold text-gray-900 leading-none">{habitsDone}</p>
            <p className="text-[11px] text-gray-400">привычек за неделю</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
            <p className="text-[11px] text-gray-400 leading-tight">Процент выполнения</p>
            <div className="flex items-end gap-1.5">
              <p className="text-[28px] font-bold text-gray-900 leading-none">{completion}%</p>
              <span className="text-[12px] font-semibold pb-0.5" style={{ color: "#22C55E" }}>↑{delta}</span>
            </div>
            <p className="text-[11px] text-gray-400">vs прошлая неделя</p>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-3">Серия выполнения</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: GREEN + "18" }}>
                🔥
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold leading-none" style={{ color: GREEN }}>{streak}</span>
                  <span className="text-[14px] text-gray-500 font-medium">дней подряд</span>
                </div>
                <p className="text-[12px] text-gray-400 mt-0.5">Текущая серия</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[20px] font-bold text-gray-700">{bestStreak}</p>
              <p className="text-[11px] text-gray-400">Лучшая серия</p>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-4">Активность по дням</p>
          <div className="flex items-end justify-between gap-1.5" style={{ height: 80 }}>
            {chartData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg flex-1 flex items-end">
                  {value > 0 ? (
                    <div
                      className="w-full rounded-lg"
                      style={{
                        height: `${value}%`,
                        background: `linear-gradient(180deg, ${GREEN}CC, ${GREEN})`,
                        minHeight: 6,
                      }}
                    />
                  ) : (
                    <div className="w-full rounded-lg bg-gray-100" style={{ height: 6 }} />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events & plans stats */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-3">События и планы</p>
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: GREEN + "12" }}>
              <p className="text-[24px] font-bold" style={{ color: GREEN }}>3</p>
              <p className="text-[11px] text-gray-500 leading-tight">события<br/>посещено</p>
            </div>
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#F59E0B12" }}>
              <div className="flex items-baseline gap-1">
                <p className="text-[24px] font-bold" style={{ color: "#F59E0B" }}>12</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">планов<br/>выполнено</p>
            </div>
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: "#6366F112" }}>
              <div className="flex items-baseline gap-1.5">
                <p className="text-[24px] font-bold" style={{ color: "#6366F1" }}>78%</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">выполнение<br/>планов</p>
            </div>
          </div>
        </div>

        {/* Habit set */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-3">Текущий набор привычек</p>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[15px] font-bold text-gray-900">Утренний старт</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <img src={UNSPLASH.avatarGena} alt="" className="w-4 h-4 rounded-full object-cover" />
                <span className="text-[11px] text-gray-400">Гена Лохтин</span>
              </div>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: GREEN }}>26 / 33</span>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-gray-400">привычек выполнено</span>
              <span className="text-[11px] font-semibold" style={{ color: GREEN }}>79%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "79%", backgroundColor: GREEN }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Screen: Plans ────────────────────────────────────────────────────────────

function PlanAvatarStack({ urls }: { urls: string[] }) {
  return (
    <div className="flex -space-x-2 flex-shrink-0">
      {urls.map((url, i) => (
        <img
          key={i}
          src={url}
          alt=""
          className="rounded-full border-2 border-white object-cover"
          style={{ width: 30, height: 30 }}
        />
      ))}
    </div>
  );
}

function PlansScreen({ onNavigate, onPlanOpen }: { onNavigate: (s: Screen, from?: Screen) => void; onPlanOpen: (id: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDay, setActiveDay] = useState(2);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const todayIndex = 2;
  const selectedDayPlans = plans.filter(plan => (plan.dayIndexes ?? [todayIndex]).includes(activeDay));
  const monthLabel = "Июль 2026";
  const selectedDayTitle = `${activeDay === todayIndex ? "Сегодня · " : ""}${weekDays[activeDay]}, ${weekDates[activeDay]} ${weekDateMonths[activeDay]}`;
  const hasPlansByDay = (dayIndex: number) =>
    plans.some(plan => (plan.dayIndexes ?? [todayIndex]).includes(dayIndex));

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="h-14 px-4 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900">Мои планы</h1>
        <button
          onClick={() => setActiveDay(todayIndex)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <Calendar size={22} strokeWidth={1.8} color="#6B7280" />
        </button>
      </div>

      <div className="h-10 px-4 flex items-center justify-between">
        <button
          onClick={() => setActiveDay(day => Math.max(0, day - 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400"
          style={{ opacity: activeDay === 0 ? 0.35 : 1 }}
        >
          <ChevronRight size={18} strokeWidth={2} className="rotate-180" />
        </button>
        <p className="text-[14px] font-medium text-gray-700">{monthLabel}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveDay(day => Math.min(6, day + 1))}
            className="w-8 h-8 flex items-center justify-center text-gray-400"
            style={{ opacity: activeDay === 6 ? 0.35 : 1 }}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
          <div className="flex rounded-xl bg-gray-200/70 p-0.5">
            {["Планы", "Аналитика"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="h-7 rounded-lg px-3 text-[12px] font-semibold"
                  style={i === activeTab ? { backgroundColor: "var(--card)", color: GREEN } : { color: "var(--muted-foreground)" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week calendar */}
      <div className="px-3 pb-4" style={{ display: activeTab === 1 ? "none" : undefined }}>
        <div className="grid grid-cols-7 gap-[5px]">
          {weekDays.map((day, i) => {
            const isActive = activeDay === i;
            const hasPlans = hasPlansByDay(i);
            const isPast = i < todayIndex;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(i)}
                className="rounded-[14px] py-2 flex flex-col items-center gap-1.5 transition-colors"
                style={isActive ? { backgroundColor: GREEN } : undefined}
              >
                <span
                  className="text-[11px] font-medium"
                  style={{ color: isActive ? "rgba(255,255,255,0.8)" : "#9CA3AF" }}
                >
                  {day}
                </span>
                <span
                  className="text-[15px]"
                  style={{
                    color: isActive ? "#fff" : isPast ? "#9CA3AF" : "#111827",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {weekDates[i]}
                </span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: isActive ? "#fff" : hasPlans ? GREEN : "transparent" }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 1 && <AnalyticsScreen />}

      <div className="flex-1 overflow-y-auto px-4 pb-6" style={{ display: activeTab === 1 ? "none" : undefined }}>
        <p className="mb-3 text-[13px] leading-4 text-muted-foreground">{selectedDayTitle}</p>

        {selectedDayPlans.length > 0 ? (
          <div className="space-y-2.5">
            {selectedDayPlans.map((plan) => {
              const done = checkedItems.includes(plan.id);
              return (
                <div key={plan.id} className="flex gap-3">
                  <div className="w-[42px] pt-[13px] flex-shrink-0">
                    <span className="text-[13px] text-gray-400">{plan.time.includes("–") ? plan.time.split(" ")[0] : plan.time}</span>
                  </div>

                  <button
                    onClick={() => onPlanOpen(plan.id)}
                    className="flex-1 rounded-xl bg-card px-3.5 py-3 flex items-center justify-between gap-3 text-left active:opacity-90"
                    style={{ opacity: done ? 0.7 : 1 }}
                  >
                    <div className="min-w-0 flex-1">
                      <h3
                        className="truncate text-[14px] leading-5 font-medium"
                        style={{
                          color: done ? "var(--muted-foreground)" : "var(--foreground)",
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        {plan.title}
                      </h3>
                      <p className="mt-0.5 truncate text-[12px] leading-4 text-muted-foreground">
                        {plan.category ?? "Другое"}{plan.place ? ` · ${plan.place}` : ""}
                      </p>
                    </div>
                    <span
                      onClick={(e) => { e.stopPropagation(); toggleCheck(plan.id); }}
                      className="w-[22px] h-[22px] rounded-full border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: done ? GREEN : "var(--muted-foreground)",
                        backgroundColor: done ? GREEN : "transparent",
                      }}
                    >
                      {done && <Check size={13} strokeWidth={3} color="#fff" />}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="pt-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: GREEN_LIGHT }}>
              <Calendar size={24} strokeWidth={1.8} color={GREEN} />
            </div>
            <p className="text-[14px] text-gray-500">На этот день планов нет</p>
            <button
              onClick={() => onNavigate("home")}
              className="mt-3 text-[13px] font-semibold"
              style={{ color: GREEN }}
            >
              Посмотреть каталог
            </button>
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="relative h-0" style={{ display: activeTab === 1 ? "none" : undefined }}>
        <button
          onClick={() => onNavigate("create")}
          className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
          style={{
            backgroundColor: GREEN,
            bottom: 16,
            right: 16,
            boxShadow: "0 6px 20px rgba(0,136,127,0.45)",
          }}
        >
          <Plus size={26} strokeWidth={2.5} color="#fff" />
        </button>
      </div>

    </div>
  );
}

function PlansScreenOld({ onNavigate, onPlanOpen }: { onNavigate: (s: Screen, from?: Screen) => void; onPlanOpen: (id: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDay, setActiveDay] = useState(5);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F0F1F3" }}>
      {/* Header */}
      <div className="bg-white px-4 pt-3">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {["Планы", "Аналитика"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="flex-1 py-2.5 text-sm font-semibold text-center"
              style={{
                color: i === activeTab ? GREEN : "#9CA3AF",
                borderBottom: i === activeTab ? `2px solid ${GREEN}` : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Week calendar */}
        <div className="flex justify-between py-3" style={{ display: activeTab === 1 ? "none" : undefined }}>
          {weekDays.map((day, i) => {
            const isActive = activeDay === i;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(i)}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="text-[11px] font-medium"
                  style={{ color: isActive ? GREEN : "#9CA3AF" }}
                >
                  {day}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-semibold"
                  style={
                    isActive
                      ? { backgroundColor: "#D4F0EE", color: "#00665E" }
                      : { color: "#1a1a1a" }
                  }
                >
                  {weekDates[i]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 1 && <AnalyticsScreen />}

      {/* Plan cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ display: activeTab === 1 ? "none" : undefined }}>
        {plans.map((plan) => {
          const done = checkedItems.includes(plan.id);
          return (
            <div
              key={plan.id}
              onClick={() => onPlanOpen(plan.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex cursor-pointer active:opacity-90"
            >
              {/* Left accent bar */}
              <div
                className="w-1 flex-shrink-0 rounded-l-2xl"
                style={{ backgroundColor: done ? "#D1D5DB" : GREEN }}
              />

              {/* Card content */}
              <div className="flex-1 px-4 py-4">
                {/* Title + checkbox */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4
                    className="text-[15px] font-semibold leading-snug flex-1"
                    style={{
                      color: done ? "#9CA3AF" : GREEN,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {plan.title}
                  </h4>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCheck(plan.id); }}
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: done ? GREEN : "#D1D5DB",
                      backgroundColor: done ? GREEN : "transparent",
                    }}
                  >
                    {done && <Check size={12} strokeWidth={3} color="#fff" />}
                  </button>
                </div>

                {/* Description */}
                <p className="text-[12px] text-gray-400 leading-snug mb-3 truncate">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-3" />

                {/* Time row + avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-400">Сегодня</span>
                    <span className="text-[12px] font-semibold" style={{ color: GREEN }}>
                      {plan.time}
                    </span>
                  </div>
                  {plan.avatarUrls && plan.avatarUrls.length > 0 && (
                    <PlanAvatarStack urls={plan.avatarUrls} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <div className="relative h-0" style={{ display: activeTab === 1 ? "none" : undefined }}>
        <button
          onClick={() => onNavigate("create")}
          className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
          style={{
            backgroundColor: GREEN,
            bottom: 16,
            right: 16,
            boxShadow: "0 6px 20px rgba(0,136,127,0.45)",
          }}
        >
          <Plus size={26} strokeWidth={2.5} color="#fff" />
        </button>
      </div>

    </div>
  );
}

// ─── Screen: Create Plan ──────────────────────────────────────────────────────

const ALL_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const WEEKDAY_VALUES = [1, 2, 3, 4, 5, 6, 7];
const PART_OF_DAY_RANGES = {
  morning: { label: "Утро", range: "06:00-10:00" },
  noon: { label: "Обед", range: "12:00-15:00" },
  evening: { label: "Вечер", range: "18:00-22:00" },
} as const;

type TimeMode = "exact" | "partOfDay";
type PartOfDay = keyof typeof PART_OF_DAY_RANGES;
type Visibility = "all" | "private";
type ScheduleEnd =
  | { type: "never" }
  | { type: "date"; date: string }
  | { type: "weeks"; weeks: number };

interface Schedule {
  timeMode: TimeMode;
  time: string | null;
  partOfDay: PartOfDay | null;
  weekdays: number[];
  end: ScheduleEnd;
}

const VISIBILITY_OPTIONS: { value: Visibility; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "private", label: "Только я" },
];

const EVENT_PARTICIPANTS = [
  { id: "maria", name: "Мария", avatar: P_AVATARS.w1 },
  { id: "dmitry", name: "Дмитрий", avatar: P_AVATARS.m1 },
  { id: "anna", name: "Анна", avatar: P_AVATARS.w2 },
  { id: "gena", name: "Гена", avatar: P_AVATARS.m2 },
];

function CheckToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
      style={{ backgroundColor: on ? GREEN : "#E9EAEC" }}
    >
      {on && <Check size={15} strokeWidth={2.8} color="#fff" />}
    </button>
  );
}

function PlusButton() {
  return (
    <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
      <Plus size={16} strokeWidth={2.2} color="#6B7280" />
    </button>
  );
}

function OptionRow({
  icon, label, subtitle, control, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  control: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm text-left active:opacity-70 transition-opacity"
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: GREEN + "18" }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-gray-800">{label}</p>
        {subtitle && <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{subtitle}</p>}
      </div>
      {control}
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
      {children}
    </div>
  );
}

function CreateScreen({ onNavigate, backTo = "plans" }: { onNavigate: (s: Screen) => void; backTo?: Screen }) {
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [timeMode, setTimeMode] = useState<TimeMode>("exact");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [partOfDay, setPartOfDay] = useState<PartOfDay | null>(null);
  const [endType, setEndType] = useState<ScheduleEnd["type"]>("never");
  const [endDate, setEndDate] = useState("");
  const [endWeeks, setEndWeeks] = useState(4);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [showParticipantsPicker, setShowParticipantsPicker] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoCopied, setVideoCopied] = useState(false);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
    setScheduleError("");
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((participantId) => participantId !== id) : [...prev, id]
    );
  };

  const schedule: Schedule = {
    timeMode,
    time: timeMode === "exact" && startTime && endTime ? `${startTime}-${endTime}` : null,
    partOfDay: timeMode === "partOfDay" ? partOfDay : null,
    weekdays: selectedDays,
    end:
      endType === "date"
        ? { type: "date", date: endDate ? new Date(`${endDate}T00:00:00`).toISOString() : "" }
        : endType === "weeks"
          ? { type: "weeks", weeks: endWeeks }
          : { type: "never" },
  };

  const endLabel =
    schedule.end.type === "date"
      ? endDate || "Выберите дату"
      : schedule.end.type === "weeks"
        ? `Через ${endWeeks} нед.`
        : "Бессрочно";

  const selectedParticipantItems = EVENT_PARTICIPANTS.filter((participant) =>
    selectedParticipants.includes(participant.id)
  );

  const videoMeeting = {
    enabled: videoEnabled,
    link: videoEnabled ? videoLink : "",
  };

  const validateSchedule = () => {
    if ((timeMode === "exact" && (!startTime || !endTime)) || (timeMode === "partOfDay" && !partOfDay)) {
      return "Выберите время";
    }
    if (selectedDays.length === 0) {
      return "Выберите хотя бы один день недели";
    }
    if (endType === "date" && !endDate) {
      return "Выберите дату окончания";
    }
    if (endType === "weeks" && (!endWeeks || endWeeks < 1)) {
      return "Введите количество недель";
    }
    return "";
  };

  const handleCreate = () => {
    const nextTitleError = title.trim() ? "" : "Введите название";
    const nextScheduleError = validateSchedule();

    setTitleError(nextTitleError);
    setScheduleError(nextScheduleError);

    if (nextScheduleError) {
      setScheduleExpanded(true);
    }

    if (nextTitleError || nextScheduleError) {
      return;
    }

    const event = {
      title: title.trim(),
      description: description.trim(),
      coverImage,
      visibility,
      participants: selectedParticipants,
      videoMeeting,
      schedule,
    };

    console.log(event);
    onNavigate(backTo);
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F0F1F3" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-3 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate(backTo)}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
        >
          <X size={18} strokeWidth={2.2} />
        </button>
        <span className="text-[17px] font-semibold">Создать событие</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">

        {/* Cover */}
        <div className="mx-4 rounded-2xl bg-white px-3 py-1 shadow-sm">
          <div className="min-h-12 rounded-xl bg-gray-50">
            {coverImage ? (
              <div className="h-12 flex items-center gap-3">
                <img src={coverImage} alt="Обложка события" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-800 truncate">Обложка добавлена</p>
                </div>
                <label
                  className="h-8 px-3 rounded-full bg-white flex items-center justify-center cursor-pointer text-[12px] font-semibold flex-shrink-0"
                  style={{ color: GREEN }}
                >
                  Заменить
                  <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
                </label>
                <button
                  onClick={() => setCoverImage(null)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                >
                  <Trash2 size={15} strokeWidth={2} color="#EF4444" />
                </button>
              </div>
            ) : (
              <label className="h-12 border-2 border-dashed border-gray-300 rounded-xl px-4 flex items-center gap-3 cursor-pointer active:opacity-70 transition-opacity">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={18} strokeWidth={2} color={GREEN} />
                </div>
                <p className="text-[14px] font-semibold text-gray-500">Добавить обложку</p>
                <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
              </label>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mx-4 rounded-2xl bg-white px-4 py-2 shadow-sm">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
            placeholder="Название"
            className="w-full border-b border-gray-100 py-4 text-[22px] font-semibold text-gray-900 placeholder-gray-300 outline-none"
          />
          {titleError && <p className="pt-2 text-[12px] font-medium text-red-500">{titleError}</p>}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            placeholder="Описание"
            rows={1}
            className="w-full min-h-14 border-b border-gray-100 py-4 text-[15px] leading-relaxed text-gray-700 placeholder-gray-300 outline-none resize-none overflow-hidden"
          />
        </div>

        {/* Schedule */}
        <SectionCard>
          <button
            onClick={() => setScheduleExpanded((expanded) => !expanded)}
            className="w-full flex items-center justify-between gap-3 text-left active:opacity-70 transition-opacity"
          >
            <p className="text-[15px] font-semibold text-gray-800">Расписание</p>
            <ChevronDown
              size={18}
              strokeWidth={2}
              color="#9CA3AF"
              className={`flex-shrink-0 transition-transform ${scheduleExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {scheduleExpanded && (
          <div className="space-y-5 pt-5">
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Время</p>
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1 mb-4">
                {[
                  { value: "exact" as const, label: "Точное время" },
                  { value: "partOfDay" as const, label: "Время суток" },
                ].map((mode) => {
                  const active = timeMode === mode.value;
                  return (
                    <button
                      key={mode.value}
                      onClick={() => {
                        setTimeMode(mode.value);
                        setScheduleError("");
                      }}
                      className="h-10 rounded-lg text-[13px] font-semibold transition-colors"
                      style={active ? { backgroundColor: GREEN, color: "#fff" } : { color: "#6B7280" }}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              {timeMode === "exact" ? (
                <div className="grid grid-cols-2 gap-3">
                  <label className="rounded-xl bg-gray-50 px-4 py-3">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">с</span>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setScheduleError("");
                      }}
                      className="w-full bg-transparent text-[20px] font-bold outline-none"
                      style={{ color: GREEN }}
                    />
                  </label>
                  <label className="rounded-xl bg-gray-50 px-4 py-3">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">по</span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setScheduleError("");
                      }}
                      className="w-full bg-transparent text-[20px] font-bold outline-none"
                      style={{ color: GREEN }}
                    />
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(PART_OF_DAY_RANGES).map(([key, item]) => {
                    const active = partOfDay === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setPartOfDay(key as PartOfDay);
                          setScheduleError("");
                        }}
                        className="h-10 rounded-full border px-3 text-[13px] font-semibold transition-colors"
                        style={
                          active
                            ? { backgroundColor: GREEN, borderColor: GREEN, color: "#fff" }
                            : { backgroundColor: "#fff", borderColor: "#D1D5DB", color: GREEN }
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Дни недели</p>
              <div className="flex justify-between">
                {ALL_DAYS.map((day, i) => {
                  const value = WEEKDAY_VALUES[i];
                  const active = selectedDays.includes(value);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(value)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-semibold border-2 transition-colors"
                      style={
                        active
                          ? { backgroundColor: GREEN, borderColor: GREEN, color: "#fff" }
                          : { backgroundColor: "#fff", borderColor: GREEN, color: GREEN }
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Окончание</p>
              <button
                onClick={() => setShowEndPicker((show) => !show)}
                className="w-full rounded-xl bg-gray-50 px-4 py-3 flex items-center justify-between text-left active:opacity-70 transition-opacity"
              >
                <span className="text-[15px] font-medium text-gray-800">{endLabel}</span>
                <ChevronDown size={18} strokeWidth={2} color="#9CA3AF" />
              </button>

              {showEndPicker && (
                <div className="mt-3 space-y-2">
                  {[
                    { type: "never" as const, label: "Бессрочно" },
                    { type: "date" as const, label: "До даты" },
                    { type: "weeks" as const, label: "Через N недель" },
                  ].map((item) => {
                    const active = endType === item.type;
                    return (
                      <button
                        key={item.type}
                        onClick={() => {
                          setEndType(item.type);
                          setScheduleError("");
                        }}
                        className="w-full rounded-xl border px-4 py-3 flex items-center justify-between text-left transition-colors"
                        style={
                          active
                            ? { backgroundColor: GREEN_LIGHT, borderColor: GREEN }
                            : { backgroundColor: "#fff", borderColor: "#E5E7EB" }
                        }
                      >
                        <span className="text-[14px] font-medium text-gray-800">{item.label}</span>
                        {active && <Check size={16} strokeWidth={2.5} color={GREEN} />}
                      </button>
                    );
                  })}

                  {endType === "date" && (
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setScheduleError("");
                      }}
                      className="w-full rounded-xl bg-gray-50 px-4 py-3 text-[15px] font-medium text-gray-800 outline-none"
                    />
                  )}

                  {endType === "weeks" && (
                    <input
                      type="number"
                      min={1}
                      value={endWeeks}
                      onChange={(e) => {
                        setEndWeeks(Number(e.target.value));
                        setScheduleError("");
                      }}
                      className="w-full rounded-xl bg-gray-50 px-4 py-3 text-[15px] font-medium text-gray-800 outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            {scheduleError && (
              <p className="text-[12px] font-medium text-red-500">{scheduleError}</p>
            )}
          </div>
          )}

          {!scheduleExpanded && scheduleError && (
            <p className="pt-3 text-[12px] font-medium text-red-500">{scheduleError}</p>
          )}
        </SectionCard>

        {/* Options — вертикальный список */}
        <div className="mx-4 space-y-2">

          {/* Видимость */}
          <div className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: GREEN + "18" }}>
              {visibility === "all"
                ? <Eye size={17} strokeWidth={1.8} color={GREEN} />
                : <Lock size={17} strokeWidth={1.8} color={GREEN} />}
            </div>
            <p className="flex-1 text-[14px] font-medium text-gray-800">Видимость</p>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
              {VISIBILITY_OPTIONS.map((option) => {
                const active = visibility === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setVisibility(option.value)}
                    className="h-8 rounded-lg px-3 text-[12px] font-semibold whitespace-nowrap transition-colors"
                    style={active ? { backgroundColor: GREEN, color: "#fff" } : { color: "#6B7280" }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Участники */}
          <div className="space-y-2">
            <OptionRow
              icon={<Users size={17} strokeWidth={1.8} color={GREEN} />}
              label="Участники"
              onClick={() => setShowParticipantsPicker((show) => !show)}
              control={
                selectedParticipantItems.length > 0 ? (
                  <div className="flex -space-x-2">
                    {selectedParticipantItems.slice(0, 4).map((participant) => (
                      <img
                        key={participant.id}
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <PlusButton />
                )
              }
            />

            {showParticipantsPicker && (
              <div className="rounded-2xl bg-white p-2 shadow-sm space-y-1">
                {EVENT_PARTICIPANTS.map((participant) => {
                  const active = selectedParticipants.includes(participant.id);
                  return (
                    <button
                      key={participant.id}
                      onClick={() => toggleParticipant(participant.id)}
                      className="w-full rounded-xl px-3 py-2.5 flex items-center gap-3 text-left"
                      style={active ? { backgroundColor: GREEN_LIGHT } : undefined}
                    >
                      <img src={participant.avatar} alt={participant.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="flex-1 text-[14px] font-medium text-gray-800">{participant.name}</span>
                      {active && <Check size={16} strokeWidth={2.5} color={GREEN} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Видеовстреча */}
          <div className="space-y-2">
            <OptionRow
              icon={<Video size={17} strokeWidth={1.8} color={GREEN} />}
              label="Видеовстреча"
              subtitle={videoEnabled ? "Ссылка прикреплена" : undefined}
              onClick={() => {
                setVideoEnabled((enabled) => {
                  const nextEnabled = !enabled;
                  if (nextEnabled && !videoLink) {
                    setVideoLink("https://meet.wellwellwell.local/event");
                  }
                  return nextEnabled;
                });
              }}
              control={
                <div
                  className="w-11 h-6 rounded-full p-0.5 transition-colors"
                  style={{ backgroundColor: videoEnabled ? GREEN : "#E5E7EB" }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-white transition-transform"
                    style={{ transform: videoEnabled ? "translateX(20px)" : "translateX(0)" }}
                  />
                </div>
              }
            />

            {videoEnabled && (
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Ссылка</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1 min-w-0 truncate text-[14px] text-gray-800">{videoLink}</span>
                  <button
                    onClick={async () => {
                      await navigator.clipboard?.writeText(videoLink);
                      setVideoCopied(true);
                      window.setTimeout(() => setVideoCopied(false), 1200);
                    }}
                    className="h-8 rounded-full px-3 flex items-center gap-1.5 text-[12px] font-semibold text-white flex-shrink-0"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Copy size={13} strokeWidth={2.2} />
                    {videoCopied ? "Скопировано" : "Копировать"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-2" />
      </div>

      {/* Submit — fixed */}
      <div className="flex-shrink-0 px-4 pb-6 pt-3 bg-white border-t border-gray-100">
        <button
          onClick={handleCreate}
          className="w-full py-4 rounded-2xl text-white text-[16px] font-semibold"
          style={{ backgroundColor: GREEN }}
        >
          Создать событие
        </button>
      </div>
    </div>
  );
}

// ─── Event data per article ───────────────────────────────────────────────────

const DETAIL_AVATARS = [P_AVATARS.w1, P_AVATARS.m1, P_AVATARS.w2, P_AVATARS.m2];

interface EventMeta {
  date: string;
  time: string;
  location: string;
  locationSub: string;
  participants: number;
  plusN: string;
  joinLabel: string;
}

const eventMeta: Record<number, EventMeta> = {
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

interface PlanEvent {
  title: string;
  coverUrl: string;
  authorName: string;
  authorAvatarUrl: string;
  paragraphs: string[];
  meta: EventMeta;
  badgeDate: string;
}

const planEvents: Record<number, PlanEvent> = {
  1: {
    title: "Питание с белком",
    coverUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=crop&w=800&h=400&q=80",
    authorName: "Анна Соколова",
    authorAvatarUrl: P_AVATARS.w2,
    badgeDate: "Сегодня в 9:00",
    paragraphs: [
      "Белок — основа восстановления мышц и чувства сытости. Недостаточное его количество тормозит прогресс в тренировках и провоцирует переедание простых углеводов.",
      "В этом плане вы освоите простые способы набирать 1,5–2 г белка на кг веса в сутки без подсчёта калорий: через продукты, которые легко найти в любом магазине.",
      "Завтрак с яйцами или творогом, обед с курицей или рыбой, ужин с бобовыми — такой ритм выстраивается за 3 дня и удерживается без усилий.",
    ],
    meta: {
      date: "Сегодня", time: "9:00 — 9:45",
      location: "Онлайн", locationSub: "Материалы в приложении",
      participants: 34, plusN: "+29", joinLabel: "Присоединиться",
    },
  },
  2: {
    title: "Программа весенней подготовки",
    coverUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?crop=entropy&cs=tinysrgb&fit=crop&w=800&h=400&q=80",
    authorName: "Мария Кузнецова",
    authorAvatarUrl: UNSPLASH.avatarMaria,
    badgeDate: "Сегодня в 11:00",
    paragraphs: [
      "Весенняя подготовка — это плавный переход от зимнего режима к активному сезону. Резкие нагрузки после паузы приводят к травмам, поэтому первые 2 недели посвящены мобилизации и базовой выносливости.",
      "В программе 3 тренировки в неделю: лёгкий бег или ходьба в темпе, функциональная тренировка и растяжка. Каждая сессия занимает не более 60 минут.",
      "К концу месяца вы будете готовы к полноценным тренировкам и первым стартам сезона. Начнём вместе — это проще, чем в одиночку.",
    ],
    meta: {
      date: "Сегодня", time: "11:00 — 12:00",
      location: "Парк Горького", locationSub: "Москва, главная аллея",
      participants: 19, plusN: "+14", joinLabel: "Записаться",
    },
  },
  3: {
    title: "Купить изотоники в продуктовом",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=crop&w=800&h=400&q=80",
    authorName: "Well Well Well",
    authorAvatarUrl: avatarBrand as unknown as string,
    badgeDate: "Сегодня в 13:30",
    paragraphs: [
      "Изотоники восполняют потери электролитов при длительных тренировках. Вода справляется до 60 минут активности, дальше нужна поддержка натрия, калия и магния.",
      "Не все изотоники одинаковые. Некоторые содержат слишком много сахара и скорее подходят для ультра-нагрузок. Мы составили короткий список того, что стоит положить в корзину.",
      "Альтернатива покупным: вода с щепоткой соли и лимонным соком. Работает не хуже, стоит в разы дешевле.",
    ],
    meta: {
      date: "Сегодня", time: "13:30 — 14:00",
      location: "Ближайший магазин", locationSub: "По пути после тренировки",
      participants: 8, plusN: "+3", joinLabel: "Отметить выполненным",
    },
  },
  4: {
    title: "Звонок с коллегами",
    coverUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=crop&w=800&h=400&q=80",
    authorName: "Гена Лохтин",
    authorAvatarUrl: UNSPLASH.avatarGena,
    badgeDate: "Сегодня в 16:00",
    paragraphs: [
      "Встреча команды для синхронизации по текущим задачам и дедлайнам. Формат короткий — не больше 60 минут, без долгих обсуждений, только статусы и блокеры.",
      "Повестка: прогресс по ключевым проектам, распределение приоритетов на неделю, вопросы которые невозможно решить асинхронно.",
      "Подготовьте короткий апдейт по своим задачам — 2-3 предложения, что сделано и что нужно для продвижения вперёд.",
    ],
    meta: {
      date: "Сегодня", time: "16:00 — 17:00",
      location: "Онлайн", locationSub: "Ссылка в календаре",
      participants: 6, plusN: "+1", joinLabel: "Подключиться",
    },
  },
  5: {
    title: "Челлендж: Вечерний цифровой детокс",
    coverUrl: challengeImg as unknown as string,
    authorName: "Гена Лохтин",
    authorAvatarUrl: UNSPLASH.avatarGena,
    badgeDate: "Сегодня в 21:30",
    paragraphs: [
      "Свет экрана вечером подавляет мелатонин и сдвигает циркадные часы. Давайте вместе откладывать телефон за 2 часа до сна и давать мозгу время на отдых.",
      "128 человек уже присоединились к этому плану. Многие отмечают, что уже через 3 дня качество сна заметно улучшается.",
      "Никаких созвонов, никаких обязательств — просто общее намерение и взаимная поддержка в комментариях.",
    ],
    meta: {
      date: "Сегодня", time: "21:30 — 22:15",
      location: "Онлайн", locationSub: "Из любой точки мира",
      participants: 128, plusN: "+123", joinLabel: "Присоединиться",
    },
  },
};

// ─── Shared components ────────────────────────────────────────────────────────

function BlueBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#1D9BF0" />
      <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommentsBlock({ comment, setComment }: { comment: string; setComment: (v: string) => void }) {
  return (
    <div className="bg-surface px-4 pt-[18px] pb-6">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-3.5 flex items-center gap-2">
        Комментарии <span className="text-[15px] font-normal text-gray-400">0</span>
      </h3>
      <div className="flex items-center gap-2.5 mb-[18px]">
        <img src={UNSPLASH.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 bg-input rounded-full px-3.5 py-[9px] flex items-center gap-2">
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Напишите комментарий..."
            className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder-gray-400 outline-none"
          />
          <button className="flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>
          {comment && <button><Share2 size={16} color={GREEN} /></button>}
        </div>
      </div>
      <div className="flex justify-center py-8">
        <p className="text-[13px] text-gray-400">Пока нет комментариев</p>
      </div>
    </div>
  );
}

// ─── Collapsible description ──────────────────────────────────────────────────

function CollapsibleText({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const fullText = paragraphs.join(" ");
  // ~4 lines ≈ 300 chars at this font size
  const threshold = 300;
  const needsClamp = fullText.length > threshold;

  return (
    <div>
      <p
        className="text-[14px] text-gray-600 leading-relaxed"
        style={!expanded && needsClamp ? {
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        } : {}}
      >
        {fullText}
      </p>
      {needsClamp && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[14px] font-semibold mt-1"
          style={{ color: GREEN }}
        >
          {expanded ? "Свернуть" : "Подробнее"}
        </button>
      )}
    </div>
  );
}

// ─── Unified EventDetailScreen ────────────────────────────────────────────────

interface EventDetailProps {
  title: string;
  coverSrc?: string;
  backgroundGradient?: string;
  authorName: string;
  authorAvatarUrl: string;
  authorVerified?: boolean;
  readTime?: string;
  badgeDate: string;
  paragraphs: string[];
  meta: EventMeta;
  onBack: () => void;
  initiallyJoined?: boolean;
  onProfile?: () => void;
}

function EventDetailScreen({
  title, coverSrc, backgroundGradient, authorName, authorAvatarUrl, authorVerified,
  readTime, badgeDate, paragraphs, meta, onBack, initiallyJoined, onProfile,
}: EventDetailProps) {
  const [joined, setJoined] = useState(initiallyJoined ?? false);
  const [sheet, setSheet] = useState<"participants" | "profile" | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const description = paragraphs.join(" ");
  const participantAvatars = DETAIL_AVATARS;
  const organizerAction = onProfile ?? (() => setSheet("profile"));
  const needsDescriptionClamp = description.length > 260;

  return (
    <div className="relative h-full overflow-hidden bg-black">
      {coverSrc ? (
        <img src={coverSrc} alt={title} className="fixed inset-0 h-[100dvh] w-full object-cover" />
      ) : (
        <div className="fixed inset-0 h-[100dvh]" style={{ background: backgroundGradient ?? `linear-gradient(135deg, ${GREEN} 0%, #111827 100%)` }} />
      )}
      <div
        className="fixed inset-0 min-h-[100dvh]"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.30) 62%, rgba(0,0,0,0.55) 100%)" }}
      />

      <button
        onClick={onBack}
        className="absolute left-4 z-20 w-10 h-10 rounded-full bg-black/35 flex items-center justify-center"
        style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <ArrowLeft size={20} strokeWidth={2} color="#fff" />
      </button>

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="min-h-[62vh] px-6 pt-20 pb-[22px] flex flex-col items-center justify-end text-center">
          <h1
            className="max-w-[345px] text-[30px] leading-9 font-bold text-white"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          <div className="mt-4 max-w-[345px] text-[16px] leading-[1.4] text-white/90">
            <p>{meta.time} · {meta.date}</p>
            {meta.location && meta.location !== "Онлайн" && (
              <p>{meta.location}</p>
            )}
          </div>

          <div className="mt-[26px] w-full max-w-[345px] rounded-full bg-white/10 p-1 flex items-stretch backdrop-blur-sm">
            {[
              { value: "going" as const, label: "Иду", Icon: Check },
              { value: "notGoing" as const, label: "Не иду", Icon: X },
            ].map((item) => {
              const active = item.value === "going" ? joined : !joined;
              const Icon = item.Icon;
              return (
                <div key={item.value} className="flex flex-1 items-center">
                  <button
                    onClick={() => setJoined(item.value === "going")}
                    className="py-[11px] flex-1 rounded-[26px] flex flex-col items-center justify-center gap-[5px] transition-colors"
                    style={active ? { backgroundColor: "#fff", color: GREEN } : { color: "rgba(255,255,255,0.85)" }}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                    <span className="text-[15px] font-semibold">{item.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-t-xl bg-white/15 px-[18px] pt-5 pb-5 text-white backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <button onClick={organizerAction} className="flex min-w-0 items-center gap-2.5 text-left active:opacity-80">
                <img src={authorAvatarUrl} alt={authorName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <span className="truncate text-[15px] font-medium text-white">{authorName}</span>
              </button>
              <button
                onClick={() => setSubscribed((value) => !value)}
                className="rounded-full border px-3.5 py-[7px] text-[12px] font-semibold uppercase tracking-[0.4px] text-white flex-shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.5)" }}
              >
                {subscribed ? "Подписан" : "Подписаться"}
              </button>
            </div>

            <div className="mb-4 text-[14px] leading-[1.5] text-white/90">
              <p
                style={!descriptionExpanded && needsDescriptionClamp ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                } : undefined}
              >
                {description}
              </p>
              {needsDescriptionClamp && (
                <button
                  onClick={() => setDescriptionExpanded((value) => !value)}
                  className="inline text-[14px] font-medium"
                  style={{ color: GREEN }}
                >
                  {descriptionExpanded ? "Свернуть" : "Подробнее"}
                </button>
              )}
            </div>

            <div className="mb-4 h-px bg-white/20" style={{ height: 0.5 }} />

            <div className="mb-3.5 flex items-start gap-3">
              <Calendar size={20} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-white/70" />
              <div>
                <p className="text-[14px] text-white">{meta.date}</p>
                <p className="text-[13px] text-white/65">{meta.time}</p>
              </div>
            </div>

            {meta.location && (
              <div className="mb-4 flex items-start gap-3">
                <MapPin size={20} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-white/70" />
                <div>
                  <p className="text-[14px] text-white">{meta.location}</p>
                  {meta.locationSub && <p className="text-[13px] text-white/65">{meta.locationSub}</p>}
                </div>
              </div>
            )}

            <button
              onClick={() => setSheet("participants")}
              className="w-full flex items-center justify-between gap-3 text-left active:opacity-85"
            >
              <div className="flex items-center gap-3">
                <Users size={20} strokeWidth={1.8} className="flex-shrink-0 text-white/70" />
                <span className="text-[14px] text-white">{meta.participants} участников</span>
              </div>
              <div className="flex -space-x-2">
                {participantAvatars.slice(0, 3).map((url, i) => (
                  <img key={i} src={url} alt="" className="w-7 h-7 rounded-full border object-cover" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
                ))}
                <div className="w-7 h-7 rounded-full border bg-white/20 flex items-center justify-center" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                  <span className="text-[10px] font-bold text-white">{meta.plusN}</span>
                </div>
              </div>
            </button>
          </div>

          <CommentsBlock comment={comment} setComment={setComment} />
        </div>
      </div>

      {sheet === "participants" && (
        <HomeSheet title="Участники" onClose={() => setSheet(null)}>
          <div className="space-y-2">
            {participantAvatars.map((url, i) => (
              <button key={i} className="w-full rounded-2xl bg-gray-100 px-4 py-3 flex items-center gap-3 text-left">
                <img src={url} alt="" className="w-9 h-9 rounded-full object-cover" />
                <span className="text-[15px] font-medium text-gray-900">Участник {i + 1}</span>
              </button>
            ))}
            <p className="pt-2 text-center text-[13px] text-gray-400">И ещё {meta.plusN} участников</p>
          </div>
        </HomeSheet>
      )}

      {sheet === "profile" && (
        <HomeSheet title="Профиль" onClose={() => setSheet(null)}>
          <div className="flex flex-col items-center py-4 text-center">
            <img src={authorAvatarUrl} alt={authorName} className="w-16 h-16 rounded-full object-cover" />
            <p className="mt-3 text-[17px] font-semibold text-gray-900">{authorName}</p>
            <p className="mt-1 text-[14px] text-gray-400">Профиль организатора в работе.</p>
          </div>
        </HomeSheet>
      )}
    </div>
  );
}

// ─── Screen: Plan Detail ──────────────────────────────────────────────────────

function DetailScreen({ onNavigate, backTo }: { onNavigate: (s: Screen) => void; backTo: Screen }) {
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

function ArticleScreen({ article, onBack, onProfile }: { article: Article; onBack: () => void; onProfile?: () => void }) {
  const coverSrc = (article.coverUrl as string) ?? (challengeImg as unknown as string);
  const avatarUrl = article.avatarUrl ?? (UNSPLASH.userAvatar as string);
  return (
    <EventDetailScreen
      title={article.title}
      coverSrc={coverSrc}
      authorName={article.author}
      authorAvatarUrl={avatarUrl}
      authorVerified={article.authorVerified}
      readTime={article.readTime}
      badgeDate="22 июня 2026"
      paragraphs={articleBodies[article.id] ?? [article.excerpt]}
      meta={eventMeta[article.id] ?? eventMeta[1]}
      onBack={onBack}
      onProfile={onProfile}
    />
  );
}

// ─── Screen: Search ────────────────────────────────────────────────────────────

function SearchScreen({ onBack, onArticle }: { onBack: () => void; onArticle: (a: Article) => void }) {
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

// ─── Screen: Profile ─────────────────────────────────────────────────────────

const habits = [
  { icon: "🌅", name: "Утренняя зарядка", done: 7, total: 7, streak: 14 },
  { icon: "📖", name: "Чтение 20 минут", done: 5, total: 7, streak: 5 },
  { icon: "🧘", name: "Медитация", done: 4, total: 7, streak: 4 },
  { icon: "📵", name: "Без гаджетов до 9 утра", done: 6, total: 7, streak: 9 },
];

const myEvents = [
  { id: 3, title: "Челлендж: Вечерний детокс", date: "22 июня 2026", cover: cover2 as unknown as string },
  { id: 2, title: "Программа весенней подготовки", date: "5 июля 2026", cover: cover3 as unknown as string },
  { id: 4, title: "Полумарафон", date: "15 сентября 2026", cover: cover1 as unknown as string },
];

const myArticles = [
  { id: 3, title: "Челлендж: Вечерний цифровой детокс", readTime: "8 мин чтения", cover: cover2 as unknown as string },
  { id: 1, title: "Well Well Well — качалка привычек", readTime: "2 мин чтения", cover: cover4 as unknown as string },
];

const subscriptionAvatars = [
  UNSPLASH.avatarMaria,
  UNSPLASH.avatarGena,
  UNSPLASH.avatarDmitry,
  P_AVATARS.w2,
  P_AVATARS.m1,
];

function ProfileCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <p className="text-[15px] font-semibold text-gray-900">{title}</p>
      {action && (
        <button onClick={onAction} className="text-[13px] font-medium" style={{ color: GREEN }}>{action}</button>
      )}
    </div>
  );
}

function ProfileScreen(_props: {
  onNavigate: (s: Screen, from?: Screen) => void;
  onArticle: (a: Article) => void;
  onPlanOpen: (id: number) => void;
}) {
  return <WorkInProgress />;
}

function ProfileScreenOld({
  onNavigate,
  onArticle,
  onPlanOpen,
}: {
  onNavigate: (s: Screen, from?: Screen) => void;
  onArticle: (a: Article) => void;
  onPlanOpen: (id: number) => void;
}) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F0F1F3" }}>
      <div className="flex-1 overflow-y-auto py-4 space-y-3">

        {/* Header card */}
        <ProfileCard>
          <div className="px-4 pt-5 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={UNSPLASH.userAvatar}
                  alt="Аватар"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[17px] font-bold text-gray-900">Алина Морозова</span>
                    <BlueBadge />
                  </div>
                  <p className="text-[13px] text-gray-500">Эксперт по сну и восстановлению</p>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
            </div>
            <button
              className="w-full py-2.5 rounded-xl border-2 text-[14px] font-semibold"
              style={{ borderColor: GREEN, color: GREEN }}
            >
              Редактировать профиль
            </button>
          </div>

          {/* Stats row */}
          <div className="flex border-t border-gray-100">
            {[
              { value: "1 243", label: "подписчика" },
              { value: "47", label: "подписок" },
              { value: "8", label: "привычек" },
            ].map(({ value, label }, i) => (
              <div key={label} className={`flex-1 py-3 flex flex-col items-center ${i < 2 ? "border-r border-gray-100" : ""}`}>
                <span className="text-[18px] font-bold text-gray-900">{value}</span>
                <span className="text-[11px] text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </ProfileCard>

        {/* Habits */}
        <ProfileCard>
          <SectionHeader title="Мои привычки" action="Показать все" onAction={() => onNavigate("plans")} />
          <div className="px-4 pb-4 space-y-3">
            {habits.map((h) => (
              <div key={h.name} className="flex items-center gap-3">
                <span className="text-[20px] w-8 text-center flex-shrink-0">{h.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-gray-800">{h.name}</span>
                    <span className="text-[11px] font-semibold" style={{ color: GREEN }}>{h.done}/{h.total} дней</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(h.done / h.total) * 100}%`, backgroundColor: GREEN }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <span className="text-[11px]">🔥</span>
                  <span className="text-[11px] font-semibold text-gray-500">{h.streak}</span>
                </div>
              </div>
            ))}
          </div>
        </ProfileCard>

        {/* Activity */}
        <ProfileCard>
          <SectionHeader title="Активность" action="Полная аналитика" />
          <div className="px-4 pb-4 space-y-4">
            <div className="flex gap-3">
              {[
                { value: "12", label: "Планов\nвыполнено", color: GREEN },
                { value: "78%", label: "Выполнено\nза неделю", color: "#F59E0B" },
                { value: "4", label: "Дней\nподряд", color: "#6366F1" },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex-1 rounded-xl py-3 px-2 flex flex-col items-center gap-1" style={{ backgroundColor: color + "12" }}>
                  <span className="text-[20px] font-bold" style={{ color }}>{value}</span>
                  <span className="text-[10px] text-gray-400 text-center leading-tight whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-gray-400">Прогресс недели</span>
                <span className="text-[12px] font-semibold" style={{ color: GREEN }}>78%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "78%", backgroundColor: GREEN }} />
              </div>
            </div>
          </div>
        </ProfileCard>

        {/* My events */}
        <ProfileCard>
          <SectionHeader title="Мои события" action="Все события" />
          <div className="px-4 pb-4 space-y-2">
            {myEvents.map((ev) => (
              <button
                key={ev.id}
                onClick={() => onPlanOpen(ev.id)}
                className="w-full flex items-center gap-3 p-2 rounded-xl active:bg-gray-50 text-left"
              >
                <img src={ev.cover} alt={ev.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 truncate">{ev.title}</p>
                  <p className="text-[11px] text-gray-400">{ev.date}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </ProfileCard>

        {/* My articles (expert) */}
        <ProfileCard>
          <SectionHeader title="Мои статьи" action="Все материалы" />
          <div className="px-4 pb-4 space-y-2">
            {myArticles.map((art) => {
              const article = articles.find(a => a.id === art.id)!;
              return (
                <button
                  key={art.id}
                  onClick={() => onArticle(article)}
                  className="w-full flex items-center gap-3 p-2 rounded-xl active:bg-gray-50 text-left"
                >
                  <img src={art.cover} alt={art.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug">{art.title}</p>
                    <p className="text-[11px] text-gray-400">{art.readTime}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              );
            })}
          </div>
        </ProfileCard>

        {/* Subscriptions */}
        <ProfileCard>
          <SectionHeader title="Подписки" action="Все подписки" />
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {subscriptionAvatars.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: GREEN }}
                >+42</div>
              </div>
              <button className="text-[13px] font-medium" style={{ color: GREEN }}>Смотреть всех</button>
            </div>
          </div>
        </ProfileCard>

        <div className="h-2" />
      </div>
    </div>
  );
}


const NO_BOTTOM_NAV: Screen[] = ["create", "article", "search", "planEvent", "detail"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [detailOrigin, setDetailOrigin] = useState<Screen>("plans");
  const [createOrigin, setCreateOrigin] = useState<Screen>("plans");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [articleOrigin, setArticleOrigin] = useState<Screen>("home");
  const [activePlanId, setActivePlanId] = useState<number>(1);
  const [planEventOrigin, setPlanEventOrigin] = useState<Screen>("plans");
  const [previousScreen, setPreviousScreen] = useState<Screen>("plans");

  const navigate = (s: Screen, from?: Screen) => {
    if (s === "detail" && from) setDetailOrigin(from);
    if (s === "create" && from) setCreateOrigin(from);
    setPreviousScreen(screen);
    setScreen(s);
  };

  const openArticle = (a: Article, from: Screen) => {
    setActiveArticle(a);
    setArticleOrigin(from);
    setScreen("article");
  };

  const openPlanEvent = (id: number, from: Screen = "plans") => {
    setActivePlanId(id);
    setPlanEventOrigin(from);
    setPreviousScreen(screen);
    setScreen("planEvent");
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onNavigate={navigate} onPlanOpen={openPlanEvent} />;
      case "plans":
        return <PlansScreen onNavigate={navigate} onPlanOpen={openPlanEvent} />;
      case "create":
        return <CreateScreen onNavigate={navigate} backTo={createOrigin} />;
      case "detail":
        return <DetailScreen onNavigate={navigate} backTo={detailOrigin} />;
      case "article":
        return activeArticle
          ? <ArticleScreen article={activeArticle} onBack={() => setScreen(articleOrigin)} onProfile={() => setScreen("profile")} />
          : null;
      case "search":
        return <SearchScreen onBack={() => setScreen("home")} onArticle={a => openArticle(a, "search")} />;
      case "profile":
        return (
          <ProfileScreen
            onNavigate={navigate}
            onArticle={a => openArticle(a, "profile" as Screen)}
            onPlanOpen={id => { openPlanEvent(id); }}
          />
        );
      case "planEvent": {
        const ev = planEvents[activePlanId];
        const feedPlan = homeFeedPlans.find(plan => plan.id === activePlanId);
        if (feedPlan) {
          return (
            <EventDetailScreen
              title={feedPlan.title}
              coverSrc={feedPlan.coverUrl as string | undefined}
              backgroundGradient={feedPlan.gradient}
              authorName={feedPlan.author.name}
              authorAvatarUrl={feedPlan.author.avatarUrl}
              badgeDate={feedPlan.timeDate}
              paragraphs={[feedPlan.description]}
              meta={{
                date: feedPlan.timeDate,
                time: feedPlan.timeDate,
                location: feedPlan.address ?? "",
                locationSub: "",
                participants: Math.max(feedPlan.participants.length, 1),
                plusN: feedPlan.participantsLabel,
                joinLabel: "Присоединиться",
              }}
              onBack={() => setScreen(planEventOrigin)}
              initiallyJoined={true}
              onProfile={() => setScreen("profile")}
            />
          );
        }
        return ev ? (
          <EventDetailScreen
            title={ev.title}
            coverSrc={ev.coverUrl}
            authorName={ev.authorName}
            authorAvatarUrl={ev.authorAvatarUrl}
            badgeDate={ev.badgeDate}
            paragraphs={ev.paragraphs}
            meta={ev.meta}
            onBack={() => setScreen(planEventOrigin)}
            initiallyJoined={true}
            onProfile={() => setScreen("profile")}
          />
        ) : null;
      }
    }
  };

  const showNav = !NO_BOTTOM_NAV.includes(screen);

  return (
    <div
      className="flex flex-col w-full h-screen overflow-hidden bg-white"
      style={{ fontFamily: "var(--font-sans)", height: "100dvh" }}
    >
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
      {showNav && (
        <div className="flex-shrink-0 flex items-center justify-around border-t border-gray-200 bg-white px-2 pb-safe pt-2"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
        >
          {([
            { id: "home" as Screen, label: "Главная", Icon: Home },
            { id: "plans" as Screen, label: "Планы", Icon: Calendar },
            { id: "profile" as Screen, label: "Профиль", Icon: User },
          ] as { id: Screen; label: string; Icon: React.FC<{ size: number; strokeWidth: number; color: string }> }[]).map(({ id, label, Icon }) => {
            const isActive = screen === id || (id === "plans" && (screen === "detail" || screen === "planEvent" || screen === "create")) || (id === "home" && screen === "search");
            return (
              <button key={id} onClick={() => navigate(id)} className="flex flex-col items-center gap-0.5 px-4 py-1">
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.7} color={isActive ? GREEN : "#9CA3AF"} />
                <span className="text-[11px] font-medium" style={{ color: isActive ? GREEN : "#9CA3AF" }}>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
