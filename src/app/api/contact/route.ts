import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "redrocleaning@gmail.com";
const FROM_EMAIL = "Redro Cleaning <quotes@redrocleaning.com>";

const SERVICE_LABELS: Record<string, string> = {
  "end-of-lease": "End of Lease Cleaning",
  "move-in": "Move-In Cleaning",
  "move-out": "Move-Out Cleaning",
  "carpet-steam": "Carpet Steam Cleaning",
  "driveway-wash": "Pressure Driveway Wash",
  balcony: "Balcony Deep Clean",
};

const BEDROOM_LABELS: Record<string, string> = {
  studio: "Studio",
  "1": "1 Bedroom",
  "2": "2 Bedrooms",
  "3": "3 Bedrooms",
  "4+": "4+ Bedrooms",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  bedrooms: string;
  address: string;
  message?: string;
};

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.firstName === "string" &&
    d.firstName.trim() !== "" &&
    typeof d.lastName === "string" &&
    d.lastName.trim() !== "" &&
    typeof d.email === "string" &&
    EMAIL_PATTERN.test(d.email) &&
    typeof d.phone === "string" &&
    d.phone.trim() !== "" &&
    typeof d.serviceType === "string" &&
    d.serviceType.trim() !== "" &&
    typeof d.preferredDate === "string" &&
    d.preferredDate.trim() !== "" &&
    typeof d.bedrooms === "string" &&
    d.bedrooms.trim() !== "" &&
    typeof d.address === "string" &&
    d.address.trim() !== ""
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BRAND = {
  red: "#D41F1F",
  dark: "#111111",
  cream: "#F7F5F2",
  border: "#E8E6E2",
  tint: "#FFF0EF",
};

function emailLayout(
  bodyHtml: string,
  contact: { email: string; phone: string },
): string {
  return `
<div style="background-color:${BRAND.cream};padding:40px 16px;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BRAND.border};">
    <div style="background-color:${BRAND.dark};padding:26px 36px;">
      <span style="font-size:19px;font-weight:800;letter-spacing:0.02em;color:${BRAND.red};">REDRO</span>
      <span style="font-size:19px;font-weight:800;letter-spacing:0.02em;color:#ffffff;"> CLEANING</span>
    </div>
    <div style="padding:36px;">
      ${bodyHtml}
    </div>
    <div style="background-color:${BRAND.cream};padding:18px 36px;border-top:1px solid ${BRAND.border};">
      <p style="margin:0;font-size:12px;color:#999999;">Redro Cleaning &middot; Serving all of Sydney, NSW</p>
      <p style="margin:4px 0 0;font-size:12px;color:#999999;">${escapeHtml(contact.email)} &middot; ${escapeHtml(contact.phone)}</p>
    </div>
  </div>
</div>`;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:#999999;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:11px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.dark};font-weight:600;">${value}</td>
    </tr>`;
}

function eyebrow(text: string): string {
  return `<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:${BRAND.red};text-transform:uppercase;">${text}</p>`;
}

