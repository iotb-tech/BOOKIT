type PageBadgeProps = {
  label: string;
};

export default function PageBadge({
  label,
}: PageBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700">
      <span className="h-2 w-2 rounded-full bg-primary-600" />
      <span>{label}</span>
    </div>
  );
}