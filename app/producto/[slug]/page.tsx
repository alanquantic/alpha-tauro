import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BrochureCta,
  ButtonLink,
  ContactPanel,
  ProductCard,
} from "../../components/ui-parts";
import { products } from "../../lib/alpha-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} - Alpha Tauro Transporting`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-carbon text-white">
      <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm"
          style={{ backgroundImage: `url(${product.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-carbon" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="reveal image-glow overflow-hidden bg-white p-6 shadow-soft sm:p-10">
            <img
              src={product.heroImage}
              alt={product.name}
              className="mx-auto max-h-[560px] w-full object-contain"
            />
          </div>

          <div className="reveal">
            <Link
              href="/productos"
              className="text-[11px] font-black uppercase tracking-[0.25em] text-alpha transition hover:text-white"
            >
              Productos
            </Link>
            <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-tight sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-alpha">
              {product.modelLine}
            </p>
            <p className="mt-7 text-sm font-semibold leading-8 text-zinc-300 sm:text-base">
              {product.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BrochureCta />
              <ButtonLink href="/#contacto">Contactar</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-alpha">
              Características
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Detalles del modelo
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.specs.map((spec, index) => (
              <div
                key={spec}
                className="reveal spec-tile bg-graphite p-6"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="text-sm font-black text-alpha">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-lg font-black">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-alpha">
                Galería
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Exterior e interior
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {product.gallery.map((image, index) => (
              <div
                key={image}
                className={`reveal image-glow overflow-hidden bg-black shadow-soft ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
                style={{ transitionDelay: `${index * 65}ms` }}
              >
                <img
                  src={image}
                  alt={`${product.name} galería ${index + 1}`}
                  className={`w-full object-cover transition duration-700 hover:scale-105 ${
                    index === 0 ? "aspect-[16/7]" : "aspect-video"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-10 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-alpha">
              Alpha Tauro
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Productos relacionados
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related, index) => (
              <div
                key={related.slug}
                className="reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <ProductCard product={related} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel compact />
    </main>
  );
}
