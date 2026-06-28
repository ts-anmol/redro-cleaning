import { prisma } from "@/lib/prisma";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          Quote Requests
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          Every lead captured from the website contact form.
        </p>
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
