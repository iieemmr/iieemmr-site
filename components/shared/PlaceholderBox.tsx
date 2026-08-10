type PlaceholderBoxProps = {
  label: string;
  className?: string;
};

export default function PlaceholderBox({
  label,
  className = "",
}: PlaceholderBoxProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 p-4 text-center text-xs font-medium text-slate-500 ${className}`}
    >
      {label}
    </div>
  );
}
