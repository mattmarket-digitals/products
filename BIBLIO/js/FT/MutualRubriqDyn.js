
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
 * Charge un formulaire dans un iframe invisible.
 *
 * @param {string} fichierFormulaire - Fichier JS qui construit le formulaire.
 * @param {string} identifiantFormulaire - ID du formulaire à extraire.
 */
async function chargerRubriques(
    fichierFormulaire,
    identifiantFormulaire
) {

    return new Promise((resolve, reject) => {

        const iframe = document.createElement("iframe");

        iframe.style.display = "none";
        iframe.setAttribute("aria-hidden", "true");

        iframe.onload = () => {

            const doc = iframe.contentDocument;

            const script = doc.createElement("script");

            script.src = new URL(
                fichierFormulaire,
                import.meta.url
            ).href;

            script.onload = () => {

                try {

                    const formulaire =
                        doc.getElementById(identifiantFormulaire);
                        
console.log("[MutualRubriqDyn] Formulaire trouvé :", formulaire);

                    if (!formulaire) {
                        throw new Error(
                            "Le formulaire " +
                            identifiantFormulaire +
                            " n'a pas été créé."
                        );
                    }

                    const resultat = construireRubriques(formulaire);

console.log("[MutualRubriqDyn] Nombre de rubriques :", resultat.length);
console.log("[MutualRubriqDyn] Rubriques extraites :", resultat);

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
                    new Error(
                        "Impossible de charger " + fichierFormulaire
                    )
                );
            };
console.log("[MutualRubriqDyn] URL du script chargé :", script.src);
            doc.body.appendChild(script);
        };

        iframe.onerror = () => {
            iframe.remove();
            reject(
                new Error("Impossible de créer le document temporaire.")
            );
        };

        document.body.appendChild(iframe);
    });
}



// * Configuration du formulaire à analyser. Pour lireFermeInfo.html :
// * Choix du formulaire en fonction de la page HTML.
const pageActuelle = window.location.pathname;

console.log("[MutualRubriqDyn] Page détectée :", pageActuelle);

let fichierFormulaire;
let identifiantFormulaire;

if (pageActuelle.endsWith("lireFermeInfo.html")) {

    fichierFormulaire = "../../../FermTerrap/ajFermeForm.js";
    identifiantFormulaire = "formulaireFerme";

} else if (pageActuelle.endsWith("lireSanteInfo.html")) {

    fichierFormulaire = "./ajSanteForm.js";
    identifiantFormulaire = "formulaireSante";

} else {
    throw new Error("Page non reconnue : " + pageActuelle);
}

console.log("[MutualRubriqDyn] Fichier formulaire choisi :", fichierFormulaire);
console.log("[MutualRubriqDyn] Identifiant formulaire choisi :", identifiantFormulaire);

export const rubriques = await chargerRubriques(
    fichierFormulaire,
    identifiantFormulaire
);

console.log("[MutualRubriqDyn] Rubriques exportées :", rubriques);
/*
export const rubriques = await chargerRubriques(
    "../../../FermTerrap/ajFermeForm.js",
    "formulaireFerme"
);
*/
