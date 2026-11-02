"use strict";

const formName = "formulairePublic"; 
//"formulaireId"; //ton formulaire
// <script src="../BIBLIO/js/FormToJson.js"></script>
/* coller dans html à l'endroit des reponses
<h3>Réponses du formulaire</h3>
<pre id="resultatFormulaire"></pre>
/////////////////////dans le submit du js
const resultat = document.getElementById("resultatFormulaire");
resultat.textContent = JSON.stringify(repJson, null, 4);
*/


//utiliser window.FormToJson("formulaireId")
/**
 * Récupère les réponses du formulaire.
 *
 * @param {HTMLFormElement} formulaire
 * @returns {Object} Les réponses du formulaire.
 */
function FormToJson(formulaire) {
    if (!(formulaire instanceof HTMLFormElement)) {
        throw new TypeError(
            "Le paramètre doit être un élément HTML <form>."
        );
    }

    const donnees = new FormData(formulaire);
    const repJson = {};

    // 1. Identifier les groupes de cases à cocher.
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

    // 2. Convertir les champs en données JSON.
    for (const [nom, valeurBrute] of donnees.entries()) {

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

    // 3. Ajouter les cases à cocher non sélectionnées.
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

    return repJson;
}


// Rendre la fonction accessible aux autres scripts.
window.FormToJson = FormToJson;

// Détecter automatiquement le formulaire.

const formulaire = document.getElementById(formName);

if (!(formulaire instanceof HTMLFormElement)) {
    console.error(`Aucun formulaire reconnu : ${formName}.`);
} else {
    formulaire.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        if (!formulaire.reportValidity()) {
            return;
        }

        const repJson = FormToJson(formulaire);

        console.log("Réponses du formulaire :", repJson);
        
        const resultat = document.getElementById("resultatFormulaire");
        if (resultat) {
            resultat.textContent = JSON.stringify(repJson, null, 4);
        }
        
    });
}
/*
        ////////////////////
        document.currentScript.insertAdjacentHTML(
            "afterend",
            `
                <h3>Réponses du formulaire</h3>
                <pre id="resultatFormulaire"></pre>
            `
        );
        ///////////////////
*/