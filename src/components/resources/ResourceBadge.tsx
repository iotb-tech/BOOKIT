// components/resources/StatusBadge.tsx
import { ResourceStatus } from "@/types/resource";

const STATUS_STYLES: Record<ResourceStatus, string> = {
  available: "bg-success/10 text-success",
  maintenance: "bg-warning/10 text-warning",
  unavailable: "bg-error/10 text-error",
};

const STATUS_LABELS: Record<ResourceStatus, string> = {
  available: "Available",
  maintenance: "Limited slots",
  unavailable: "Unavailable",
};

export function StatusBadge({ status }: { status?: ResourceStatus }) {
  if (!status) return null;
  return (
    <span
      className={`text-sm font-medium px-2 py-0.5 rounded ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
