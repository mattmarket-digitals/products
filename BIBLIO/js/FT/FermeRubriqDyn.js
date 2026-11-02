
"use strict";

/**
 * Extrait les rubriques d'un formulaire HTML.
 */
function construireRubriques(formulaire) {

    const rubriques = [];

    formulaire.querySelectorAll("fieldset").forEach(fieldset => {

        const legend = fieldset.querySelector(":scope > legend");

        if (!legend) return;

        const rubrique = {
            titre: legend.textContent.trim(),
            champs: []
        };

        const nomsDejaTraites = new Set();

        fieldset.querySelectorAll(
            "input[name], select[name], textarea[name]"
        ).forEach(element => {

            const nom = element.name;

            if (!nom || nomsDejaTraites.has(nom)) return;

            if (["submit", "button", "reset"].includes(element.type)) {
                return;
            }

            let label = null;

            if (element.id) {
                label = fieldset.querySelector(
                    `label[for="${CSS.escape(element.id)}"]`
                );
            }

            if (!label) {
                label = element.closest("label");
            }

            if (!label) return;

            const libelle = label.textContent
                .trim()
                .replace(/\s+/g, " ");

            rubrique.champs.push([nom, libelle]);

            nomsDejaTraites.add(nom);
        });

        if (rubrique.champs.length > 0) {
            rubriques.push(rubrique);
        }
    });

    return rubriques;
}


/**
 * Charge ajFermeForm.js dans un iframe invisible.
 */
async function chargerRubriques() {

    return new Promise((resolve, reject) => {

        const iframe = document.createElement("iframe");

        iframe.style.display = "none";
        iframe.setAttribute("aria-hidden", "true");

        iframe.onload = () => {

            try {

                const doc = iframe.contentDocument;

                // Créer un élément qui jouera le rôle
                // de document.currentScript.
                const script = doc.createElement("script");

                script.src = new URL(
                    "../../../FermTerrap/ajFermeForm.js",
                    import.meta.url
                ).href;

                script.onload = () => {

                    try {

                        const formulaire =
                            doc.getElementById("formulaireFerme");

                        if (!formulaire) {
                            throw new Error(
                                "Le formulaire formulaireFerme n'a pas été créé."
                            );
                        }

                        const resultat = construireRubriques(formulaire);

                        iframe.remove();

                        resolve(resultat);

                    } catch (erreur) {
                        iframe.remove();
                        reject(erreur);
                    }
                };

                script.onerror = () => {
                    iframe.remove();
                    reject(
                        new Error("Impossible d'exécuter ajFermeForm.js.")
                    );
                };

                doc.body.appendChild(script);

            } catch (erreur) {
                iframe.remove();
                reject(erreur);
            }
        };

        iframe.onerror = () => {
            iframe.remove();
            reject(new Error("Impossible de créer le document temporaire."));
        };

        document.body.appendChild(iframe);
    });
}


// Export des rubriques
export const rubriques = await chargerRubriques();



/**
 * Construit la liste des rubriques à partir d'un formulaire HTML.
 *
 * Résultat :
 * [
 *   {
 *     titre: "Identifiant et confidentialité",
 *     champs: [
 *       ["email", "E-mail (identifiant)"],
 *       ["emailConfidentialite", "Confidentialité de l'identifiant"]
 *     ]
 *   }
 * ]
 */
