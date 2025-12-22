import { NextResponse } from "next/server";

interface BrevoContact {
  email: string;
  name?: string;
}

export async function POST(request: Request) {
  console.log("[Brevo API] ========== DÉBUT REQUÊTE ==========");
  
  try {
    const { email, name }: BrevoContact = await request.json();
    console.log("[Brevo API] Email reçu:", email);
    console.log("[Brevo API] Nom reçu:", name);

    if (!email) {
      console.log("[Brevo API] ❌ Email manquant");
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

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
          PRENOM: name?.split(" ")[0] || "",
          NOM: name?.split(" ").slice(1).join(" ") || "",
          FULLNAME: name || "",
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
              PRENOM: name?.split(" ")[0] || "",
              NOM: name?.split(" ").slice(1).join(" ") || "",
              FULLNAME: name || "",
            },
            listIds: [listId],
          }),
        });

        if (!updateResponse.ok) {
          const updateError = await updateResponse.json();
          console.error("[Brevo API] ❌ Erreur mise à jour:", JSON.stringify(updateError));
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

    const successData = await response.json();
    console.log("[Brevo API] ✅ SUCCESS! Contact ajouté:", JSON.stringify(successData));
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
