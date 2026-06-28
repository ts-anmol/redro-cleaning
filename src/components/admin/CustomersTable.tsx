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
import { Search } from "lucide-react";
import type { CustomerListItem } from "@/types/admin";
import { formatDate } from "@/lib/format";
import {
  TD_CLASS,
  TH_CLASS,
  TablePagination,
} from "./tablePrimitives";

export default function CustomersTable({
  customers,
}: {
  customers: CustomerListItem[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(q),
    );
  }, [customers, search]);

  const columns = useMemo<ColumnDef<CustomerListItem>[]>(
    () => [
      {
        header: "Name",
        id: "name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        cell: (info) => (
          <span className="font-semibold text-[#111]">
            {info.getValue<string>()}
          </span>
        ),
      },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phone" },
      {
        header: "Total Bookings",
        accessorKey: "bookingCount",
        cell: (info) => (
          <span className="font-display font-bold text-[#111]">
            {info.getValue<number>()}
          </span>
        ),
      },
      {
        header: "Last Booking",
        accessorKey: "lastBookingAt",
        cell: (info) => {
          const value = info.getValue<string | null>();
          return value ? formatDate(value) : "—";
        },
      },
      {
        header: "",
        id: "actions",
        cell: (info) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/customers/${info.row.original.id}`);
            }}
            className="font-display text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase"
          >
            View →
          </button>
        ),
      },
    ],
    [router],
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
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#aaa]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            table.setPageIndex(0);
          }}
          placeholder="Search by name or email…"
          className="h-11 w-full rounded-[7px] border-[1.5px] border-redro-border bg-white pr-4 pl-9 text-sm text-[#111] outline-none focus:border-redro-red"
        />
      </div>

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
                    No customers found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() =>
                      router.push(`/admin/customers/${row.original.id}`)
                    }
                    className="cursor-pointer transition-colors hover:bg-redro-cream/60"
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
