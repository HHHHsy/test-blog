export function Newsletter() {
  return (
    <section className="mx-auto mt-20 max-w-3xl border-y border-stone-200 px-5 py-14 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
        The Weekly Dispatch
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
        Notes on design, art, and the art of living well.
      </h2>
      <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="name@example.com"
          className="min-h-12 flex-1 border border-stone-300 bg-transparent px-4 text-sm outline-none focus:border-[#d4af37]"
        />
        <button className="min-h-12 bg-black px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Subscribe
        </button>
      </form>
    </section>
  );
}
