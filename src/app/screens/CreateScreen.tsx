import { useState } from "react";
import { ArrowLeft, Calendar, Check, ChevronDown, Clock, Eye, Image as ImageIcon, Lock, MapPin, Plus, Repeat2, Trash2, Users, Video } from "lucide-react";
import type { PartOfDay, PlanRepeat, Schedule, Screen, TimeMode, Visibility } from "@/app/types";
import { ALL_DAYS, EVENT_PARTICIPANTS, GREEN, GREEN_LIGHT, PART_OF_DAY_RANGES, VISIBILITY_OPTIONS, WEEKDAY_VALUES } from "@/app/data/constants";

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
    <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-input">
      <Plus size={16} strokeWidth={2.2} color="var(--muted-foreground)" />
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
      className="w-full bg-card rounded-xl px-4 py-3.5 flex items-center gap-3 text-left active:opacity-70 transition-opacity"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-secondary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-foreground">{label}</p>
        {subtitle && <p className="text-[12px] text-muted-foreground mt-0.5 leading-4">{subtitle}</p>}
      </div>
      {control}
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card px-4 py-4">
      {children}
    </div>
  );
}

export function CreateScreen({ onNavigate, backTo = "plans" }: { onNavigate: (s: Screen) => void; backTo?: Screen }) {
  const getLocalDateTime = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  const splitDateTime = (value: string) => {
    const [date = "", time = ""] = value.split("T");
    return { date, time };
  };

  const initialDateTime = getLocalDateTime();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [timeMode, setTimeMode] = useState<TimeMode>("partOfDay");
  const [partOfDay, setPartOfDay] = useState<PartOfDay | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [exactStart, setExactStart] = useState(initialDateTime);
  const [exactEnd, setExactEnd] = useState(initialDateTime);
  const [repeat, setRepeat] = useState<PlanRepeat>({ type: "days", days: 21 });
  const [showRepeatPicker, setShowRepeatPicker] = useState(false);
  const [untilWeek, setUntilWeek] = useState(4);
  const [scheduleError, setScheduleError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [showParticipantsPicker, setShowParticipantsPicker] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoCopied, setVideoCopied] = useState(false);

  const startParts = splitDateTime(exactStart);
  const endParts = splitDateTime(exactEnd);
  const selectedParticipantItems = EVENT_PARTICIPANTS.filter((participant) =>
    selectedParticipants.includes(participant.id)
  );

  const repeatLabel =
    repeat.type === "days"
      ? `${repeat.days} день`
      : repeat.type === "weekly"
        ? "Каждую неделю"
        : repeat.type === "untilWeek"
          ? `До недели ${repeat.week}`
          : "Бессрочно";

  const isScheduleValid =
    timeMode === "partOfDay"
      ? Boolean(partOfDay) && selectedDays.length > 0
      : Boolean(exactStart);
  const isFormValid = title.trim().length > 0 && isScheduleValid;

  const switchTimeMode = (mode: TimeMode) => {
    setTimeMode(mode);
    setScheduleError("");
    if (mode === "exact" && !exactEnd) setExactEnd(exactStart);
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
    setScheduleError("");
  };

  const updateStartPart = (part: "date" | "time", value: string) => {
    const nextDate = part === "date" ? value : startParts.date;
    const nextTime = part === "time" ? value : startParts.time;
    const next = `${nextDate}T${nextTime || "00:00"}`;
    setExactStart(next);
    if (!exactEnd || endParts.date === startParts.date) {
      setExactEnd(`${nextDate}T${endParts.time || nextTime || "00:00"}`);
    }
    setScheduleError("");
  };

  const updateEndPart = (part: "date" | "time", value: string) => {
    const nextDate = part === "date" ? value : endParts.date || startParts.date;
    const nextTime = part === "time" ? value : endParts.time;
    setExactEnd(`${nextDate}T${nextTime || "00:00"}`);
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

  const schedule: Schedule = timeMode === "partOfDay"
    ? {
        mode: "partOfDay",
        timeMode: "partOfDay",
        time: null,
        partOfDay,
        weekdays: selectedDays,
        repeat,
      }
    : {
        mode: "exact",
        timeMode: "exact",
        time: null,
        partOfDay: null,
        weekdays: [],
        start: exactStart ? new Date(exactStart).toISOString() : "",
        end: exactEnd ? new Date(exactEnd).toISOString() : "",
        repeat,
      };

  const videoMeeting = {
    enabled: videoEnabled,
    link: videoEnabled ? videoLink : "",
  };

  const validateSchedule = () => {
    if (timeMode === "partOfDay") {
      if (!partOfDay) return "Выберите время суток";
      if (selectedDays.length === 0) return "Выберите хотя бы один день недели";
    }
    if (timeMode === "exact" && !exactStart) {
      return "Выберите дату и время начала";
    }
    return "";
  };

  const handleCreate = () => {
    const nextTitleError = title.trim() ? "" : "Введите название";
    const nextScheduleError = validateSchedule();

    setTitleError(nextTitleError);
    setScheduleError(nextScheduleError);

    if (nextTitleError || nextScheduleError) return;

    const plan = {
      title: title.trim(),
      description: description.trim(),
      coverImage,
      visibility,
      participants: selectedParticipants,
      videoMeeting,
      schedule,
    };

    console.log(plan);
    onNavigate(backTo);
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-14 flex-shrink-0 items-center justify-between px-4">
        <button onClick={() => onNavigate(backTo)} className="flex h-10 w-10 items-center justify-start">
          <X size={20} strokeWidth={2.2} color="var(--foreground)" />
        </button>
        <h1 className="text-[16px] font-semibold leading-6 text-foreground">Новый план</h1>
        <button
          onClick={handleCreate}
          disabled={!isFormValid}
          className="text-[15px] font-medium leading-5 disabled:opacity-100"
          style={{ color: isFormValid ? GREEN : "var(--muted-foreground)" }}
        >
          Создать
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="relative mb-4 aspect-[1.9/1] overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, var(--brand-bright) 0%, var(--accent) 48%, var(--brand-dark) 100%)" }}>
          {coverImage && <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          {coverImage && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-alpha-overlay-55" />}
          <label className="absolute left-4 top-4 z-10 flex cursor-pointer items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-medium text-white">
            <ImageIcon size={14} strokeWidth={2} />
            {coverImage ? "Изменить" : "Обложка"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
          </label>
          <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center px-8 text-center">
            <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
            <input
              value={title}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              placeholder="Название плана"
              className={`w-full bg-transparent text-center font-bold text-white placeholder:text-white/60 outline-none ${coverImage ? "text-[28px] leading-[34px]" : "text-[26px] leading-[34px]"}`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            />
            {!coverImage && (
              <>
                <div className="mt-3 h-px w-24 bg-white/50" />
                <p className="mt-3 text-[12px] leading-4 text-white/80">Тап, чтобы заполнить</p>
              </>
            )}
          </label>
        </div>

        {titleError && <p className="-mt-2 mb-3 text-[12px] font-medium text-destructive">{titleError}</p>}

        <div className="mb-5">
          <label className="mb-2 block text-[13px] leading-4 text-muted-foreground">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            placeholder="Опишите, зачем нужен план, что предстоит делать и какой результат получит участник"
            rows={3}
            className="min-h-[88px] w-full resize-none overflow-hidden rounded-lg bg-card px-3.5 py-3.5 text-[14px] leading-5 text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        <div className="space-y-4">
          <SectionCard>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] leading-4 text-muted-foreground">Время</p>
                <button
                  onClick={() => switchTimeMode(timeMode === "partOfDay" ? "exact" : "partOfDay")}
                  className="flex items-center gap-1.5 text-[14px] font-medium"
                  style={{ color: GREEN }}
                >
                  <Clock size={15} strokeWidth={2} />
                  {timeMode === "partOfDay" ? "Точное время" : "Время суток"}
                </button>
              </div>

              {timeMode === "partOfDay" ? (
                <>
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
                          className="rounded-full border px-3 py-2.5 text-[14px] font-medium"
                          style={active ? { backgroundColor: GREEN, borderColor: GREEN, color: "#fff" } : { borderColor: "var(--border)", color: "var(--foreground)" }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-[18px]">
                    <p className="mb-3 text-[13px] leading-4 text-muted-foreground">Дни недели</p>
                    <div className="grid grid-cols-7 gap-[5px]">
                      {ALL_DAYS.map((day, i) => {
                        const value = WEEKDAY_VALUES[i];
                        const active = selectedDays.includes(value);
                        return (
                          <button
                            key={day}
                            onClick={() => toggleDay(value)}
                            className="aspect-square rounded-full border text-[12px] font-semibold"
                            style={active ? { backgroundColor: GREEN, borderColor: GREEN, color: "#fff" } : { borderColor: "var(--border)", color: "var(--foreground)" }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: "Начало", date: startParts.date, time: startParts.time, onDate: (value: string) => updateStartPart("date", value), onTime: (value: string) => updateStartPart("time", value) },
                    { label: "Окончание", date: endParts.date || startParts.date, time: endParts.time, onDate: (value: string) => updateEndPart("date", value), onTime: (value: string) => updateEndPart("time", value) },
                  ].map((row) => (
                    <div key={row.label} className="rounded-lg border border-border px-3.5 py-3">
                      <p className="mb-2 text-[13px] font-medium text-foreground">{row.label}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <label>
                          <span className="mb-1 block text-[12px] leading-4 text-muted-foreground">Дата</span>
                          <input type="date" value={row.date} onChange={(e) => row.onDate(e.target.value)} className="w-full bg-transparent text-[14px] leading-5 text-foreground outline-none" />
                        </label>
                        <label>
                          <span className="mb-1 block text-[12px] leading-4 text-muted-foreground">Время</span>
                          <input type="time" value={row.time} onChange={(e) => row.onTime(e.target.value)} className="w-full bg-transparent text-[14px] leading-5 text-foreground outline-none" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-[18px]">
                <button
                  onClick={() => setShowRepeatPicker((show) => !show)}
                  className="flex w-full items-center justify-between rounded-lg bg-card px-3.5 py-3 text-left"
                >
                  <span className="flex items-center gap-2 text-[14px] leading-5 text-foreground">
                    <Repeat2 size={18} strokeWidth={1.9} color="var(--muted-foreground)" />
                    Повторение
                  </span>
                  <span className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
                    {repeatLabel}
                    <ChevronDown size={16} strokeWidth={2} />
                  </span>
                </button>

                {showRepeatPicker && (
                  <div className="mt-2 rounded-lg bg-card p-2">
                    {[
                      { label: "21 день", action: () => setRepeat({ type: "days", days: 21 }), active: repeat.type === "days" },
                      { label: "Каждую неделю", action: () => setRepeat({ type: "weekly" }), active: repeat.type === "weekly" },
                      { label: "До недели N", action: () => setRepeat({ type: "untilWeek", week: untilWeek }), active: repeat.type === "untilWeek" },
                      { label: "Бессрочно", action: () => setRepeat({ type: "forever" }), active: repeat.type === "forever" },
                    ].map((option) => (
                      <button
                        key={option.label}
                        onClick={option.action}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[14px] font-medium"
                        style={option.active ? { backgroundColor: GREEN_LIGHT, color: GREEN } : { color: "var(--foreground)" }}
                      >
                        {option.label}
                        {option.active && <Check size={16} strokeWidth={2.4} />}
                      </button>
                    ))}
                    {repeat.type === "untilWeek" && (
                      <label className="mt-2 block rounded-md bg-input px-3 py-2.5">
                        <span className="mb-1 block text-[12px] text-muted-foreground">Номер недели</span>
                        <input
                          type="number"
                          min={1}
                          value={repeat.week}
                          onChange={(e) => {
                            const week = Math.max(1, Number(e.target.value) || 1);
                            setUntilWeek(week);
                            setRepeat({ type: "untilWeek", week });
                          }}
                          className="w-full bg-transparent text-[14px] text-foreground outline-none"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {scheduleError && <p className="mt-3 text-[12px] font-medium text-destructive">{scheduleError}</p>}
            </div>
          </SectionCard>

          <div className="space-y-2">
            <button
              onClick={() => setVisibility((value) => value === "all" ? "onlyMe" : "all")}
              className="flex w-full items-center gap-3 rounded-xl bg-card px-4 py-3.5 text-left"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                {visibility === "all" ? <Eye size={17} strokeWidth={1.8} color={GREEN} /> : <Lock size={17} strokeWidth={1.8} color={GREEN} />}
              </div>
              <span className="flex-1 text-[15px] font-medium text-foreground">Видимость</span>
              <span className="text-[14px] text-muted-foreground">{visibility === "all" ? "Все" : "Только я"}</span>
            </button>

            <OptionRow
              icon={<Users size={17} strokeWidth={1.8} color={GREEN} />}
              label="Участники"
              onClick={() => setShowParticipantsPicker((show) => !show)}
              control={
                selectedParticipantItems.length > 0 ? (
                  <div className="flex -space-x-2">
                    {selectedParticipantItems.slice(0, 4).map((participant) => (
                      <img key={participant.id} src={participant.avatar} alt={participant.name} className="h-7 w-7 rounded-full border-2 border-card object-cover" />
                    ))}
                  </div>
                ) : (
                  <PlusButton />
                )
              }
            />

            {showParticipantsPicker && (
              <div className="rounded-xl bg-card p-2 space-y-1">
                {EVENT_PARTICIPANTS.map((participant) => {
                  const active = selectedParticipants.includes(participant.id);
                  return (
                    <button
                      key={participant.id}
                      onClick={() => toggleParticipant(participant.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
                      style={active ? { backgroundColor: GREEN_LIGHT } : undefined}
                    >
                      <img src={participant.avatar} alt={participant.name} className="h-8 w-8 rounded-full object-cover" />
                      <span className="flex-1 text-[14px] font-medium text-foreground">{participant.name}</span>
                      {active && <Check size={16} strokeWidth={2.5} color={GREEN} />}
                    </button>
                  );
                })}
              </div>
            )}

            <OptionRow
              icon={<Video size={17} strokeWidth={1.8} color={GREEN} />}
              label="Видеовстреча"
              subtitle={videoEnabled ? "Ссылка прикреплена" : undefined}
              onClick={() => {
                setVideoEnabled((enabled) => {
                  const nextEnabled = !enabled;
                  if (nextEnabled && !videoLink) setVideoLink("https://meet.wellwellwell.local/plan");
                  return nextEnabled;
                });
              }}
              control={
                <div className="h-6 w-11 rounded-full p-0.5 transition-colors" style={{ backgroundColor: videoEnabled ? "var(--component-switch-on)" : "var(--component-switch-off)" }}>
                  <div className="h-5 w-5 rounded-full bg-card transition-transform" style={{ transform: videoEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              }
            />

            {videoEnabled && (
              <div className="rounded-xl bg-card px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-[14px] text-foreground">{videoLink}</span>
                  <button
                    onClick={async () => {
                      await navigator.clipboard?.writeText(videoLink);
                      setVideoCopied(true);
                      window.setTimeout(() => setVideoCopied(false), 1200);
                    }}
                    className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold"
                    style={{ color: GREEN }}
                  >
                    <Copy size={13} strokeWidth={2.2} />
                    {videoCopied ? "Скопировано" : "Копировать"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-3" />
      </div>

      <div className="flex-shrink-0 border-t border-border bg-card px-4 pb-4 pt-3">
        <button
          onClick={handleCreate}
          disabled={!isFormValid}
          className="h-12 w-full rounded-xl text-[15px] font-semibold text-white disabled:opacity-45"
          style={{ backgroundColor: GREEN }}
        >
          Создать план
        </button>
      </div>
    </div>
  );
}

// ─── Event data per article ───────────────────────────────────────────────────
