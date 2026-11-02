
"use strict";

/*
 * Construction automatique des rubriques
 * à partir du formulaire HTML.
 */
 //dans lireFermeInfo.html <!-- Vérification et masquage du formulaire -->
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
