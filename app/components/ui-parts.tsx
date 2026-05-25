import Link from "next/link";
import { ContactForm } from "./contact-form";
import { brochureUrl, contact, type Product } from "../lib/alpha-data";

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3">
      <path
        d="M10.85 8.96c.2 0 .39-.09.52-.22s.21-.32.21-.53L11.52.74a.77.77 0 0 0-.21-.52A.74.74 0 0 0 10.78 0L3.3.06a.74.74 0 0 0-.74.75c0 .41.34.74.75.74L9 1.51.21 10.42a.74.74 0 0 0 1.05 1.05l8.8-8.93.04 5.69c0 .41.34.74.75.74Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ButtonLink({
  children,
  href,
  dark = true,
}: {
  children: React.ReactNode;
  href: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shine-button inline-flex min-h-11 items-center justify-center gap-3 px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha ${
        dark
          ? "bg-zinc-900 text-white hover:bg-alpha hover:text-black"
          : "bg-alpha text-black hover:bg-white"
      }`}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function ExternalButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="shine-button inline-flex min-h-11 items-center justify-center gap-3 bg-alpha px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha"
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

export function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="image-glow group relative overflow-hidden bg-zinc-900 shadow-soft">
      <img
        src={src}
        alt={alt}
        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card group bg-white text-black shadow-soft">
      <Link href={`/producto/${product.slug}`} className="block overflow-hidden">
        <div className="product-card-media relative grid aspect-square place-items-center overflow-hidden bg-zinc-100 p-8">
          <img
            src={product.cardImage}
            alt={product.name}
            className="max-h-full w-full object-contain transition duration-700 group-hover:scale-105"
          />
          <span className="product-read-more shine-button absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-5 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-white">
            Leer más
          </span>
        </div>
      </Link>
      <div className="p-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Alpha Tauro
        </p>
        <h3 className="mt-2 text-xl font-black uppercase">
          <Link href={`/producto/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-zinc-600">
          {product.summary}
        </p>
      </div>
    </article>
  );
}

export function ContactPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="contacto"
      className={`${compact ? "bg-black px-6 py-16" : "bg-graphite px-6 py-20 sm:py-28"}`}
    >
      <div className="reveal mx-auto grid max-w-5xl overflow-hidden bg-white text-black shadow-soft lg:grid-cols-[0.72fr_1.35fr]">
        <aside className="relative bg-alpha p-8 text-white sm:p-12">
          <div className="honeycomb absolute inset-0 opacity-15" />
          <div className="relative">
            <h2 className="text-2xl font-black">Contáctanos</h2>
            <div className="mt-10 space-y-7 text-sm font-semibold leading-7">
              <p>{contact.address}</p>
              {contact.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
            </div>
          </div>
        </aside>

        <ContactForm />
      </div>
    </section>
  );
}

export function BrochureCta() {
  return <ExternalButton href={brochureUrl}>Brochure</ExternalButton>;
}
