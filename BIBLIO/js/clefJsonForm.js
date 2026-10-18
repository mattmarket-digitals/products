
"use strict";

/**
 * Récupère les réponses d'un formulaire et renvoie un objet.
 *
 * @param {HTMLFormElement} formulaire
 * @returns {Object} Réponses du formulaire
 */
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

window.clefJsonForm = clefJsonForm;

/*
function clefJsonForm(formulaire) {
    if (!(formulaire instanceof HTMLFormElement)) {
        throw new TypeError(
            "Le paramètre doit être un élément HTML <form>."
        );
    }

    const donnees = new FormData(formulaire);
    const reponses = {};

    // Récupération des valeurs renseignées.
    for (const [nom, valeurBrute] of donnees.entries()) {
        // Les fichiers ne sont pas traités par cette fonction.
        if (valeurBrute instanceof File) {
            continue;
        }

        let valeur = valeurBrute.trim();

        // Une chaîne vide devient null.
        if (valeur === "") {
            valeur = null;
        }

        // Les champs de type number deviennent des nombres.
        const champsDeMemeNom = Array.from(formulaire.elements)
            .filter(champ => champ.name === nom);

        const estNumerique = champsDeMemeNom.some(
            champ => champ.type === "number"
        );

        if (estNumerique && valeur !== null) {
            const nombre = Number(valeur);
            valeur = Number.isFinite(nombre) ? nombre : null;
        }

        // Si plusieurs réponses portent le même nom,
        // elles sont regroupées dans un tableau.
        if (Object.hasOwn(reponses, nom)) {
            if (!Array.isArray(reponses[nom])) {
                reponses[nom] = [reponses[nom]];
            }

            reponses[nom].push(valeur);
        } else {
            reponses[nom] = valeur;
        }
    }

    // Une catégorie de cases à cocher sans sélection
    // doit tout de même apparaître avec un tableau vide.
    formulaire
        .querySelectorAll('input[type="checkbox"][name]')
        .forEach(caseACocher => {
            const nom = caseACocher.name;

            if (!Object.hasOwn(reponses, nom)) {
                reponses[nom] = [];
            }
        });

    // L'email apparaît en premier dans l'objet retourné.
    const { email = null, ...autresReponses } = reponses;

    return {
        email,
        ...autresReponses
    };
}

window.clefJsonForm = clefJsonForm;*/