/*
function construireRubriques(formulaire) {

    if (!(formulaire instanceof HTMLFormElement)) {
        throw new Error("Le formulaire fourni est introuvable ou invalide.");
    }

    const rubriques = [];

    // Parcours des fieldsets du formulaire
    const fieldsets = formulaire.querySelectorAll("fieldset");

    fieldsets.forEach(fieldset => {

        const legend = fieldset.querySelector(":scope > legend");

        if (!legend) return;

        const rubrique = {
            titre: legend.textContent.trim(),
            champs: []
        };

        const nomsDejaTraites = new Set();

        // Parcours des éléments qui possèdent un attribut name
        const elements = fieldset.querySelectorAll(
            "input[name], select[name], textarea[name]"
        );

        elements.forEach(element => {

            const nom = element.name;

            // Éviter les doublons (notamment les cases à cocher)
            if (!nom || nomsDejaTraites.has(nom)) return;

            // Ne pas inclure les boutons
            if (
                element.type === "submit" ||
                element.type === "button" ||
                element.type === "reset"
            ) {
                return;
            }

            // Chercher le label associé au champ
            let label = null;

            if (element.id) {
                label = fieldset.querySelector(
                    `label[for="${CSS.escape(element.id)}"]`
                );
            }

            // Si le label contient directement le champ
            if (!label) {
                label = element.closest("label");
            }

            // Si aucun label n'est trouvé, ignorer le champ
            if (!label) return;

            // Pour un label contenant un input, ne récupérer
            // que le texte du label, sans le texte de l'input.
            let libelle = label.textContent.trim();

            // Nettoyage des espaces et des retours à la ligne
            libelle = libelle.replace(/\s+/g, " ");

            // Ajouter le champ à la rubrique
            rubrique.champs.push([nom, libelle]);

            nomsDejaTraites.add(nom);
        });

        if (rubrique.champs.length > 0) {
            rubriques.push(rubrique);
        }
    });

    return rubriques;
}



// * Attend que le formulaire soit présent dans la page.
// * Le formulaire étant injecté par ajFermeForm.js,
// * il peut être nécessaire d'attendre sa création.

function obtenirRubriquesFerme() {

    const formulaire = document.getElementById("formulaireFerme");

    if (!formulaire) {
        throw new Error(
            "Le formulaire formulaireFerme n'a pas été trouvé dans la page."
        );
    }

    return construireRubriques(formulaire);
}


// Export pour lireFormTxt.js
export const rubriques = obtenirRubriquesFerme();
*/

/*
 * Construction automatique des rubriques
 * à partir du formulaire HTML.
 */
 //dans lireFermeInfo.html <!-- Vérification et masquage du formulaire -->
 /*
 const formulaire = document.getElementById("formulaireFerme");

    if (formulaire) {
        formulaire.hidden = true;
        console.log("FormulaireFerme trouvé.");
    } else {
        console.error("Le formulaire formulaireFerme n'a pas été créé.");
    }
////////////////////

function construireRubriques(formulaire) {

    if (!formulaire) {
        console.error("Formulaire introuvable.");
        return [];
    }

    const rubriques = [];

    // Parcourir les fieldset du formulaire.
    const fieldsets = formulaire.querySelectorAll("fieldset");

    fieldsets.forEach((fieldset) => {

        const legend = fieldset.querySelector("legend");

        const titre = legend
            ? legend.textContent.trim()
            : "Autres questions";

        const champs = [];

        // Parcourir les champs du fieldset.
        const elements = fieldset.querySelectorAll(
            "input[name], select[name], textarea[name]"
        );

        elements.forEach((element) => {

            const nom = element.name;

            // Éviter les doublons (notamment les cases à cocher).
            if (champs.some((champ) => champ[0] === nom)) {
                return;
            }

            // Chercher le label associé au champ.
            let label = "";

            if (element.id) {
                const etiquette = fieldset.querySelector(
                    `label[for="${CSS.escape(element.id)}"]`
                );

                if (etiquette) {
                    label = etiquette.textContent.trim();
                }
            }

            // Si le label utilise directement le champ
            // (cas des cases à cocher), le chercher dans le parent.
            if (!label) {
                const parentLabel = element.closest("label");

                if (parentLabel) {
                    label = parentLabel.textContent.trim();
                }
            }

            // Si aucun label n'est trouvé, utiliser le name.
            if (!label) {
                label = nom;
            }

            champs.push([nom, label]);
        });

        if (champs.length > 0) {
            rubriques.push({
                titre: titre,
                champs: champs
            });
        }
    });

    return rubriques;
}


// Rendre la fonction disponible aux autres scripts.
window.construireRubriques = construireRubriques;
*/