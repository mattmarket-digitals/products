
"use strict";

/*
 * Enregistrement mutualisé des trois formulaires FermTerrap.
 *
 * formulaireFerme  -> FermeInfo
 * formulaireSante  -> SanteInfo
 * formulairePublic -> PublicInfo
 */

// 1. Configuration des formulaires.
const configurationFormulaires = {
    formulaireFerme: {
        table: "FermeInfo",
        message: "messageFormulaire",
        redirection: "lireFermeInfo.html"
    },

    formulaireSante: {
        table: "SanteInfo",
        message: "messageFormulaireSante",
        redirection: "lireSanteInfo.html"
    },

    formulairePublic: {
        table: "PublicInfo",
        message: "messageFormulairePublic",
        redirection: null
    }
};


// 2. Affichage des messages.
function afficherStatut(texte, classe, formulaire) {
    const configuration =
        configurationFormulaires[formulaire.id];

    const message = document.getElementById(
        configuration.message
    );

    if (!message) {
        console.warn(
            "Élément de statut introuvable :",
            configuration.message
        );
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


// 3. Initialisation du message.
const formulairePresent = document.querySelector(
    "#formulaireFerme, #formulaireSante, #formulairePublic"
);

if (formulairePresent) {
    afficherStatut(
        "En attente de saisie.",
        "statut-attente",
        formulairePresent
    );
}


// 4. Gestion des erreurs de validation.
document.addEventListener("invalid", function (event) {
    const formulaire = event.target.form;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        !configurationFormulaires[formulaire.id]
    ) {
        return;
    }

    afficherStatut(
        "Erreur : vérifie les champs signalés dans le formulaire.",
        "statut-erreur",
        formulaire
    );

}, true);


// 5. Enregistrement des formulaires.
document.addEventListener("submit", async function (event) {

    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        !configurationFormulaires[formulaire.id]
    ) {
        return;
    }

    event.preventDefault();

    const configuration =
        configurationFormulaires[formulaire.id];

    // Vérification des champs.
    if (!formulaire.checkValidity()) {
        formulaire.reportValidity();

        afficherStatut(
            "Erreur : certains champs sont invalides.",
            "statut-erreur",
            formulaire
        );
        return;
    }

    // Vérification de Supabase.
    if (!window.clientSupabase) {
        afficherStatut(
            "Erreur : la connexion à Supabase n'est pas configurée.",
            "statut-erreur",
            formulaire
        );
        return;
    }

    // Vérification du convertisseur JSON.
    if (typeof window.clefJsonForm !== "function") {
        afficherStatut(
            "Erreur : MutualFormJson.js n'est pas chargé.",
            "statut-erreur",
            formulaire
        );
        return;
    }

    // Éviter les doubles soumissions.
    const boutonEnvoi = formulaire.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (boutonEnvoi?.disabled) {
        return;
    }

    if (boutonEnvoi) {
        boutonEnvoi.disabled = true;
    }

    afficherStatut(
        "Envoi des réponses à Supabase…",
        "statut-traitement",
        formulaire
    );

    try {

        // Préparation des données.
        const { userMail, repJson } =
            window.clefJsonForm(formulaire);

        if (!userMail) {
            afficherStatut(
                "Erreur : l'adresse e-mail est obligatoire.",
                "statut-erreur",
                formulaire
            );

            formulaire.querySelector('[name="email"]')?.focus();
            return;
        }

        // Enregistrement dans Supabase.
        const { error } = await window.clientSupabase
            .from(configuration.table)
            .insert({
                userMail: userMail,
                repJson: repJson
            });

        // Affichage des erreurs Supabase.
        if (error) {

            console.error("ERREUR SUPABASE :", {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint
            });

            // Adresse e-mail déjà enregistrée.
            if (error.code === "23505") {
                afficherStatut(
                    "Cette adresse e-mail est déjà enregistrée.",
                    "statut-erreur",
                    formulaire
                );
                return;
            }

            throw error;
        }

        // Enregistrement réussi.
        console.log(
            "Enregistrement réussi dans :",
            configuration.table
        );

        afficherStatut(
            "Merci ! Tes réponses ont bien été enregistrées.",
            "statut-pret",
            formulaire
        );

        formulaire.reset();

        // Redirection éventuelle.
        if (configuration.redirection) {

            afficherStatut(
                "Enregistrement réussi. Ouverture de la liste des fermes…",
                "statut-pret",
                formulaire
            );

            window.location.href = configuration.redirection;
        }

    } catch (erreur) {

        console.error("ERREUR COMPLÈTE :", erreur);

        console.error("Détails :", {
            name: erreur?.name,
            message: erreur?.message,
            code: erreur?.code,
            details: erreur?.details,
            hint: erreur?.hint,
            stack: erreur?.stack
        });

        afficherStatut(
            "Erreur lors de l'envoi : " +
            (erreur?.message || String(erreur)),
            "statut-erreur",
            formulaire
        );

    } finally {

        if (boutonEnvoi) {
            boutonEnvoi.disabled = false;
        }
    }
});
