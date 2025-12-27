import { NextResponse } from "next/server";

interface BrevoContact {
  email: string;
  name?: string;
}

// Validation email basique
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Sanitize input string
function sanitizeString(str: string | undefined): string {
  if (!str) return "";
  return str.trim().substring(0, 100).replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  console.log("[Brevo API] ========== DÉBUT REQUÊTE ==========");
  
  try {
    // Vérifier l'origine de la requête (protection basique)
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://invoicedesign.fr',
      'https://www.invoicedesign.fr'
    ];
    
    // En production, vérifier l'origine
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed.replace('www.', '')))) {
      console.log("[Brevo API] ❌ Origine non autorisée:", origin);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { email, name }: BrevoContact = await request.json();
    
    // Validation de l'email
    if (!email || !isValidEmail(email)) {
      console.log("[Brevo API] ❌ Email invalide:", email);
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }
    
    const sanitizedName = sanitizeString(name);
    console.log("[Brevo API] Email reçu:", email);
    console.log("[Brevo API] Nom reçu:", sanitizedName);

    const brevoApiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || "6");
    
    console.log("[Brevo API] List ID:", listId);
    console.log("[Brevo API] API Key configurée:", brevoApiKey ? "✅ OUI" : "❌ NON");

    if (!brevoApiKey) {
      console.error("[Brevo API] ❌ BREVO_API_KEY non configurée!");
      return NextResponse.json(
        { error: "Configuration Brevo manquante" },
        { status: 500 }
      );
    }

    // Add contact to Brevo
    console.log("[Brevo API] Envoi de la requête à Brevo...");
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          PRENOM: sanitizedName.split(" ")[0] || "",
          NOM: sanitizedName.split(" ").slice(1).join(" ") || "",
          FULLNAME: sanitizedName,
        },
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    console.log("[Brevo API] Status de la réponse:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("[Brevo API] Réponse erreur:", JSON.stringify(errorData));
      
      // If contact already exists, that's fine
      if (errorData.code === "duplicate_parameter") {
        console.log("[Brevo API] Contact existe déjà, mise à jour...");
        // Update the contact to add to list
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            attributes: {
              PRENOM: sanitizedName.split(" ")[0] || "",
              NOM: sanitizedName.split(" ").slice(1).join(" ") || "",
              FULLNAME: sanitizedName,
            },
            listIds: [listId],
          }),
        });

        if (!updateResponse.ok) {
          const updateText = await updateResponse.text();
          console.error("[Brevo API] ❌ Erreur mise à jour:", updateText);
        } else {
          console.log("[Brevo API] ✅ Contact mis à jour avec succès!");
        }

        return NextResponse.json({ success: true, updated: true });
      }

      console.error("[Brevo API] ❌ Erreur Brevo:", JSON.stringify(errorData));
      return NextResponse.json(
        { error: "Erreur lors de l'ajout du contact", details: errorData },
        { status: 500 }
      );
    }

    // Brevo retourne parfois une réponse vide (201 Created)
    const responseText = await response.text();
    let successData = null;
    if (responseText) {
      try {
        successData = JSON.parse(responseText);
      } catch {
        successData = { id: responseText };
      }
    }
    console.log("[Brevo API] ✅ SUCCESS! Contact ajouté. Status:", response.status);
    console.log("[Brevo API] ========== FIN REQUÊTE ==========");
    
    return NextResponse.json({ success: true, data: successData });
  } catch (error) {
    console.error("[Brevo API] ❌ EXCEPTION:", error);
    return NextResponse.json(
      { error: "Erreur serveur", details: String(error) },
      { status: 500 }
    );
  }
}
