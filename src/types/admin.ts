import type {
  Lead,
  Booking,
  Customer,
  ServiceConfig,
  SiteSettings,
  LeadStatus,
  BookingStatus,
} from "@prisma/client";

export type {
  Lead,
  Booking,
  Customer,
  ServiceConfig,
  SiteSettings,
  LeadStatus,
  BookingStatus,
};

/** Lead with its optional converted booking. */
export type LeadWithBooking = Lead & { booking: Booking | null };

/** Booking joined to its customer and originating lead. */
export type BookingWithRelations = Booking & {
  customer: Customer | null;
  lead: Lead | null;
};

/** Customer with full bookings history. */
export type CustomerWithBookings = Customer & { bookings: Booking[] };

/** Customer row for the customers table (booking count + latest booking). */
export type CustomerListItem = Customer & {
  bookingCount: number;
  lastBookingAt: string | null;
};

/** Dashboard overview numbers. */
export type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  bookingsThisMonth: number;
  completedJobs: number;
};

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const LEAD_STATUSES: LeadStatus[] = [
  "NEW",
  "QUOTED",
  "BOOKED",
  "COMPLETED",
  "CANCELLED",
];

export const BOOKING_STATUSES: BookingStatus[] = [
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export const SERVICE_LABELS: Record<string, string> = {
  "end-of-lease": "End of Lease Cleaning",
  "move-in": "Move-In Cleaning",
  "move-out": "Move-Out Cleaning",
  "carpet-steam": "Carpet Steam Cleaning",
  "driveway-wash": "Pressure Driveway Wash",
  balcony: "Balcony Deep Clean",
};

export const BEDROOM_LABELS: Record<string, string> = {
  studio: "Studio",
  "1": "1 Bedroom",
  "2": "2 Bedrooms",
  "3": "3 Bedrooms",
  "4+": "4+ Bedrooms",
};

export function serviceLabel(key: string): string {
  return SERVICE_LABELS[key] ?? key;
}

export function bedroomLabel(key: string): string {
  return BEDROOM_LABELS[key] ?? key;
}

export const SERVICE_OPTIONS = Object.entries(SERVICE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const BEDROOM_OPTIONS = Object.entries(BEDROOM_LABELS).map(
  ([value, label]) => ({ value, label }),
);
