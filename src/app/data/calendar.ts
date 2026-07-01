import type { Period } from "@/app/types";

export const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const weekDates = [29, 30, 1, 2, 3, 4, 5];
export const weekDateMonths = ["июня", "июня", "июля", "июля", "июля", "июля", "июля"];
export const PERIODS = ["День", "Неделя", "Месяц"] as const;
export const weekRanges = [
  "22–28 июня 2026",
  "15–21 июня 2026",
  "8–14 июня 2026",
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
