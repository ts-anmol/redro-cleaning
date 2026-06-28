import Link from "next/link";
import { Inbox, BellRing, CalendarDays, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serviceLabel } from "@/types/admin";
import { formatDate, formatDateTime } from "@/lib/format";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { TD_CLASS, TH_CLASS } from "@/components/admin/tablePrimitives";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [
    totalLeads,
    newLeads,
    bookingsThisMonth,
    completedJobs,
    recentLeads,
    upcomingBookings,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.booking.count({
      where: { scheduledAt: { gte: monthStart, lt: monthEnd } },
    }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.booking.findMany({
      where: { scheduledAt: { gte: now } },
      orderBy: { scheduledAt: "asc" },
      take: 5,
      include: { customer: true, lead: true },
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Leads" value={totalLeads} icon={Inbox} />
        <StatsCard label="New Leads" value={newLeads} icon={BellRing} />
        <StatsCard
          label="Bookings This Month"
          value={bookingsThisMonth}
          icon={CalendarDays}
        />
        <StatsCard
          label="Completed Jobs"
          value={completedJobs}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Leads */}
        <section className="overflow-hidden rounded-[14px] border border-redro-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between border-b border-redro-border px-6 py-4">
            <h2 className="font-display text-base font-bold text-[#111]">
              Recent Leads
            </h2>
            <Link
              href="/admin/leads"
              className="font-display text-[12px] font-bold tracking-[0.04em] text-redro-red uppercase"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-redro-border bg-redro-cream">
                  <th className={TH_CLASS}>Name</th>
                  <th className={TH_CLASS}>Service</th>
                  <th className={TH_CLASS}>Status</th>
                  <th className={TH_CLASS}>Received</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-[#999]">
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-redro-cream/60">
                      <td className={TD_CLASS}>
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-semibold text-[#111] hover:text-redro-red"
                        >
                          {lead.firstName} {lead.lastName}
                        </Link>
                      </td>
                      <td className={TD_CLASS}>{serviceLabel(lead.serviceType)}</td>
                      <td className={TD_CLASS}>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className={TD_CLASS}>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming Bookings */}
        <section className="overflow-hidden rounded-[14px] border border-redro-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between border-b border-redro-border px-6 py-4">
            <h2 className="font-display text-base font-bold text-[#111]">
              Upcoming Bookings
            </h2>
            <Link
              href="/admin/bookings"
              className="font-display text-[12px] font-bold tracking-[0.04em] text-redro-red uppercase"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-redro-border bg-redro-cream">
                  <th className={TH_CLASS}>Customer</th>
                  <th className={TH_CLASS}>Service</th>
                  <th className={TH_CLASS}>Scheduled</th>
                  <th className={TH_CLASS}>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-[#999]">
                      No upcoming bookings.
                    </td>
                  </tr>
                ) : (
                  upcomingBookings.map((booking) => {
                    const name = booking.customer
                      ? `${booking.customer.firstName} ${booking.customer.lastName}`
                      : booking.lead
                        ? `${booking.lead.firstName} ${booking.lead.lastName}`
                        : "—";
                    return (
                      <tr key={booking.id} className="hover:bg-redro-cream/60">
                        <td className={TD_CLASS}>
                          <span className="font-semibold text-[#111]">{name}</span>
                        </td>
                        <td className={TD_CLASS}>
                          {serviceLabel(booking.serviceType)}
                        </td>
                        <td className={TD_CLASS}>
                          {formatDateTime(booking.scheduledAt)}
                        </td>
                        <td className={TD_CLASS}>
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
