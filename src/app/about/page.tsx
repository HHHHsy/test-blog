import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <section className="grid gap-12 md:grid-cols-[1fr_0.78fr] md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">About the journal</p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.98] md:text-8xl">
              Crafting a life of intentional <span className="italic">sophistication</span>.
            </h1>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR7fCDYtrRn8gUUgmqKPX9JHID6wASR8N-Q4TnV8yDmmuOPhyQTA9u_nP6IjO2RwUI92bEQ6yYGC3Ppwmxq2P_04GQxABRiqUFn44vgK2fkAEpVfP1SUFUJgvOQQMOq60szvo65uT6EW3cd4UjzY8ssNlsBiKtcX4my4VaqiiqAg5kYgzgK-HP5kj_AOKKh121E0B2eu1QJSIs8bNLQcWUYe3lFBHD4JgKmfpJRFRyaM6tnsVGD8q1uNm2Fr5JeD1mZqBTlYIexA"
              alt=""
              className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
          </div>
        </section>
        <section className="mt-20 grid gap-10 border-y border-stone-200 py-14 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-serif text-4xl italic">The Pursuit of the Sublime</h2>
          <div className="space-y-6 text-lg leading-9 text-stone-600">
            <p>
              ELÉGANCE is an automated premium journal for design, interiors, architecture, and cultivated rituals. It studies the confidence of restraint and the discipline of good taste.
            </p>
            <p>
              The editorial system behind it lets an author draft, schedule, publish, and take down posts while the public journal updates dynamically.
            </p>
          </div>
        </section>
        <section className="py-20 text-center">
          <p className="mx-auto max-w-4xl font-serif text-4xl italic leading-relaxed md:text-5xl">
            Simplicity is the ultimate sophistication.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Leonardo da Vinci</p>
          <Link href="/contact" className="mt-10 inline-block bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            Start a conversation
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
