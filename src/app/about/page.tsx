import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  AboutHero,
  AboutServices,
  AboutClients,
  AboutStandards,
  AboutServiceDetail,
  AboutCta,
} from "./about-text";
import { loadAboutData } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const data = await loadAboutData();

  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero data={data} />
        <AboutServices />
        <AboutClients data={data} />
        <AboutStandards data={data} />
        <AboutServiceDetail data={data} />
        <AboutCta />
      </main>
      <SiteFooter />
    </>
  );
}
