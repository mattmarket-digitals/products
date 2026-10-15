
"use strict";

/* ==================================================
   1. CONFIGURATION : valeurs à personnaliser
   ================================================== */

const CONFIG_FORMULAIRE = {
    // Connexion Supabase
    supabaseUrl: "https://TON-PROJET.supabase.co",
    supabasePublishableKey: "sb_publishable_TA_CLE",

    // Table et colonnes
    table: "FermeInfo",
    colonneEmail: "userMail",
    colonneReponses: "repJson",

    // Éléments HTML
    idFormulaire: "formulaireFerme",
    idMessage: "messageFormulaire",
    nomChampEmail: "email",

    // Messages
    messageInitial: "En attente de saisie.",
    messageSucces: "Les réponses ont bien été enregistrées."
};


/* ==================================================
   2. INITIALISATION DE SUPABASE
   ================================================== */

if (!window.supabase) {
    throw new Error(
        "La bibliothèque Supabase doit être chargée avant ce fichier."
    );
}

const clientSupabaseFT = window.supabase.createClient(
    CONFIG_FORMULAIRE.supabaseUrl,
    CONFIG_FORMULAIRE.supabasePublishableKey
);


/* ==================================================
   3. AFFICHAGE DU STATUT
   ================================================== */

function afficherStatutFT(texte, classe) {
    const message = document.getElementById(
        CONFIG_FORMULAIRE.idMessage
    );

    if (!message) {
        console.warn("Élément de statut introuvable.");
        return;
    }

    message.textContent = texte;

    message.classList.remove(
        "statut-attente",
        "statut-erreur",
        "statut-traitement",
        "statut-pret"
    );

    message.classList.add(classe);
}


/* ==================================================
   4. PRÉPARATION DES RÉPONSES
   ================================================== */

function preparerDonneesFT(formulaire) {
    const donnees = new FormData(formulaire);
    const repJson = {};

    const userMail = String(
        donnees.get(CONFIG_FORMULAIRE.nomChampEmail) ?? ""
    ).trim().toLowerCase();

    for (const [nom, valeurBrute] of donnees.entries()) {
        if (nom === CONFIG_FORMULAIRE.nomChampEmail) {
            continue;
        }

        if (valeurBrute instanceof File) {
            continue;
        }

        let valeur = valeurBrute.trim();

        if (valeur === "") {
            valeur = null;
        }

        const champ = Array.from(formulaire.elements).find(
            element =>
                element.name === nom &&
                element.type === "number"
        );

        if (champ && valeur !== null) {
            const nombre = Number(valeur);
            valeur = Number.isFinite(nombre) ? nombre : null;
        }

        if (Object.hasOwn(repJson, nom)) {
            if (!Array.isArray(repJson[nom])) {
                repJson[nom] = [repJson[nom]];
            }

            repJson[nom].push(valeur);
        } else {
            repJson[nom] = valeur;
        }
    }

    // Les groupes de cases à cocher non cochées
    // doivent apparaître avec un tableau vide.
    formulaire
        .querySelectorAll('input[type="checkbox"][name]')
        .forEach(caseACocher => {
            const nom = caseACocher.name;

            if (!Object.hasOwn(repJson, nom)) {
                repJson[nom] = [];
            }
        });

    return { userMail, repJson };
}


/* ==================================================
   5. ENREGISTREMENT DANS SUPABASE
   ================================================== */

async function enregistrerDonneesFT(userMail, repJson) {
    const donnees = {
        [CONFIG_FORMULAIRE.colonneEmail]: userMail,
        [CONFIG_FORMULAIRE.colonneReponses]: repJson
    };

    const { error } = await clientSupabaseFT
        .from(CONFIG_FORMULAIRE.table)
        .insert(donnees);

    if (error) {
        if (error.code === "23505") {
            throw new Error(
                "Cette adresse e-mail est déjà enregistrée."
            );
        }

        console.error("Erreur Supabase :", error);
        throw new Error(
            "Impossible d'enregistrer les réponses."
        );
    }
}


/* ==================================================
   6. GESTION DE LA SOUMISSION
   ================================================== */

document.addEventListener("invalid", event => {
    if (event.target.form?.id !== CONFIG_FORMULAIRE.idFormulaire) {
        return;
    }

    afficherStatutFT(
        "Erreur : vérifie les champs signalés.",
        "statut-erreur"
    );
}, true);

document.addEventListener("submit", async event => {
    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        formulaire.id !== CONFIG_FORMULAIRE.idFormulaire
    ) {
        return;
    }

    event.preventDefault();

    if (!formulaire.checkValidity()) {
        formulaire.reportValidity();

        afficherStatutFT(
            "Erreur : certains champs sont invalides.",
            "statut-erreur"
        );
        return;
    }

    const bouton = formulaire.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (bouton?.disabled) return;

    if (bouton) bouton.disabled = true;

    afficherStatutFT(
        "Envoi des réponses à Supabase…",
        "statut-traitement"
    );

    try {
        const { userMail, repJson } = preparerDonneesFT(formulaire);

        if (!userMail) {
            afficherStatutFT(
                "Erreur : l'adresse e-mail est obligatoire.",
                "statut-erreur"
            );
            formulaire.querySelector(
                `[name="${CONFIG_FORMULAIRE.nomChampEmail}"]`
            )?.focus();
            return;
        }

        await enregistrerDonneesFT(userMail, repJson);

        afficherStatutFT(
            CONFIG_FORMULAIRE.messageSucces,
            "statut-pret"
        );

        formulaire.reset();

    } catch (erreur) {
        console.error(erreur);

        afficherStatutFT(
            erreur.message || "Une erreur est survenue.",
            "statut-erreur"
        );

    } finally {
        if (bouton) bouton.disabled = false;
    }
});


// Message initial au chargement du script.
afficherStatutFT(
    CONFIG_FORMULAIRE.messageInitial,
    "statut-attente"
);
