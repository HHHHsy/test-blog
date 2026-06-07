import { Mail, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <section className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Contact</p>
            <h1 className="mt-5 font-serif text-6xl leading-none md:text-8xl">Inquiries</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-stone-600">
              For collaborations, editorial commissions, and brand partnerships, send a considered note.
            </p>
            <div className="mt-10 space-y-4 text-sm text-stone-600">
              <p className="flex items-center gap-3"><Mail size={17} /> studio@elegance.example</p>
              <p className="flex items-center gap-3"><MapPin size={17} /> Paris / Shanghai / Online</p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
            <form className="space-y-5 border border-stone-200 bg-[#fbf9f9] p-5 md:p-8">
              {["Name", "Email", "Subject"].map((label) => (
                <label key={label} className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</span>
                  <input className="mt-2 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 outline-none focus:border-[#d4af37]" />
                </label>
              ))}
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">Message</span>
                <textarea className="mt-2 min-h-40 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 outline-none focus:border-[#d4af37]" />
              </label>
              <button className="bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                Send inquiry
              </button>
            </form>
            <div className="min-h-96 overflow-hidden bg-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSSGAbto5cNeZFcdyKawSe9gQ_OP69oYfNkQ4fX0eQBurqoEhG390Sn_KgIrZVpgWaKZ62KPm9E9mEiCaSLsQXCkH8c2xH5kPeyGTNlNsKIAwWOsBNuDmMDxpt3xGwv3hT834G7gGjKISoZ-PmLKeQbEvrgqxYYwahpuazmwsYRPI5T94xf4xy9Mb4WUvrBNYoI1jh1RtWYAPLByMuUvLAAdXL8UGkp--P-RT-8JhWT6UrNuOoypruNzWPIGY4YpfdGCwzB2ueMA"
                alt=""
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
