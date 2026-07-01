import { Construction } from "lucide-react";
import { GREEN } from "@/app/data/constants";

export function WorkInProgress() {
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
