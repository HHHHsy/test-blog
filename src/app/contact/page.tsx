import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ContactHeader, ContactForm } from "./contact-text";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <section className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactHeader />
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
            <ContactForm />
            <div className="min-h-96 bg-gradient-to-br from-stone-300 via-stone-200 to-stone-400" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
