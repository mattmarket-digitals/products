console.log("cherchAjForm.js chargé.");
//alert("cherchAjForm.js");

"use strict";

/* ==================================================
   CONFIGURATION DES TROIS FORMULAIRES
   ================================================== */

const configurationsMutual = [
    {
        table: "FermeInfo",
        formulaire: "formulaireFerme",
        fichier: "./ajFermeForm.js",
        nom: "ferme"
    },
    {
        table: "SanteInfo",
        formulaire: "formulaireSante",
        fichier: "../BIBLIO/js/FT/ajSanteForm.js",
        nom: "santé"
    },
    {
        table: "PublicInfo",
        formulaire: "formulairePublic",
        fichier: "../BIBLIO/js/FT/ajPublicForm.js",
        nom: "public"
    }
];


/* ==================================================
   RECHERCHE DANS LES TROIS TABLES
   ================================================== */

async function rechercherEtChargerFormulaire(userMail) {

    const email = String(userMail ?? "")
        .trim()
        .toLowerCase();

    if (!email) {
        throw new Error("Saisis une adresse e-mail.");
    }

    if (!window.clientSupabase) {
        throw new Error("Le client Supabase n'est pas initialisé.");
    }

    const recherches = await Promise.all(
        configurationsMutual.map(async configuration => {

            const { data, error } = await window.clientSupabase
                .from(configuration.table)
                .select("id, userMail, repJson")
                .eq("userMail", email)
                .maybeSingle();

            return {
                configuration,
                data,
                error
            };
        })
    );

    // Vérification des erreurs de recherche.
    const erreur = recherches.find(resultat => resultat.error);

    if (erreur) {
        console.error("Erreur Supabase :", erreur.error);
        throw new Error(
            "Impossible de rechercher cette adresse dans les trois tables."
        );
    }

    // On conserve uniquement les tables dans lesquelles
    // l'adresse e-mail a été trouvée.
    const resultatsTrouves = recherches.filter(
        resultat => resultat.data !== null
    );

    if (resultatsTrouves.length === 0) {
        throw new Error(
            "Aucune information trouvée pour cette adresse e-mail."
        );
    }

    if (resultatsTrouves.length > 1) {
        throw new Error(
            "Cette adresse existe dans plusieurs catégories. " +
            "La modification est interrompue pour éviter toute erreur."
        );
    }

    const resultat = resultatsTrouves[0];

    // Chargement du formulaire correspondant.
    await chargerScriptFormulaire(resultat.configuration);

    return {
        configuration: resultat.configuration,
        data: resultat.data
    };
}


/* ==================================================
   CHARGEMENT DU SCRIPT DU FORMULAIRE
   ================================================== */

function chargerScriptFormulaire(configuration) {

    return new Promise((resolve, reject) => {

        const zone = document.getElementById("contenuFormulaire");

        if (!zone) {
            reject(new Error("Zone de formulaire introuvable."));
            return;
        }

        // Supprimer un éventuel ancien formulaire.
        zone.replaceChildren();

        const script = document.createElement("script");

        script.src = configuration.fichier;

        script.onload = () => {
            script.remove();

            const formulaire = document.getElementById(
                configuration.formulaire
            );

            if (!formulaire) {
                reject(
                    new Error(
                        "Le formulaire " +
                        configuration.formulaire +
                        " n'a pas été créé."
                    )
                );
                return;
            }

            resolve();
        };

        script.onerror = () => {
            script.remove();
            reject(
                new Error(
                    "Impossible de charger " + configuration.fichier
                )
            );
        };

        zone.appendChild(script);
    });
}


// Fonction accessible depuis modMutual.js.
window.rechercherEtChargerFormulaire =
    rechercherEtChargerFormulaire;