function buildAdminEmailHtml(opts: {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  serviceLabel: string;
  preferredDate: string;
  bedroomLabel: string;
  address: string;
  message: string;
  contact: { email: string; phone: string };
}): string {
  const { fullName, firstName, email, phone, serviceLabel, preferredDate, bedroomLabel, address, message, contact } = opts;
  return emailLayout(
    `
    ${eyebrow("New Quote Request")}
    <h1 style="margin:0 0 22px;font-size:24px;font-weight:800;color:${BRAND.dark};">${serviceLabel}</h1>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${detailRow("Name", fullName)}
      ${detailRow("Email", email)}
      ${detailRow("Phone", phone)}
      ${detailRow("Service", serviceLabel)}
      ${detailRow("Address", address)}
      ${detailRow("Preferred Date", preferredDate)}
      ${detailRow("Bedrooms", bedroomLabel)}
    </table>
    ${
      message
        ? `<div style="background-color:${BRAND.tint};border-radius:10px;padding:16px 18px;margin-bottom:26px;">
            ${eyebrow("Message")}
            <p style="margin:0;font-size:14px;color:#444444;line-height:1.6;">${message}</p>
          </div>`
        : ""
    }
    <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your ${serviceLabel} Quote Request`)}" style="display:inline-block;background-color:${BRAND.red};color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:14px 28px;border-radius:7px;">Reply to ${firstName} &rarr;</a>
  `,
    contact,
  );
}

function buildCustomerEmailHtml(opts: {
  firstName: string;
  serviceLabel: string;
  preferredDate: string;
  bedroomLabel: string;
  address: string;
  contact: { email: string; phone: string };
}): string {
  const { firstName, serviceLabel, preferredDate, bedroomLabel, address, contact } = opts;
  const telHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
  return emailLayout(
    `
    ${eyebrow("Request Received")}
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:${BRAND.dark};">Thanks, ${firstName}!</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#555555;">
      We've received your request and will be in touch within <strong>1 hour</strong> with a competitive, no-obligation quote.
    </p>
    <table style="width:100%;border-collapse:collapse;background-color:${BRAND.cream};border-radius:10px;">
      <tr>
        <td style="padding:18px 20px 4px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.06em;color:#AAAAAA;text-transform:uppercase;">Your Request</p>
          <table style="width:100%;border-collapse:collapse;">
            ${detailRow("Service", serviceLabel)}
            ${detailRow("Address", address)}
            ${detailRow("Preferred Date", preferredDate)}
            ${detailRow("Bedrooms", bedroomLabel)}
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:26px 0 20px;font-size:14px;line-height:1.7;color:#555555;">
      Need something urgent? Call or SMS us anytime on
      <a href="${telHref}" style="color:${BRAND.red};font-weight:700;text-decoration:none;">${escapeHtml(contact.phone)}</a>.
    </p>
    <p style="margin:0;font-size:14px;color:#999999;">&mdash; The Redro Cleaning Team</p>
  `,
    contact,
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const firstName = escapeHtml(body.firstName);
  const lastName = escapeHtml(body.lastName);
  const email = body.email;
  const phone = escapeHtml(body.phone);
  const preferredDate = escapeHtml(body.preferredDate);
  const address = escapeHtml(body.address);
  const message = body.message?.trim() ? escapeHtml(body.message) : "";
  const serviceLabel = SERVICE_LABELS[body.serviceType] ?? escapeHtml(body.serviceType);
  const bedroomLabel = BEDROOM_LABELS[body.bedrooms] ?? escapeHtml(body.bedrooms);
  const fullName = `${firstName} ${lastName}`;

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  // Read admin-configurable settings (notification inbox, sender, public contact
  // info). Fall back to the built-in defaults if the row/DB is unavailable.
  const settings = await prisma.siteSettings
    .findUnique({ where: { id: "singleton" } })
    .catch(() => null);
  const notifyEmail = settings?.adminEmail?.trim() || ADMIN_EMAIL;
  const fromEmail = settings?.emailFrom?.trim() || FROM_EMAIL;
  const contact = {
    email: settings?.contactEmail?.trim() || "redrocleaning@gmail.com",
    phone: settings?.phone?.trim() || "+61 404 504 303",
  };

  const adminSend = await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    replyTo: email,
    subject: `New Quote Request — ${serviceLabel} (${fullName})`,
    html: buildAdminEmailHtml({
      fullName,
      firstName,
      email,
      phone,
      serviceLabel,
      preferredDate,
      bedroomLabel,
      address,
      message,
      contact,
    }),
  });

  if (adminSend.error) {
    console.error("Failed to send admin notification email:", adminSend.error);
    return NextResponse.json({ error: "Failed to send notification." }, { status: 502 });
  }

  const customerSend = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "We've received your quote request — Redro Cleaning",
    html: buildCustomerEmailHtml({ firstName, serviceLabel, preferredDate, bedroomLabel, address, contact }),
  });

  if (customerSend.error) {
    console.error("Failed to send customer confirmation email:", customerSend.error);
  }

  // Persist the quote request as a Lead for the admin dashboard. Stored with the
  // raw submitted values (the escaped versions above are only for email HTML).
  // A DB failure here should not fail the request — the emails have already sent.
  try {
    await prisma.lead.create({
      data: {
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        serviceType: body.serviceType,
        preferredDate: body.preferredDate.trim(),
        bedrooms: body.bedrooms,
        address: body.address.trim(),
        message: body.message?.trim() ? body.message.trim() : null,
        status: "NEW",
      },
    });
  } catch (dbError) {
    console.error("Failed to save lead to database:", dbError);
  }

  return NextResponse.json({ success: true });
}
