import { useState } from "react";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import type { ExpertProfile } from "@/app/data/profile";
import { GREEN } from "@/app/data/constants";

export function EditProfileScreen({
  profile,
  onBack,
  onSave,
}: {
  profile: ExpertProfile;
  onBack: () => void;
  onSave: (profile: ExpertProfile) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const handlePhotoPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhotoUrl(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleSave = () => {
    onSave({
      ...profile,
      name: name.trim() || profile.name,
      bio: bio.trim(),
      photoUrl,
    });
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-14 flex-shrink-0 items-center justify-between px-4">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-start">
          <ArrowLeft size={20} strokeWidth={2.2} color="var(--foreground)" />
        </button>
        <h1 className="text-[16px] font-semibold leading-6 text-foreground">Редактировать</h1>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <label className="relative mb-5 block aspect-[1.9/1] overflow-hidden rounded-xl bg-gray-200">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary">
              <span className="text-[42px] font-bold" style={{ color: GREEN }}>{initials}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/25" />
          <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-medium text-white">
            <ImageIcon size={14} strokeWidth={2} />
            Изменить фото
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoPick} />
        </label>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-[13px] leading-4 text-muted-foreground">Имя</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 w-full rounded-xl bg-card px-4 text-[15px] text-foreground outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] leading-4 text-muted-foreground">Био</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={5}
              className="min-h-[120px] w-full resize-none rounded-xl bg-card px-4 py-3.5 text-[15px] leading-5 text-foreground outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border bg-card px-4 pb-4 pt-3">
        <button
          onClick={handleSave}
          className="h-12 w-full rounded-xl text-[15px] font-semibold text-white"
          style={{ backgroundColor: GREEN }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
