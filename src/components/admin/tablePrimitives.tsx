export const TH_CLASS =
  "font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[#888] px-4 py-3 text-left";
export const TD_CLASS =
  "px-4 py-3.5 text-sm text-[#333] border-b border-redro-border";

type PaginationProps = {
  pageIndex: number;
  pageCount: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function TablePagination({
  pageIndex,
  pageCount,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-redro-border px-4 py-3">
      <span className="text-xs text-[#888]">
        Page {pageIndex + 1} of {pageCount}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className="rounded-[7px] border border-redro-border bg-white px-3 py-1.5 text-sm font-medium text-[#333] transition-colors hover:bg-redro-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="rounded-[7px] border border-redro-border bg-white px-3 py-1.5 text-sm font-medium text-[#333] transition-colors hover:bg-redro-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

type FilterTab = { key: string; label: string; count: number };

export function FilterTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: FilterTab[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 rounded-[7px] px-3.5 py-2 font-display text-[13px] font-semibold transition-colors ${
              isActive
                ? "bg-redro-red text-white"
                : "bg-white text-[#666] hover:bg-redro-cream"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                isActive ? "bg-white/25 text-white" : "bg-redro-cream text-[#888]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
