import { NextResponse } from "next/server";

// Validation email basique
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Sanitize input string
function sanitizeString(str: string | undefined): string {
  if (!str) return "";
  return str.trim().substring(0, 500).replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  console.log("[Contact API] ========== DÉBUT REQUÊTE ==========");
  
  try {
    // Vérifier l'origine de la requête
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://invoicedesign.fr',
      'https://www.invoicedesign.fr'
    ];
    
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed.replace('www.', '')))) {
      console.log("[Contact API] ❌ Origine non autorisée:", origin);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, email, subject, message } = await request.json();
    console.log("[Contact API] Données reçues:", { name, email, subject, messageLength: message?.length });

    // Validation des champs
    if (!name || !email || !subject || !message) {
      console.log("[Contact API] ❌ Champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation email
    if (!isValidEmail(email)) {
      console.log("[Contact API] ❌ Email invalide:", email);
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Sanitize les entrées
    const sanitizedName = sanitizeString(name);
    const sanitizedMessage = sanitizeString(message);

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
        subject: `[InvoiceDesign] ${subjectText} - ${sanitizedName}`,
        from_name: "InvoiceDesign Contact Form",
        to: contactEmail,
        replyto: email,
        message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NOUVEAU MESSAGE - INVOICEDESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 NOM: ${sanitizedName}
📧 EMAIL: ${email}
📋 SUJET: ${subjectText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitizedMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Ce message provient du formulaire de contact InvoiceDesign
🌐 https://invoicedesign.fr
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim(),
      }),
    });

    // Web3Forms peut retourner du HTML en cas d'erreur
    const responseText = await web3formsResponse.text();
    console.log("[Contact API] Réponse brute Web3Forms:", responseText.substring(0, 200));
    
    let web3formsData;
    try {
      web3formsData = JSON.parse(responseText);
    } catch {
      console.error("[Contact API] ❌ Réponse non-JSON de Web3Forms - Clé API probablement invalide");
      return NextResponse.json(
        { error: "Configuration Web3Forms invalide - veuillez vérifier la clé API" },
        { status: 500 }
      );
    }
    
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
