import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export default function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="flex items-start justify-between rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div>
        <div className="font-display text-3xl font-black text-redro-red">
          {value}
        </div>
        <div className="mt-1 text-sm text-[#666]">{label}</div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-redro-tint p-2 text-redro-red">
        <Icon size={20} strokeWidth={2} />
      </div>
    </div>
  );
}
