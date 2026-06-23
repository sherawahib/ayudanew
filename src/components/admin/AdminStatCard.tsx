type AdminStatCardProps = {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  accent?: "blue" | "green" | "amber" | "purple";
};

const ACCENTS = {
  blue: "from-[#1261ab] to-[#2ec5f6]",
  green: "from-[#00b388] to-[#34d399]",
  amber: "from-[#d97706] to-[#fbbf24]",
  purple: "from-[#6366f1] to-[#a78bfa]",
};

export default function AdminStatCard({
  label,
  value,
  hint,
  trend,
  accent = "blue",
}: AdminStatCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
      <div className={`h-1 bg-gradient-to-r ${ACCENTS[accent]}`} />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6b7d]">{label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-[#0f2d52]">{value}</p>
        {hint ? <p className="mt-1 text-sm text-[#5a6b7d]">{hint}</p> : null}
        {trend ? (
          <p className="mt-2 text-xs font-medium text-[#00b388]">{trend}</p>
        ) : null}
      </div>
    </div>
  );
}
