
"use strict";

function afficherStatut(texte, classe) {
    const message = document.querySelector("#messageFormulaire");

    if (!message) {
        console.warn("Élément #messageFormulaire introuvable.");
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

// Message initial.
afficherStatut("En attente de saisie.", "statut-attente");

// Affiche les erreurs de validation natives du navigateur.
document.addEventListener("invalid", function (event) {
    if (event.target.form?.id !== "formulaireFerme") {
        return;
    }

    afficherStatut(
        "Erreur : vérifie les champs signalés dans le formulaire.",
        "statut-erreur"
    );
}, true);

// Écoute la soumission du formulaire.
document.addEventListener("submit", async function (event) {
    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        formulaire.id !== "formulaireFerme"
    ) {
        return;
    }

    // Empêche le rechargement de la page.
    event.preventDefault();

    if (!formulaire.checkValidity()) {
        formulaire.reportValidity();

        afficherStatut(
            "Erreur : certains champs sont invalides.",
            "statut-erreur"
        );
        return;
    }

    // Vérifie que le client Supabase est prêt.
    if (!window.clientSupabase) {
        afficherStatut(
            "Erreur : la connexion à Supabase n'est pas configurée.",
            "statut-erreur"
        );
        return;
    }

    // Évite les doubles clics pendant l'envoi.
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
        "statut-traitement"
    );

    try {
        // Prépare l'e-mail et les réponses séparément.
        const { userMail, repJson } =
            window.clefJsonForm(formulaire);

        if (!userMail) {
            afficherStatut(
                "Erreur : l'adresse e-mail est obligatoire.",
                "statut-erreur"
            );

            formulaire.querySelector('[name="email"]')?.focus();
            return;
        }

        // Envoie les deux colonnes à la table FermeInfo.
        const { error } = await window.clientSupabase
            .from("FermeInfo")
            .insert({
                userMail: userMail,
                repJson: repJson
            });

        if (error) {
            // 23505 = violation d'une contrainte unique.
            if (error.code === "23505") {
                afficherStatut(
                    "Cette adresse e-mail est déjà enregistrée.",
                    "statut-erreur"
                );
                return;
            }

            console.error("Erreur Supabase :", error);

            afficherStatut(
                "L'enregistrement a échoué. Vérifie la configuration et réessaie.",
                "statut-erreur"
            );
            return;
        }

        console.log("Proposition enregistrée dans FermeInfo.");

        afficherStatut(
            "Merci ! Les réponses ont bien été enregistrées.",
            "statut-pret"
        );

        formulaire.reset();

// L'enregistrement Supabase a réussi.
afficherStatut(
    "Enregistrement réussi. Ouverture de la liste des fermes…",
    "statut-pret"
);

// Redirection vers la liste des fermes.
window.location.href = "lireFermeInfo.html";

    } catch (erreur) {
        console.error("Erreur lors de l'envoi :", erreur);

        afficherStatut(
            "Une erreur est survenue pendant l'envoi. Réessaie.",
            "statut-erreur"
        );

    } finally {
        if (boutonEnvoi) {
            boutonEnvoi.disabled = false;
        }
    }
});

/*
"use strict";

const messageFormulaire = document.querySelector("#messageFormulaire");

function afficherStatut(texte, classe) {
    const message = document.querySelector("#messageFormulaire");

    if (!message) return;

    message.textContent = texte;
    message.classList.remove(
        "statut-attente",
        "statut-erreur",
        "statut-traitement",
        "statut-pret"
    );
    message.classList.add(classe);
}

// État initial de la page.
afficherStatut(
    "En attente de saisie.",
    "statut-attente"
);

// Le navigateur signale les champs invalides avant
// que l'événement submit ne soit déclenché.
document.addEventListener("invalid", function (event) {
    if (event.target.form?.id !== "formulaireFerme") return;

    afficherStatut(
        "Erreur : vérifie les champs signalés dans le formulaire.",
        "statut-erreur"
    );
}, true);

// Écoute la soumission, même si le formulaire a été
// inséré après le chargement initial de la page.
document.addEventListener("submit", function (event) {
    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        formulaire.id !== "formulaireFerme"
    ) {
        return;
    }

    event.preventDefault();

    if (!formulaire.checkValidity()) {
        formulaire.reportValidity();

        afficherStatut(
            "Erreur : certains champs sont invalides.",
            "statut-erreur"
        );
        return;
    }

    afficherStatut(
        "Traitement des réponses…",
        "statut-traitement"
    );

    try {
        const { userMail, repJson } = window.clefJsonForm(formulaire);

        if (!userMail) {
            afficherStatut(
                "Erreur : l'adresse e-mail est obligatoire.",
                "statut-erreur"
            );
            formulaire.querySelector('[name="email"]')?.focus();
            return;
        }

        // Affichage temporaire, en attendant Supabase.
        console.log("userMail :", userMail);
        console.log("repJson :", JSON.stringify(repJson, null, 2));

        afficherStatut(
            "Réponses préparées. Elles ne sont pas encore envoyées à Supabase.",
            "statut-pret"
        );

    } catch (erreur) {
        console.error("Erreur lors du traitement du formulaire :", erreur);

        afficherStatut(
            "Une erreur est survenue lors du traitement. Réessaie.",
            "statut-erreur"
        );
    }
});
*/

/*
    const formulaire = document.querySelector("#formulaireFerme");
    const message = document.querySelector("#messageFormulaire");

    formulaire.addEventListener("submit", function (event) {
        // Empêche le rechargement de la page.
        event.preventDefault();

        // Vérification de sécurité supplémentaire.
        if (!formulaire.checkValidity()) {
            formulaire.reportValidity();
            return;
        }

        // Récupération des réponses.
        const reponses = window.clefJsonForm(formulaire);

        // Affichage dans la console.
        console.log("Objet des réponses :", reponses);
        console.log("Format JSON :", JSON.stringify(reponses, null, 2));

        // Message visible sur la page.
        message.textContent =
            "Formulaire vérifié. Les réponses sont visibles dans la console.";
    });
*/