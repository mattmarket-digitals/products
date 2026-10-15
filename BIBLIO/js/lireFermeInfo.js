
"use strict";

async function lireFermeInfo() {
    const main = document.querySelector("main");

    if (!main) {
        console.error("Élément <main> introuvable.");
        return;
    }

    // Zone d'affichage des résultats.
    const zone = document.createElement("section");
    zone.id = "listeFermeInfo";
    zone.setAttribute("aria-live", "polite");

    const titre = document.createElement("h2");
    titre.textContent = "Liste des fermes enregistrées";

    const statut = document.createElement("p");
    statut.textContent = "Chargement des données…";

    zone.append(titre, statut);
    main.appendChild(zone);

    // Vérifie que le client Supabase existe.
    if (!window.clientSupabase) {
        statut.textContent =
            "Erreur : le client Supabase n'est pas initialisé.";
        return;
    }

    try {
        // Récupère les colonnes de la table.
        const { data, error } = await window.clientSupabase
            .from("FermeInfo")
            .select("id, created_at, userMail, repJson")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erreur Supabase :", error);
            statut.textContent =
                "Impossible de récupérer les informations des fermes.";
            return;
        }

        if (!data || data.length === 0) {
            statut.textContent = "Aucune ferme enregistrée.";
            return;
        }

        statut.textContent =
            `${data.length} enregistrement(s) trouvé(s).`;

        // Une fiche par ligne de la table.
        data.forEach((ferme, index) => {
            const fiche = document.createElement("article");
            fiche.style.margin = "1.5rem 0";
            fiche.style.padding = "1rem";
            fiche.style.border = "1px solid #aaa";
            fiche.style.borderRadius = "0.4rem";

            const titreFiche = document.createElement("h3");
            titreFiche.textContent =
                `Ferme ${index + 1}`;

            const identifiant = document.createElement("p");
            identifiant.textContent =
                `ID : ${ferme.id ?? "Non renseigné"}`;

            const date = document.createElement("p");
            date.textContent =
                `Créée le : ${
                    ferme.created_at
                        ? new Date(ferme.created_at).toLocaleString("fr-FR")
                        : "Non renseignée"
                }`;

            const email = document.createElement("p");
            email.textContent =
                `E-mail : ${ferme.userMail ?? "Non renseigné"}`;

            const titreReponses = document.createElement("h4");
            titreReponses.textContent = "Réponses du formulaire";

            const reponses = document.createElement("pre");
            reponses.textContent = JSON.stringify(
                ferme.repJson,
                null,
                2
            );

            reponses.style.whiteSpace = "pre-wrap";
            reponses.style.overflowWrap = "anywhere";
            reponses.style.fontFamily = "monospace";

            fiche.append(
                titreFiche,
                identifiant,
                date,
                email,
                titreReponses,
                reponses
            );

            zone.appendChild(fiche);
        });

    } catch (erreur) {
        console.error(
            "Erreur lors de la lecture des fermes :",
            erreur
        );

        statut.textContent =
            "Une erreur inattendue est survenue pendant la lecture.";
    }
}

// Le script étant chargé à la fin du document,
// le contenu HTML est déjà disponible.
lireFermeInfo();
