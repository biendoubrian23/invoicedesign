import { NextResponse } from "next/server";

interface BrevoContact {
  email: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    const { email, name }: BrevoContact = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || "6");

    if (!brevoApiKey) {
      console.error("BREVO_API_KEY not configured");
      return NextResponse.json(
        { error: "Configuration Brevo manquante" },
        { status: 500 }
      );
    }

    // Add contact to Brevo
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

    if (!response.ok) {
      const errorData = await response.json();
      
      // If contact already exists, that's fine
      if (errorData.code === "duplicate_parameter") {
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
          console.error("Brevo update error:", await updateResponse.json());
        }

        return NextResponse.json({ success: true, updated: true });
      }

      console.error("Brevo error:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de l'ajout du contact" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brevo API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
