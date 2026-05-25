import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL || "Alpha Tauro <onboarding@resend.dev>";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      { message: "Falta configurar RESEND_API_KEY en el servidor." },
      { status: 500 },
    );
  }

  if (!contactToEmail) {
    return NextResponse.json(
      { message: "Falta configurar CONTACT_TO_EMAIL en el servidor." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ContactPayload;
  const name = body.name?.toString().trim() || "";
  const phone = body.phone?.toString().trim() || "";
  const email = body.email?.toString().trim() || "";
  const company = body.company?.toString().trim() || "No especificada";
  const message = body.message?.toString().trim() || "";

  if (!name || !phone || !email || !message) {
    return NextResponse.json(
      { message: "Completa los campos obligatorios del formulario." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Ingresa un correo electrónico válido." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: email,
      subject: `Nuevo contacto Alpha Tauro: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>Nuevo mensaje desde el formulario web</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Teléfono:</strong> ${safePhone}</p>
          <p><strong>Correo:</strong> ${safeEmail}</p>
          <p><strong>Empresa:</strong> ${safeCompany}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = (await resendResponse.json()) as {
      message?: string;
      error?: string;
    };

    return NextResponse.json(
      {
        message:
          resendError.message ||
          resendError.error ||
          "Resend no pudo procesar el envío.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Gracias. Tu mensaje fue enviado correctamente.",
  });
}
