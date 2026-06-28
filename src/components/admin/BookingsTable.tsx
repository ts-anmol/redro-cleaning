"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  BOOKING_STATUSES,
  serviceLabel,
  type BookingStatus,
  type BookingWithRelations,
} from "@/types/admin";
import { formatDateTime, formatPrice } from "@/lib/format";
import StatusBadge from "./StatusBadge";
import {
  TD_CLASS,
  TH_CLASS,
  TablePagination,
  FilterTabs,
} from "./tablePrimitives";

const TABS: { key: string; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "SCHEDULED", label: "Scheduled" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
];

function customerName(booking: BookingWithRelations): string {
  if (booking.customer) {
    return `${booking.customer.firstName} ${booking.customer.lastName}`;
  }
  if (booking.lead) {
    return `${booking.lead.firstName} ${booking.lead.lastName}`;
  }
  return "—";
}

export default function BookingsTable({
  bookings,
}: {
  bookings: BookingWithRelations[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: bookings.length };
    for (const b of bookings) map[b.status] = (map[b.status] ?? 0) + 1;
    return map;
  }, [bookings]);

  const filtered = useMemo(
    () => bookings.filter((b) => tab === "ALL" || b.status === tab),
    [bookings, tab],
  );

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  const columns = useMemo<ColumnDef<BookingWithRelations>[]>(
    () => [
      {
        header: "Customer",
        id: "customer",
        accessorFn: (row) => customerName(row),
        cell: (info) => (
          <span className="font-semibold text-[#111]">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        header: "Service",
        accessorKey: "serviceType",
        cell: (info) => serviceLabel(info.getValue<string>()),
      },
      {
        header: "Address",
        accessorKey: "address",
        cell: (info) => (
          <span className="block max-w-[180px] truncate">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        header: "Scheduled",
        accessorKey: "scheduledAt",
        cell: (info) => formatDateTime(info.getValue<string>()),
      },
      { header: "Bedrooms", accessorKey: "bedrooms" },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => formatPrice(info.getValue<number | null>()),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => <StatusBadge status={info.getValue<BookingStatus>()} />,
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => {
          const booking = info.row.original;
          return (
            <div className="flex items-center gap-2">
              <select
                value={booking.status}
                disabled={updatingId === booking.id}
                onChange={(e) =>
                  updateStatus(booking.id, e.target.value as BookingStatus)
                }
                className="rounded-[7px] border border-redro-border bg-white px-2 py-1.5 text-xs text-[#333] outline-none focus:border-redro-red disabled:opacity-50"
              >
                {BOOKING_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
              {booking.customerId && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/customers/${booking.customerId}`)
                  }
                  className="font-display text-[12px] font-bold tracking-[0.04em] text-redro-red uppercase"
                >
                  View
                </button>
              )}
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, updatingId],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex flex-col gap-5">
      <FilterTabs
        active={tab}
        onChange={(key) => {
          setTab(key);
          table.setPageIndex(0);
        }}
        tabs={TABS.map((t) => ({
          key: t.key,
          label: t.label,
          count: counts[t.key] ?? 0,
        }))}
      />

      <div className="overflow-hidden rounded-[14px] border border-redro-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-redro-border bg-redro-cream">
                  {hg.headers.map((header) => (
                    <th key={header.id} className={TH_CLASS}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-[#999]"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-redro-cream/60"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={TD_CLASS}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          canPrevious={table.getCanPreviousPage()}
          canNext={table.getCanNextPage()}
          onPrevious={() => table.previousPage()}
          onNext={() => table.nextPage()}
        />
      </div>
    </div>
  );
}
