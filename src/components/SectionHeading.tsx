type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="mb-4 inline-flex items-center gap-3">
        <div className="h-[1.5px] w-7 bg-redro-red" />
        <span className="font-display text-[11px] font-bold tracking-[0.12em] text-redro-red uppercase">
          {eyebrow}
        </span>
        <div className="h-[1.5px] w-7 bg-redro-red" />
      </div>
      <h2 className="font-display text-[clamp(2rem,7vw,46px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-[#111] lg:text-[46px] lg:leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-[1.7] text-[#666] sm:text-[17px]">{subtitle}</p>
      )}
    </div>
  );
}
