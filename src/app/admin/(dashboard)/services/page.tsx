import { prisma } from "@/lib/prisma";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.serviceConfig.findMany({
    orderBy: [{ isAddon: "asc" }, { key: "asc" }],
  });

  const core = services.filter((s) => !s.isAddon);
  const addons = services.filter((s) => s.isAddon);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          Services &amp; Pricing
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          Edit the services shown on the website. Changes save per card.
        </p>
      </div>

      <ServicesManager title="Core Services" services={core} isAddon={false} />
      <ServicesManager title="Add-Ons" services={addons} isAddon={true} />
    </div>
  );
}
