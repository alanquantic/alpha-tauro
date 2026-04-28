import type { Metadata } from "next";
import { ButtonLink, ContactPanel, ProductCard } from "../components/ui-parts";
import { assets, products } from "../lib/alpha-data";

export const metadata: Metadata = {
  title: "Productos - Alpha Tauro Transporting",
  description:
    "Catálogo de modelos Alpha Tauro: New Bluesky, Evergreen, New Mobihome, City Bus y Sightseeing.",
};

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-carbon text-white">
      <section className="page-hero relative overflow-hidden px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div
          className="hero-kenburns absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.cityBus})` }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="reveal text-[11px] font-black uppercase tracking-[0.35em] text-alpha">
            Alpha Tauro
          </p>
          <h1 className="reveal mt-5 text-balance text-4xl font-black uppercase leading-tight sm:text-6xl lg:text-7xl">
            Productos
          </h1>
          <p className="reveal mt-6 max-w-2xl text-sm font-semibold leading-8 text-zinc-300 sm:text-base">
            Modelos diseñados para transporte ejecutivo, urbano, turístico y de
            larga distancia, con interiores cómodos y soluciones de operación
            eficientes.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-alpha">
                Catálogo
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                Todos los modelos
              </h2>
            </div>
            <ButtonLink href="/#contacto" dark={false}>
              Cotizar
            </ButtonLink>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                className="reveal"
                style={{ transitionDelay: `${index * 70}ms` }}
                key={product.slug}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <div
          className="parallax-panel absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.hero})` }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="reveal relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-alpha">
            ATT
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black sm:text-5xl">
            Encuentra el autobús adecuado para tu operación
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold leading-8 text-zinc-300">
            La gama Alpha Tauro cubre rutas urbanas, turismo, transporte de
            personal, viajes ejecutivos y configuraciones con cama.
          </p>
        </div>
      </section>

      <ContactPanel compact />
    </main>
  );
}
