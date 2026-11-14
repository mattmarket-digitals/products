
"use strict";

// infPanel.js
console.log("infPanel.js chargé");

(() => {
    const scriptPrincipal = document.currentScript;

    if (!scriptPrincipal) {
        console.error("infPanel.js : balise script introuvable.");
        return;
    }

    // Lecture des paramètres
    let params = {};

    try {
        params = JSON.parse(scriptPrincipal.dataset.params || "{}");
    } catch (erreur) {
        console.error("infPanel.js : paramètres invalides.", erreur);
        return;
    }

    const hauteur = params.height || "70px";
    const couleurBord = params.borderColor || "green";
    const couleurOmbre = params.shadowColor || couleurBord;
    const couleurTexte = params.textColor || "white";
    const tailleTexte = params.fontSize || "30px";

    // Création du panneau inférieur
    scriptPrincipal.insertAdjacentHTML("afterend", `
        <div id="infPanel">
            <button type="button" id="infPanelGauche"
                aria-label="Afficher le fieldset précédent">
                |◀
            </button>

            <button type="button" id="infPanelDroite"
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
        </style>
    `);

    // Récupération des boutons
    const boutonGauche = document.getElementById("infPanelGauche");
    const boutonDroite = document.getElementById("infPanelDroite");

    // Récupération des fieldsets
    const fieldsets = Array.from(document.querySelectorAll("fieldset"));

    if (fieldsets.length === 0) {
        console.warn("infPanel.js : aucun fieldset trouvé.");
        boutonGauche.disabled = true;
        boutonDroite.disabled = true;
        return;
    }

    // Repérage du fieldset actuellement visible
    let indexActuel = fieldsets.findIndex(
        fieldset => getComputedStyle(fieldset).display !== "none"
    );

    if (indexActuel === -1) {
        indexActuel = 0;
        fieldsets[indexActuel].style.display = "block";
    }

    // Affichage du fieldset choisi

    function afficherFieldset(index) {
        if (index < 0 || index >= fieldsets.length) return;
    
        fieldsets.forEach((fieldset, i) => {
            fieldset.style.display = i === index ? "block" : "none";
        });
    
        indexActuel = index;
    
        // État des flèches
        boutonGauche.disabled = indexActuel === 0;
        boutonDroite.disabled = indexActuel === fieldsets.length - 1;
    
        // Affichage du bouton Submit uniquement au dernier fieldset
        const boutonSubmit = document.querySelector(
            '#formulaireFerme button[type="submit"]'
        );
    
        if (boutonSubmit) {
            boutonSubmit.style.display =
                boutonDroite.disabled ? "block" : "none";
        }
    }

    // Navigation
    boutonGauche.addEventListener("click", () => {
        afficherFieldset(indexActuel - 1);
    });

    boutonDroite.addEventListener("click", () => {
        afficherFieldset(indexActuel + 1);
    });

    // Initialisation
    afficherFieldset(indexActuel);

})();
