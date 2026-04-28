"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { assets, contact, partnerLogos } from "../lib/alpha-data";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/#contacto" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    const observeNode = (node: ParentNode) => {
      const elements =
        node instanceof HTMLElement && node.matches(".reveal")
          ? [node]
          : Array.from(node.querySelectorAll<HTMLElement>(".reveal"));

      elements.forEach((element) => {
        if (!element.classList.contains("is-visible")) {
          observer.observe(element);
        }
      });
    };

    observeNode(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeNode(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-30 transition duration-500 ${
          isScrolled
            ? "border-b border-white/10 bg-black/80 shadow-2xl shadow-black/30 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="block w-24 sm:w-28">
            <img src={assets.logo} alt="Alpha Tauro" className="h-auto w-full" />
          </Link>

          <nav className="hidden items-center gap-12 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/productos"
                    ? pathname.startsWith("/productos") ||
                      pathname.startsWith("/producto/")
                    : pathname.startsWith(item.href.replace("/#", "/"));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link group relative text-[11px] font-black uppercase tracking-[0.08em] text-white/80 transition hover:text-white"
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-alpha transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {children}

      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-6 py-16">
      <div className="reveal mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div>
          <img src={assets.logo} alt="Alpha Tauro" className="w-28" />
          <p className="mt-8 max-w-xs text-sm font-semibold leading-7 text-zinc-400">
            Alpha Tauro Transporting es una marca de autobuses que cumple con
            los estándares de marcas nacionales, investigada, diseñada,
            fabricada, ensamblada, distribuida y comercializada con diversas
            versiones.
          </p>
        </div>

        <address className="not-italic">
          <ul className="space-y-5 text-sm font-semibold leading-7 text-zinc-300">
            <li>{contact.address}</li>
            {contact.phones.map((phone) => (
              <li key={phone}>{phone}</li>
            ))}
          </ul>
        </address>

        <div className="grid grid-cols-2 items-center gap-6">
          {partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="partner-logo mx-auto max-h-16 w-auto object-contain"
            />
          ))}
        </div>
      </div>
      <p className="mt-14 text-center text-xs font-semibold text-zinc-500">
        Copyright 2023. All rights reserved
      </p>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      className="whatsapp-float fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-black/40"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M16.04 3.2A12.73 12.73 0 0 0 5.2 22.63L3.62 28.4l5.9-1.55a12.7 12.7 0 0 0 6.52 1.79h.01A12.72 12.72 0 0 0 16.04 3.2Zm0 23.3h-.01a10.56 10.56 0 0 1-5.38-1.47l-.39-.23-3.5.92.94-3.41-.25-.4a10.58 10.58 0 1 1 8.6 4.59Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57a9.55 9.55 0 0 1-1.76-2.19c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.97-2.35-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.14-.29-.22-.61-.38Z" />
      </svg>
    </a>
  );
}
