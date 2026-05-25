"use client";

import { useState } from "react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState({
      status: "loading",
      message: "Enviando mensaje...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "No se pudo enviar el mensaje.");
      }

      form.reset();
      setFormState({
        status: "success",
        message: result.message || "Mensaje enviado correctamente.",
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al enviar el formulario.",
      });
    }
  }

  const isSubmitting = formState.status === "loading";

  return (
    <form className="p-8 sm:p-12" onSubmit={handleSubmit}>
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-zinc-500">
        Escríbenos
      </p>
      <h2 className="mt-2 text-3xl font-black text-[#192036] sm:text-4xl">
        Si tienes una duda
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          className="field"
          placeholder="Nombre"
          type="text"
          required
          disabled={isSubmitting}
        />
        <input
          name="phone"
          className="field"
          placeholder="Teléfono"
          type="tel"
          required
          disabled={isSubmitting}
        />
        <input
          name="email"
          className="field"
          placeholder="Correo electrónico"
          type="email"
          required
          disabled={isSubmitting}
        />
        <input
          name="company"
          className="field"
          placeholder="Empresa"
          type="text"
          disabled={isSubmitting}
        />
      </div>
      <textarea
        name="message"
        className="field mt-4 min-h-28 resize-none"
        placeholder="Mensaje"
        required
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="shine-button mx-auto mt-8 block bg-alpha px-8 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
      {formState.message ? (
        <p
          className={`mt-4 text-center text-sm font-semibold ${
            formState.status === "error" ? "text-red-600" : "text-zinc-700"
          }`}
        >
          {formState.message}
        </p>
      ) : null}
    </form>
  );
}
