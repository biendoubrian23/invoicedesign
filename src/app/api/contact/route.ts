import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("[Contact API] ========== DÉBUT REQUÊTE ==========");
  
  try {
    const { name, email, subject, message } = await request.json();
    console.log("[Contact API] Données reçues:", { name, email, subject, messageLength: message?.length });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log("[Contact API] ❌ Champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "clarkybrian@outlook.fr";
    
    console.log("[Contact API] Access Key configurée:", accessKey ? "✅ OUI" : "❌ NON");
    console.log("[Contact API] Contact Email:", contactEmail);

    if (!accessKey) {
      console.error("[Contact API] ❌ WEB3FORMS_ACCESS_KEY non configurée!");
      return NextResponse.json(
        { error: "Configuration Web3Forms manquante" },
        { status: 500 }
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
    console.log("[Contact API] Envoi à Web3Forms...");
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[InvoiceDesign] ${subjectText} - ${name}`,
        from_name: "InvoiceDesign Contact Form",
        to: contactEmail,
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
    console.log("[Contact API] Réponse Web3Forms:", JSON.stringify(web3formsData));

    if (!web3formsResponse.ok || !web3formsData.success) {
      console.error("[Contact API] ❌ Web3Forms error:", web3formsData);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message", details: web3formsData },
        { status: 500 }
      );
    }

    console.log("[Contact API] ✅ Message envoyé avec succès!");
    console.log("[Contact API] ========== FIN REQUÊTE ==========");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] ❌ EXCEPTION:", error);
    return NextResponse.json(
      { error: "Erreur serveur", details: String(error) },
      { status: 500 }
    );
  }
}
