import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import AreasServed from "@/components/AreasServed";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import type { ServiceConfig } from "@/types/admin";

const DEFAULT_PHONE = "+61 404 504 303";
const DEFAULT_CONTACT_EMAIL = "redrocleaning@gmail.com";

async function getServiceConfigs(): Promise<ServiceConfig[]> {
  // Drives which services/prices show on the public site (admin-editable).
  // Falls back to an empty list so the site renders its built-in defaults
  // if the database is ever unreachable.
  try {
    return await prisma.serviceConfig.findMany();
  } catch {
    return [];
  }
}

async function getContactInfo(): Promise<{ phone: string; contactEmail: string }> {
  // Phone + public contact email shown across the site (admin-editable).
  try {
    const s = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    return {
      phone: s?.phone?.trim() || DEFAULT_PHONE,
      contactEmail: s?.contactEmail?.trim() || DEFAULT_CONTACT_EMAIL,
    };
  } catch {
    return { phone: DEFAULT_PHONE, contactEmail: DEFAULT_CONTACT_EMAIL };
  }
}

export default async function Home() {
  const [services, contact] = await Promise.all([
    getServiceConfigs(),
    getContactInfo(),
  ]);
  const { phone, contactEmail } = contact;

  return (
    <>
      <Navbar phone={phone} />
      <Hero />
      <TrustBar />
      <Services services={services} />
      <Stats />
      <HowItWorks />
      <Pricing services={services} />
      <About />
      <AreasServed />
      <Testimonials />
      <CtaBanner phone={phone} />
      <Gallery />
      <Faq phone={phone} contactEmail={contactEmail} />
      <Contact services={services} phone={phone} contactEmail={contactEmail} />
      <Footer phone={phone} contactEmail={contactEmail} />
    </>
  );
}
