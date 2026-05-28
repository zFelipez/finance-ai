export function PercentageItem({
  title,
  percentage,
  icon,
}: {
  title: string;
  percentage: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900">
          {icon}
        </div>
        <p className="text-gray-400"> {title}</p>
      </div>

      <span className="font-bold text-white">{percentage}%</span>
    </div>
  );
}
