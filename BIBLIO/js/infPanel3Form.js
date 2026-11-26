
"use strict";

// infPanel.js
console.log("infPanel3Form.js chargé");

(() => {

    // ==================================================
    // 1. RÉCUPÉRATION DES PARAMÈTRES
    // ==================================================

    const scriptPrincipal = document.currentScript;

    if (!scriptPrincipal) {
        console.error("infPanel3Form.js : balise script introuvable.");
        return;
    }

    let params = {};

    try {
        params = JSON.parse(scriptPrincipal.dataset.params || "{}");
    } catch (erreur) {
        console.error("infPanel3Form.js : paramètres invalides.", erreur);
        return;
    }

    const hauteur = params.height || "70px";
    const couleurBord = params.borderColor || "green";
    const couleurOmbre = params.shadowColor || couleurBord;
    const couleurTexte = params.textColor || "white";
    const tailleTexte = params.fontSize || "30px";

    // Formulaire concerné
    const selecteurFormulaire = params.formSelector || "#formulaireFerme";

    // Mode de validation
    let modeValidation = params.checkInfo || "pasapas";

    const modesPossibles = ["pasapas", "goto", "allform"];

    if (!modesPossibles.includes(modeValidation)) {
        console.warn(
            "infPanel.js : mode checkInfo inconnu. Utilisation de pasapas."
        );
        modeValidation = "pasapas";
    }

    // Marges de défilement
    const margeHaut = params.scrollMarginTop || "85px";
    const margeBas = params.scrollMarginBottom || "85px";

// Présentation du fieldset Modalités d'accueil
const margeLaterale = params.fieldsetSideGap || "2px";
const tailleIcone = params.modaliteIconSize || "38px";
const espaceModalites = params.modaliteRowGap || "12px";

    // ==================================================
    // 2. RÉCUPÉRATION DU FORMULAIRE ET DES FIELDSETS
    // ==================================================

    const formulaire = document.querySelector(selecteurFormulaire);

    if (!formulaire) {
        console.error(
            "infPanel.js : formulaire introuvable :",
            selecteurFormulaire
        );
        return;
    }

    const fieldsets = Array.from(
        formulaire.querySelectorAll("fieldset")
    );

    if (fieldsets.length === 0) {
        console.error("infPanel3Form.js : aucun fieldset trouvé.");
        return;
    }

    // Le formulaire sera validé par ce script.
    // Les contrôles HTML habituels restent utilisés.
    formulaire.noValidate = true;

    // Préparation du défilement des fieldsets
    fieldsets.forEach(fieldset => {
        fieldset.style.scrollMarginTop = margeHaut;
        fieldset.style.scrollMarginBottom = margeBas;
    });


    // ==================================================
    // 3. CRÉATION DU PANNEAU INFÉRIEUR
    // ==================================================

    scriptPrincipal.insertAdjacentHTML("afterend", `
        <div id="infPanel">

            <button
                type="button"
                id="infPanelGauche"
                aria-label="Afficher le fieldset précédent">
                |◀
            </button>

            <button
                type="button"
                id="infPanelDroite"
                aria-label="Afficher le fieldset suivant">
                ▶|
            </button>

        </div>

        <style>

            #infPanel {
                position: fixed;
                bottom: 0;
                left: 0;

                width: 100%;
                height: ${hauteur};

                display: flex;
                align-items: center;
                justify-content: space-between;

                box-sizing: border-box;
                padding: 0 15px;

                background: black;
                border-top: 2px solid ${couleurBord};
                box-shadow: 0 -3px 8px ${couleurOmbre};

                z-index: 1000;
            }

            #infPanel button {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 55px;
                height: 55px;

                border: 1px solid ${couleurBord};
                border-radius: 10px;

                background: #252525;
                color: ${couleurTexte};

                font-size: ${tailleTexte};
                cursor: pointer;
            }

            #infPanel button:disabled {
                opacity: 0.25;
                cursor: not-allowed;
            }


            /* ==================================================
               FIELDSETS
               ================================================== */

            #formulaireFerme fieldset {
                box-sizing: border-box;
                width: calc(100% - ${margeLaterale} - ${margeLaterale});
                max-width: 850px;
                margin-left: ${margeLaterale};
                margin-right: ${margeLaterale};
            }

            /* ==================================================
               MODALITÉS D'ACCUEIL
               ================================================== */

            #formulaireFerme .fieldset-modalites {
                width: calc(100% - ${margeLaterale} - ${margeLaterale});
                max-width: none;
                margin-left: ${margeLaterale};
                margin-right: ${margeLaterale};
                box-sizing: border-box;
            }

            #formulaireFerme .modalite-item {
                margin-top: ${espaceModalites};
                margin-bottom: ${espaceModalites};
            }

            #formulaireFerme .modalite-item p {
                font-size: ${tailleIcone};
            }

        </style>
    `);


    // ==================================================
    // 4. RÉCUPÉRATION DES BOUTONS
    // ==================================================

    const boutonGauche = document.getElementById("infPanelGauche");
    const boutonDroite = document.getElementById("infPanelDroite");

    const boutonSubmit = formulaire.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (!boutonSubmit) {
        console.warn("infPanel3Form.js : bouton Submit introuvable.");
    }


    // ==================================================
    // 5. POSITION ACTUELLE
    // ==================================================
/*
let indexActuel = 0;
*/

    let indexActuel = fieldsets.findIndex(
        fieldset => getComputedStyle(fieldset).display !== "none"
    );

    if (indexActuel === -1) {
        indexActuel = 0;
    }

// ==================================================
// POSITIONNEMENT DU FIELDSET SOUS LE PANNEAU SUPÉRIEUR
// ==================================================

function positionnerFieldset(fieldset) {

    const panneauSuperieur = document.getElementById("supPanel");

    const hauteurPanneau = panneauSuperieur
        ? panneauSuperieur.getBoundingClientRect().height
        : 0;

    const espace = 12;

    const position =
        window.scrollY +
        fieldset.getBoundingClientRect().top -
        hauteurPanneau -
        espace;

    window.scrollTo({
        top: Math.max(0, position),
        behavior: "smooth"
    });
}

// Fermer le clavier avant de changer de fieldset
function changerEtape(index) {

    const elementActif = document.activeElement;

    if (
        elementActif &&
        formulaire.contains(elementActif) &&
        typeof elementActif.blur === "function"
    ) {
        elementActif.blur();
    }

    // Laisser le temps au clavier de disparaître
    window.setTimeout(() => {
        afficherFieldset(index);
    }, 250);
}

    // ==================================================
    // 6. AFFICHAGE D'UN FIELDSET
    // ==================================================
    

function afficherFieldset(index, defiler = true) {

    if (index < 0 || index >= fieldsets.length) return;

    fieldsets.forEach((fieldset, i) => {
        fieldset.style.display = i === index ? "block" : "none";
    });

    indexActuel = index;

    // État du bouton gauche
    boutonGauche.disabled = indexActuel === 0;

    // Le bouton droit reste actif, même au dernier fieldset.
    boutonDroite.disabled = false;

    // Au dernier fieldset, le bouton devient une coche.
    const estDernier = indexActuel === fieldsets.length - 1;

    boutonDroite.textContent = estDernier ? "✅" : "▶|";

    boutonDroite.setAttribute(
        "aria-label",
        estDernier
            ? "Valider le formulaire"
            : "Afficher le fieldset suivant"
    );

    // Submit du formulaire visible uniquement au dernier fieldset.
    if (boutonSubmit) {
        boutonSubmit.style.display = estDernier ? "" : "none";
    }

    // Défilement vers le haut du nouveau fieldset
    if (defiler) {
        fieldsets[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/*
    function afficherFieldset(index, defiler = true) {

        if (index < 0 || index >= fieldsets.length) return;

        fieldsets.forEach((fieldset, i) => {
            fieldset.style.display = i === index ? "block" : "none";
        });

        indexActuel = index;

        // État des flèches
        boutonGauche.disabled = indexActuel === 0;
        boutonDroite.disabled = indexActuel === fieldsets.length - 1;

        // Submit visible uniquement au dernier fieldset
        if (boutonSubmit) {
            boutonSubmit.style.display =
                boutonDroite.disabled ? "" : "none";
        }
        // Positionnement juste sous le panneau supérieur
        if (defiler) {
            positionnerFieldset(fieldsets[index]);
        }
    }
*/
/*
        // Défilement vers le haut du nouveau fieldset
        if (defiler) {
            fieldsets[index].scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
*/


    // ==================================================
    // 7. RECHERCHE D'UNE ERREUR DANS UN FIELDSET
    // ==================================================

    function premierChampInvalide(fieldset) {

        const champs = fieldset.querySelectorAll(
            "input, select, textarea"
        );

        for (const champ of champs) {

            if (!champ.willValidate) continue;

            if (!champ.validity.valid) {
                return champ;
            }
        }

        return null;
    }


    // ==================================================
    // 8. SIGNALER UNE ERREUR
    // ==================================================

    function signalerErreur(champ) {

        if (!champ) return;

        const fieldset = champ.closest("fieldset");

        if (fieldset) {

            const index = fieldsets.indexOf(fieldset);

            if (index !== -1) {
                afficherFieldset(index, false);
            }

            fieldset.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        champ.reportValidity();
        champ.focus();
    }


    // ==================================================
    // 9. NAVIGATION VERS LE FIELDSET PRÉCÉDENT
    // ==================================================
boutonGauche.addEventListener("click", () => {
    changerEtape(indexActuel - 1);
});    
/*
    boutonGauche.addEventListener("click", () => {

        afficherFieldset(indexActuel - 1);

    });
*/

    // ==================================================
    // 10. NAVIGATION VERS LE FIELDSET SUIVANT
    // ==================================================


boutonDroite.addEventListener("click", () => {

    // Au dernier fieldset : déclencher le submit.
    if (indexActuel === fieldsets.length - 1) {

        if (typeof formulaire.requestSubmit === "function") {

            if (boutonSubmit) {
                formulaire.requestSubmit(boutonSubmit);
            } else {
                formulaire.requestSubmit();
            }

        } else {
            console.error(
                "Votre navigateur ne permet pas requestSubmit()."
            );
        }

        return;
    }

    // Mode pasapas : vérifier avant de continuer.
    if (modeValidation === "pasapas") {

        const erreur = premierChampInvalide(
            fieldsets[indexActuel]
        );

        if (erreur) {
            signalerErreur(erreur);
            return;
        }
    }

    // Passage à l'étape suivante.
    afficherFieldset(indexActuel + 1);

});

/*
boutonDroite.addEventListener("click", () => {

    if (modeValidation === "pasapas") {

        const erreur = premierChampInvalide(
            fieldsets[indexActuel]
        );

        if (erreur) {
            signalerErreur(erreur);
            return;
        }
    }

    changerEtape(indexActuel + 1);

});
*/
/*
    boutonDroite.addEventListener("click", () => {

        // Mode pasapas : vérifier avant de continuer
        if (modeValidation === "pasapas") {

            const erreur = premierChampInvalide(
                fieldsets[indexActuel]
            );

            if (erreur) {
                signalerErreur(erreur);
                return;
            }
        }

        // Passage à l'étape suivante
        afficherFieldset(indexActuel + 1);

    });
*/

    // ==================================================
    // 11. RECHERCHE DE LA PREMIÈRE ERREUR DU FORMULAIRE
    // ==================================================

    function premiereErreurFormulaire() {

        const champs = formulaire.querySelectorAll(
            "input, select, textarea"
        );

        for (const champ of champs) {

            if (!champ.willValidate) continue;

            if (!champ.validity.valid) {
                return champ;
            }
        }

        return null;
    }


    // ==================================================
    // 12. CONTRÔLE AU MOMENT DU SUBMIT
    // ==================================================

    formulaire.addEventListener("submit", evenement => {

        const erreur = premiereErreurFormulaire();

        if (erreur) {

            evenement.preventDefault();
            evenement.stopImmediatePropagation();

            signalerErreur(erreur);

            return;
        }

        // Si aucune erreur :
        // les autres gestionnaires Submit peuvent continuer.
    });


    // ==================================================
    // 13. MODE ALLFORM
    // ==================================================

    if (modeValidation === "allform") {

        // Tous les fieldsets sont affichés
        fieldsets.forEach(fieldset => {
            fieldset.style.display = "block";
        });

        // Navigation désactivée
        boutonGauche.disabled = true;
        boutonDroite.disabled = true;

        // Submit toujours visible
        if (boutonSubmit) {
            boutonSubmit.style.display = "";
        }

    } else {

        // Initialisation des modes pasapas et goto
/*
// Le premier fieldset est toujours affiché au démarrage.
indexActuel = 0;
afficherFieldset(0, false);
*/

        afficherFieldset(indexActuel, false);


    }

    console.log("infPanel3Form.js : mode de validation =", modeValidation);
    console.log("infPanel3Form.js : nombre de fieldsets =", fieldsets.length);

})();
