import type { Period } from "@/app/types";

export const weekDays = ["Ср", "Чт", "Пт", "Сб", "Вс", "Пн", "Вт"];
export const weekDates = [1, 2, 3, 4, 5, 6, 7];
export const weekDateMonths = ["июля", "июля", "июля", "июля", "июля", "июля", "июля"];
export const PERIODS = ["День", "Неделя", "Месяц"] as const;
export const weekRanges = [
  "1–7 июля 2026",
  "8–14 июля 2026",
  "15–21 июля 2026",
];

export const chartData = [
  { day: "Пнд", value: 80 },
  { day: "Втр", value: 60 },
  { day: "Срд", value: 100 },
  { day: "Чтв", value: 40 },
  { day: "Птн", value: 90 },
  { day: "Суб", value: 30 },
  { day: "Вск", value: 0 },
];
