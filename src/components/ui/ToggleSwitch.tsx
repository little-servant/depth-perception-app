type ToggleSwitchProps = {
  labelKo: string;
  labelEn: string;
  checked: boolean;
  onChange: () => void;
};

export function ToggleSwitch({ labelKo, labelEn, checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      aria-checked={checked}
      className="panel-line flex w-full items-center justify-between gap-4 rounded-[20px] px-4 py-3 text-left transition-colors duration-200 hover:border-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131a]"
      onClick={onChange}
      role="switch"
      tabIndex={0}
      type="button"
    >
      <div>
        <p className="text-sm font-semibold text-text-primary">{labelKo}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-secondary">{labelEn}</p>
      </div>

      <span
        className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-200 ${
          checked ? "bg-accent-primary" : "bg-slate-600"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.35)] transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
