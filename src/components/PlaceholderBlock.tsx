type PlaceholderBlockProps = {
  label: React.ReactNode;
  className?: string;
  tone?: "warm" | "cool" | "dark";
};

const TONES: Record<string, { a: string; b: string }> = {
  warm: { a: "#e6e2dc", b: "#f0ede7" },
  cool: { a: "#c8d5d0", b: "#d8e5e0" },
  dark: { a: "#1c1c1c", b: "#181818" },
};

export default function PlaceholderBlock({
  label,
  className = "",
  tone = "warm",
}: PlaceholderBlockProps) {
  const { a, b } = TONES[tone];
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(-45deg, ${a} 0, ${a} 3px, ${b} 3px, ${b} 14px)`,
      }}
    >
      <div className="rounded-md bg-white/85 px-4 py-2.5 text-center text-[11px] leading-relaxed text-[#777]" style={{ fontFamily: "'Courier New', monospace" }}>
        {label}
      </div>
    </div>
  );
}
