"use client";

import { useState } from "react";
import { ButtonLink, ContactPanel, SectionImage } from "./components/ui-parts";
import { assets, featureSets, products } from "./lib/alpha-data";

const benefits = [
  {
    title: "Menor costo de funcionamiento",
    icon: (
      <path d="M12 2.75 13.35 6.4a7.42 7.42 0 0 1 2.1.86l3.55-1.62 2.36 4.08-3.14 2.34c.06.31.08.62.08.94s-.02.63-.08.94l3.14 2.34-2.36 4.08-3.55-1.62a7.42 7.42 0 0 1-2.1.86L12 23.25 7.3 22.4 6.9 18.5a7.02 7.02 0 0 1-1.84-1.2l-3.8.84-.8-4.64 3.57-1.56c.09-.64.28-1.25.56-1.82L2.34 6.92 6.02 4l2.94 2.55c.32-.11.65-.2 1-.26L12 2.75Zm0 6.45a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" />
    ),
  },
  {
    title: "Mejor distribuidor",
    icon: (
      <path d="m12 2.8 2.75 5.58 6.16.9-4.46 4.35 1.05 6.14L12 16.88l-5.5 2.9 1.05-6.15L3.1 9.28l6.15-.9L12 2.8Z" />
    ),
  },
  {
    title: "Modelos únicos",
    icon: (
      <path d="m12 2.5 8.2 5.9L17.08 21.5H6.92L3.8 8.4 12 2.5Zm0 3.45L7.05 9.5 8.9 17.8h6.2l1.85-8.3L12 5.95Z" />
    ),
  },
  {
    title: "Tu mejor elección",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10h-2.2A7.8 7.8 0 1 1 12 4.2V2Zm8.78 2.8-9.2 9.2-3.36-3.36-1.56 1.56 4.92 4.92 10.76-10.76-1.56-1.56Z" />
    ),
  },
];

export default function Home() {
  const [featureMode, setFeatureMode] =
    useState<keyof typeof featureSets>("asientos");
  const [activeModel, setActiveModel] = useState(products.length - 1);

  const activeFeatureSet = featureSets[featureMode];
  const currentModel = products[activeModel];

  return (
    <main className="min-h-screen overflow-hidden bg-carbon text-white">
      <section className="relative mx-auto min-h-[620px] max-w-[1560px] overflow-hidden bg-black lg:min-h-[920px]">
        <div
          className="hero-kenburns absolute inset-x-0 top-0 mx-auto h-full max-w-[1180px] bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.hero})` }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-5xl items-center px-6 pt-20 lg:min-h-[920px] lg:px-0">
          <div className="reveal max-w-4xl">
            <p className="mb-5 text-[11px] font-black uppercase tracking-[0.35em] text-alpha">
              ATT
            </p>
            <h1 className="text-balance text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Alpha Tauro <span className="text-alpha">Transporting</span>
            </h1>
            <div className="mt-8">
              <ButtonLink href="/productos">Ver productos</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="productos"
        className="relative bg-carbon px-6 py-20 sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="reveal relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="section-ghost absolute -top-7 left-0 select-none text-6xl font-black uppercase tracking-tight text-white/[0.04] sm:text-8xl lg:text-[150px]">
                {activeFeatureSet.background}
              </p>
              <h2 className="relative text-3xl font-black sm:text-5xl">
                {activeFeatureSet.label}
              </h2>
            </div>

            <div className="relative flex gap-8 text-[11px] font-black uppercase tracking-[0.12em]">
              {Object.entries(featureSets).map(([key, set]) => {
                const isActive = key === featureMode;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFeatureMode(key as keyof typeof featureSets)}
                    className={`transition ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="mr-2 inline-block h-0.5 w-8 bg-alpha align-middle" />
                    )}
                    {set.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-28">
            {activeFeatureSet.rows.map((feature, index) => (
              <article
                key={`${featureMode}-${feature.title}`}
                className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-24"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className={feature.reversed ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-black sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-6 max-w-md text-sm font-semibold leading-8 text-zinc-500">
                    {feature.copy}
                  </p>
                  <div className="mt-7">
                    <ButtonLink href="/productos">Ver más</ButtonLink>
                  </div>
                </div>
                <div className={feature.reversed ? "lg:order-1" : ""}>
                  <SectionImage src={feature.image} alt={feature.imageAlt} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-graphite">
        <div
          className="parallax-panel min-h-[520px] bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.cityBus})` }}
        >
          <div className="flex min-h-[520px] items-end bg-black/45 px-6 pb-16">
            <div className="mx-auto w-full max-w-5xl">
              <div className="reveal grid gap-0 bg-white p-6 text-black shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="benefit-card border-zinc-300 px-5 py-6 text-center sm:[&:nth-child(2n)]:border-l lg:border-l lg:first:border-l-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 fill-none stroke-zinc-400 stroke-[1.8] transition duration-300"
                    >
                      {benefit.icon}
                    </svg>
                    <h3 className="mx-auto mt-5 max-w-36 text-sm font-black leading-snug">
                      {benefit.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div
          className="parallax-panel absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.cityBus})` }}
        />
        <div className="absolute inset-0 bg-black/78" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="reveal text-center">
            <p className="section-ghost select-none text-7xl font-black uppercase tracking-tight text-white/[0.04] sm:text-9xl">
              ATT
            </p>
            <h2 className="-mt-12 text-3xl font-black sm:text-5xl">Modelos</h2>
          </div>

          <div className="reveal mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] font-black uppercase tracking-[0.12em] text-white/75">
            {products.map((model, index) => (
              <button
                key={model.name}
                type="button"
                onClick={() => setActiveModel(index)}
                className={`model-tab transition ${
                  index === activeModel ? "text-alpha" : "hover:text-white"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          <article
            id="modelos"
            key={currentModel.name}
            className="reveal model-card mx-auto mt-8 grid max-w-5xl bg-white text-black shadow-soft lg:grid-cols-[1.08fr_1fr]"
          >
            <div className="overflow-hidden">
              <img
                src={currentModel.heroImage}
                alt={`Autobús ${currentModel.name}`}
                className="h-full min-h-[260px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-black uppercase tracking-wide">
                {currentModel.name}
              </h3>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-alpha">
                {currentModel.modelLine}
              </p>
              <p className="mt-5 text-sm font-semibold leading-7 text-zinc-700">
                {currentModel.summary}
              </p>
              <div className="mt-8">
                <ButtonLink href={`/producto/${currentModel.slug}`}>
                  Ver más
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ContactPanel />
    </main>
  );
}
