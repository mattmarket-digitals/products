
"use strict";

// ==========================================================
// LECTURE TEXTUELLE DES FORMULAIRES FERMETERRAP
// Affichage compact de toutes les fermes enregistrées
// ==========================================================

async function lireFormTxt() {
    const main = document.querySelector("main");

    if (!main) {
        console.error("Élément <main> introuvable.");
        return;
    }

    // Évite de créer plusieurs listes si la fonction est relancée.
    const ancienneZone = document.getElementById("listeFormTxt");
    if (ancienneZone) ancienneZone.remove();

    const zone = document.createElement("section");
    zone.id = "listeFormTxt";

    const titre = document.createElement("h2");
    titre.textContent = "Liste des fermes enregistrées";

    const statut = document.createElement("p");
    statut.textContent = "Chargement des données…";

    zone.append(titre, statut);
    main.appendChild(zone);

    if (!window.clientSupabase) {
        statut.textContent =
            "Erreur : le client Supabase n'est pas initialisé.";
        return;
    }

    try {
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
            `${data.length} ferme(s) enregistrée(s).`;

        // --------------------------------------------------
        // QUESTIONS ET RUBRIQUES DU FORMULAIRE
        // L'ordre suit ajFermeForm.js.
        // --------------------------------------------------

        const rubriques = [
            {
                titre: "Identifiant et confidentialité",
                champs: [
                    ["email", "E-mail (identifiant)"],
                    ["emailConfidentialite", "Confidentialité de l’identifiant"]
                ]
            },
            {
                titre: "1. Coordonnées",
                champs: [
                    ["emailPublic", "E-mail public"],
                    ["telephone", "Téléphone"],
                    ["site_web", "Site web"]
                ]
            },
            {
                titre: "2. Profil et localisation",
                champs: [
                    ["nom", "Nom de la ferme"],
                    ["type_structure", "Type de structure"],
                    ["region", "Région"],
                    ["departement", "Département"],
                    ["commune", "Commune"],
                    ["adresse", "Adresse"],
                    ["code_postal", "Code postal"],
                    ["latitude", "Latitude"],
                    ["longitude", "Longitude"]
                ]
            },
            {
                titre: "3. Publics accueillis",
                champs: [
                    ["publics", "Publics accueillis"],
                    ["publicsAutre", "Autres publics précisés"]
                ]
            },
            {
                titre: "4. Médiations et activités",
                champs: [
                    ["activites", "Médiations et activités"],
                    ["activitesAutre", "Autres activités précisées"]
                ]
            },
            {
                titre: "5. Professionnels présents",
                champs: [
                    ["professionnels", "Professionnels présents"],
                    ["professionnelsAutre", "Autres professionnels précisés"]
                ]
            },
            {
                titre: "6. Modalités d'accueil",
                champs: [
                    ["accueil_individuel", "Accueil individuel"],
                    ["accueil_groupe", "Accueil en groupe"],
                    ["accueil_institutions", "Accueil d'institutions"],
                    ["accessibilite_pmr", "Accessibilité PMR"],
                    ["hebergement", "Hébergement"],
                    ["tarifs", "Tarifs et conditions"]
                ]
            },
            {
                titre: "7. Source de l'information",
                champs: [
                    ["source", "Source (site web ou référence)"]
                ]
            }
        ];

        // --------------------------------------------------
        // OUTILS DE FORMATAGE
        // --------------------------------------------------

        function valeurLisible(valeur) {
            if (valeur === null || valeur === undefined || valeur === "") {
                return "";
            }

            if (Array.isArray(valeur)) {
                return valeur
                    .map(element => valeurLisible(element))
                    .filter(Boolean)
                    .join(", ");
            }

            if (typeof valeur === "object") {
                return JSON.stringify(valeur);
            }

            return String(valeur);
        }

        function ajouterTexte(parent, texte, balise = "p") {
            const element = document.createElement(balise);
            element.textContent = texte;
            parent.appendChild(element);
            return element;
        }

        // --------------------------------------------------
        // AFFICHAGE DES FICHES
        // --------------------------------------------------

        data.forEach((ferme, index) => {
            const reponses = ferme.repJson ?? {};

            const fiche = document.createElement("article");
            fiche.className = "fiche-ferme-texte";

            // Présentation compacte, sans dépendre d'une feuille CSS.
            fiche.style.margin = "1rem 0";
            fiche.style.padding = "0.8rem 1rem";
            fiche.style.border = "1px solid #aaa";
            fiche.style.borderRadius = "0.4rem";
            fiche.style.lineHeight = "1.45";
            fiche.style.overflowWrap = "anywhere";

/*
            const mailFerme =
                valeurLisible(ferme.userMail) || `Ferme ${index + 1}`;

            ajouterTexte(
                fiche,
                `${index + 1}. ${mailFerme}`,
                "h3"
            );
*/
            const mailFerme =
                valeurLisible(ferme.userMail) || `Ferme ${index + 1}`;
            
            ajouterTexte(
                fiche,
                `${index + 1}. ${mailFerme}`,
                "h3"
            );
            // Métadonnées de la ligne Supabase.
            const meta = document.createElement("p");
            meta.style.fontSize = "0.85em";
            meta.style.color = "#666";

            const date = ferme.created_at
                ? new Date(ferme.created_at).toLocaleString("fr-FR")
                : "Date inconnue";

            meta.textContent =
                `ID : ${ferme.id ?? "—"} · Création : ${date}`;

            fiche.appendChild(meta);

            // Chaque rubrique ne contient que les réponses renseignées.
            rubriques.forEach(rubrique => {
                const champsRenseignes = rubrique.champs
                    .map(([cle, libelle]) => ({
                        cle,
                        libelle,
                        valeur: valeurLisible(reponses[cle])
                    }))
                    .filter(champ => champ.valeur !== "");

                if (champsRenseignes.length === 0) return;

                ajouterTexte(fiche, rubrique.titre, "h4");

                champsRenseignes.forEach(champ => {
                    const paragraphe = document.createElement("p");
                    paragraphe.style.margin = "0.2rem 0";

                    const libelle = document.createElement("strong");
                    libelle.textContent = `${champ.libelle} : `;

                    const valeur = document.createElement("span");
                    valeur.textContent = champ.valeur;

                    paragraphe.append(libelle, valeur);
                    fiche.appendChild(paragraphe);
                });
            });

            zone.appendChild(fiche);
        });

    } catch (erreur) {
        console.error("Erreur de lecture :", erreur);
        statut.textContent =
            "Une erreur inattendue est survenue pendant la lecture.";
    }
}

lireFormTxt();
