import type { BookingStatus, LeadStatus } from "@/types/admin";

type AnyStatus = LeadStatus | BookingStatus;

const STYLES: Record<AnyStatus, string> = {
  NEW: "bg-blue-50 text-blue-700",
  QUOTED: "bg-yellow-50 text-yellow-700",
  BOOKED: "bg-purple-50 text-purple-700",
  COMPLETED: "bg-green-50 text-green-700",
  CANCELLED: "bg-[#f5f5f5] text-[#999]",
  SCHEDULED: "bg-blue-50 text-blue-700",
  IN_PROGRESS: "bg-yellow-50 text-yellow-700",
};

const LABELS: Record<AnyStatus, string> = {
  NEW: "New",
  QUOTED: "Quoted",
  BOOKED: "Booked",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
};

export default function StatusBadge({ status }: { status: AnyStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
