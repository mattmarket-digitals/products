"use strict";

/**
 * Récupère les réponses du formulaire présent sur la page.
 *
 * Formulaires acceptés :
 * - formulaireFerme
 * - formulaireSante
 * - formulairePublic
 *
 * @param {HTMLFormElement} formulaire
 * @returns {{ userMail: string|null, repJson: Object }}
 */
function clefJsonForm(formulaire) {
    if (!(formulaire instanceof HTMLFormElement)) {
        throw new TypeError(
            "Le paramètre doit être un élément HTML <form>."
        );
    }

    const donnees = new FormData(formulaire);
    const repJson = {};

    // 1. Récupérer séparément l'e-mail d'identification.
    const userMail = String(
        donnees.get("email") ?? ""
    ).trim().toLowerCase() || null;

    // 2. Identifier les groupes de cases à cocher.
    const casesParNom = new Map();

    formulaire
        .querySelectorAll('input[type="checkbox"][name]')
        .forEach((caseACocher) => {
            if (!casesParNom.has(caseACocher.name)) {
                casesParNom.set(caseACocher.name, []);
            }

            casesParNom.get(caseACocher.name).push(caseACocher);
        });

    const nomsCasesMultiples = new Set();

    for (const [nom, cases] of casesParNom) {
        if (cases.length > 1) {
            nomsCasesMultiples.add(nom);
            repJson[nom] = [];
        }
    }

    // 3. Convertir les champs en données JSON.
    for (const [nom, valeurBrute] of donnees.entries()) {

        // L'e-mail d'identification est stocké séparément.
        if (nom === "email") {
            continue;
        }

        // Ne pas traiter les fichiers dans cette fonction.
        if (valeurBrute instanceof File) {
            continue;
        }

        let valeur = valeurBrute.trim();

        // Un champ vide devient null.
        if (valeur === "") {
            valeur = null;
        }

        // Convertir les champs numériques en nombres.
        const champ = Array.from(formulaire.elements).find(
            (element) =>
                element.name === nom &&
                element.type === "number"
        );

        if (champ && valeur !== null) {
            const nombre = Number(valeur);
            valeur = Number.isFinite(nombre) ? nombre : null;
        }

        // Les groupes de cases à cocher deviennent toujours des tableaux.
        if (nomsCasesMultiples.has(nom)) {
            if (valeur !== null) {
                repJson[nom].push(valeur);
            }
            continue;
        }

        // Regrouper les champs qui portent le même nom.
        if (Object.prototype.hasOwnProperty.call(repJson, nom)) {
            if (!Array.isArray(repJson[nom])) {
                repJson[nom] = [repJson[nom]];
            }

            repJson[nom].push(valeur);
        } else {
            repJson[nom] = valeur;
        }
    }

    // 4. Ajouter les cases à cocher non sélectionnées.
    for (const [nom, cases] of casesParNom) {
        if (nomsCasesMultiples.has(nom)) {
            // Un groupe sans sélection reste un tableau vide.
            if (!Object.prototype.hasOwnProperty.call(repJson, nom)) {
                repJson[nom] = [];
            }
        } else if (
            !Object.prototype.hasOwnProperty.call(repJson, nom)
        ) {
            // Une case unique non cochée devient null.
            repJson[nom] = null;
        }
    }

    // 5. Gérer explicitement la confidentialité de l'e-mail.
    const choixConfidentialite = formulaire.querySelector(
        'input[name="emailConfidentialite"]:checked'
    );

    if (choixConfidentialite?.value === "public") {
        // Le champ emailPublic peut être désactivé et absent de FormData.
        repJson.emailPublic = null;
    }

    return { userMail, repJson };
}


// Rendre la fonction accessible aux autres scripts.
window.clefJsonForm = clefJsonForm;


// 6. Détecter automatiquement le formulaire présent sur la page.
const formulaire = document.querySelector(
    "#formulaireFerme, #formulaireSante, #formulairePublic"
);

if (!(formulaire instanceof HTMLFormElement)) {
    console.error(
        "Aucun formulaire reconnu : formulaireFerme, formulaireSante ou formulairePublic."
    );
} else {
    formulaire.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        if (!formulaire.reportValidity()) {
            return;
        }

        const { userMail, repJson } = clefJsonForm(formulaire);

        console.log("E-mail d'identification :", userMail);
        console.log("Réponses du formulaire :", repJson);

        // L'enregistrement dans Supabase sera ajouté ici.
    });
}


/**
 * Récupère les réponses d'un formulaire et renvoie un objet.
 *
 * @param {HTMLFormElement} formulaire
 * @returns {{ userMail: string|null, repJson: Object }}
 *//*
//--------------
// Récupération du formulaire de santé
const formulaire = document.getElementById("formulaireSante");
//-------OU-------
// Comportement email
const formulaire = document.getElementById("formulaireFerme");
//--------------

if (!(formulaire instanceof HTMLFormElement)) {
    console.error("Le formulaireSante est introuvable.");
} else {
    
    // 1. Gestion de la confidentialité de l'e-mail 
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

    // 2. Conversion du formulaire en objet JSON 

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
//-------------
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

window.clefJsonForm = clefJsonForm;
//-------et-------
 
    // 3. Exemple d'utilisation lors de la soumission 

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
*/
