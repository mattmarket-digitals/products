"use strict";

/**
 * Récupère les réponses d'un formulaire et renvoie un objet.
 *
 * @param {HTMLFormElement} formulaire
 * @returns {{ userMail: string|null, repJson: Object }}
 */

// Récupération du formulaire de santé
const formulaire = document.getElementById("formulaireSante");

if (!(formulaire instanceof HTMLFormElement)) {
    console.error("Le formulaireSante est introuvable.");
} else {

    /* 1. Gestion de la confidentialité de l'e-mail */

    const champEmailPublic =
        formulaire.querySelector("#emailPublic");

    const choixConfidentialite =
        formulaire.querySelectorAll(
            'input[name="emailConfidentialite"]'
        );

    function actualiserEmailPublic() {
        const choix = formulaire.querySelector(
            'input[name="emailConfidentialite"]:checked'
        );

        const identifiantPublic = choix?.value === "public";

        champEmailPublic.disabled = identifiantPublic;

        if (identifiantPublic) {
            champEmailPublic.value = "";
        }
    }

    choixConfidentialite.forEach((choix) => {
        choix.addEventListener("change", actualiserEmailPublic);
    });

    actualiserEmailPublic();


    /* 2. Conversion du formulaire en objet JSON */

    function clefJsonForm(formulaire) {
        if (!(formulaire instanceof HTMLFormElement)) {
            throw new TypeError(
                "Le paramètre doit être un élément HTML <form>."
            );
        }

        const donnees = new FormData(formulaire);
        const repJson = {};

        // Récupération séparée de l'e-mail d'identification
        const userMail = String(
            donnees.get("email") ?? ""
        ).trim().toLowerCase() || null;

        for (const [nom, valeurBrute] of donnees.entries()) {

            // L'e-mail d'identification est traité séparément.
            if (nom === "email") continue;

            // Les fichiers ne sont pas traités ici.
            if (valeurBrute instanceof File) continue;

            let valeur = valeurBrute.trim();

            // Un champ vide devient null.
            if (valeur === "") {
                valeur = null;
            }

            // Conversion des champs de type number.
            const champ = Array.from(formulaire.elements).find(
                element =>
                    element.name === nom &&
                    element.type === "number"
            );

            if (champ && valeur !== null) {
                const nombre = Number(valeur);
                valeur = Number.isFinite(nombre)
                    ? nombre
                    : null;
            }

            // Regroupement des champs portant le même nom.
            if (Object.hasOwn(repJson, nom)) {
                if (!Array.isArray(repJson[nom])) {
                    repJson[nom] = [repJson[nom]];
                }

                repJson[nom].push(valeur);
            } else {
                repJson[nom] = valeur;
            }
        }

        // Les cases à cocher non sélectionnées sont
        // représentées par un tableau vide.
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

    // Rend la fonction accessible depuis les autres scripts.
    window.clefJsonForm = clefJsonForm;


    /* 3. Exemple d'utilisation lors de la soumission */

    formulaire.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        if (!formulaire.reportValidity()) {
            return;
        }

        const { userMail, repJson } = clefJsonForm(formulaire);

        console.log("E-mail d'identification :", userMail);
        console.log("Réponses du formulaire :", repJson);

        // L'enregistrement dans Supabase pourra être ajouté ici.
    });
}

//"use strict";


/**
 * Récupère les réponses d'un formulaire et renvoie un objet.
 *
 * @param {HTMLFormElement} formulaire
 * @returns {Object} Réponses du formulaire
 *//*
 
// Comportement email
const formulaire = document.getElementById("formulaireFerme");
const champEmailPublic = formulaire.querySelector("#emailPublic");
const choixConfidentialite = formulaire.querySelectorAll(
    'input[name="emailConfidentialite"]'
);
function actualiserEmailPublic() {
    const choix = formulaire.querySelector(
        'input[name="emailConfidentialite"]:checked'
    );
    const identifiantPublic = choix?.value === "public";
    champEmailPublic.disabled = identifiantPublic;
    if (identifiantPublic) {
        champEmailPublic.value = "";
    }
}
choixConfidentialite.forEach((choix) => {
    choix.addEventListener("change", actualiserEmailPublic);
});
actualiserEmailPublic();
//////////////////
function clefJsonForm(formulaire) {
    if (!(formulaire instanceof HTMLFormElement)) {
        throw new TypeError(
            "Le paramètre doit être un élément HTML <form>."
        );
    }

    const donnees = new FormData(formulaire);
    const repJson = {};

    // Récupère séparément l'email.
    const userMail = String(donnees.get("email") ?? "")
        .trim()
        .toLowerCase() || null;

    for (const [nom, valeurBrute] of donnees.entries()) {
        // L'email ne doit pas être inclus dans repJson.
        if (nom === "email") continue;

        // Les fichiers ne sont pas traités ici.
        if (valeurBrute instanceof File) continue;

        let valeur = valeurBrute.trim();

        // Un champ vide devient null.
        if (valeur === "") {
            valeur = null;
        }

        // Conversion des champs numériques.
        const champ = Array.from(formulaire.elements).find(
            element => element.name === nom
                && element.type === "number"
        );

        if (champ && valeur !== null) {
            const nombre = Number(valeur);
            valeur = Number.isFinite(nombre) ? nombre : null;
        }

        // Regroupement des champs portant le même nom.
        if (Object.hasOwn(repJson, nom)) {
            if (!Array.isArray(repJson[nom])) {
                repJson[nom] = [repJson[nom]];
            }

            repJson[nom].push(valeur);
        } else {
            repJson[nom] = valeur;
        }
    }

    // Les catégories de cases à cocher non sélectionnées
    // sont quand même présentes avec un tableau vide.
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
console.log(clefJsonForm);
window.clefJsonForm = clefJsonForm;

*/