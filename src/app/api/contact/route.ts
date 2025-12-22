import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Map subject to readable text
    const subjectMap: Record<string, string> = {
      general: "Question générale",
      support: "Support technique",
      billing: "Facturation",
      partnership: "Partenariat",
      other: "Autre",
    };

    const subjectText = subjectMap[subject] || subject;

    // Send email via Web3Forms
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `[InvoiceDesign] ${subjectText} - ${name}`,
        from_name: "InvoiceDesign Contact Form",
        to: process.env.CONTACT_EMAIL || "clarkybrian@outlook.fr",
        replyto: email,
        message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NOUVEAU MESSAGE - INVOICEDESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 NOM: ${name}
📧 EMAIL: ${email}
📋 SUJET: ${subjectText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Ce message provient du formulaire de contact InvoiceDesign
🌐 https://invoicedesign.vercel.app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim(),
      }),
    });

    const web3formsData = await web3formsResponse.json();

    if (!web3formsResponse.ok || !web3formsData.success) {
      console.error("Web3Forms error:", web3formsData);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
