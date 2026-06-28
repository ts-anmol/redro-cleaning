import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          Notification email and business information.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
