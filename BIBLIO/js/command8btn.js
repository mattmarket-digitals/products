console.log("command8btn.js chargé");
/* ==========================================================
   command8btn.js
   Affichage / masquage des commandes d'une présentation.

   INTEGRATION HTML (si chargement direct) :

   <script
       src="./command8btn.js"
       data-params='{
           "command8btnJson": {
               "menuAlt": "Afficher ou masquer les commandes"
           }
       }'>
   </script>

   Ou chargement dynamique depuis presentation.js.
   ========================================================== */

"use strict";

(() => {

    // ---------- LECTURE DES PARAMÈTRES ----------

    const scriptCourant = document.currentScript;

    if (!scriptCourant) {
        console.error("command8btn.js : script introuvable.");
        return;
    }

    let params = {};

    try {
        params = JSON.parse(scriptCourant.dataset.params || "{}");
    } catch (erreur) {
        console.error("command8btn.js : paramètres invalides.", erreur);
        return;
    }

    const config = params.command8btnJson || {};

    const texteMenu =
        config.menuAlt || "Afficher ou masquer les commandes";

    const largeurMenu = config.menuWidth || "50px";
    const hauteurMenu = config.menuHeight || "50px";

    // Image utilisée dans icMenu.js
    const imageMenu = config.menuIconSrc || 
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAB9klEQVR42u2WT0/iQBiH319Lo6gHbtxI6gGXklBIXC7CJ7IHMRHCaXvT6Lci8gU4cNALvZULcFiBpNDXQ1ERyy7DOhv/zHNomiYz885v3nlSIoVCoVB8QwDoui5vfl3XAXy2UGJzIqLdnZ3r65uTygkzA9qfNsbExACYeREAP83Nq+swMYcMoN1u1+v16XRKRMz890oTiQQR1S8uWDKNRuN5udUa1hVnmodENJlMDMN4u+lFJFiNbfFl+SXuSIIgSCaTpmkKnKumaQAsy+r1evKi8jwvn88D0DRto96K2ouZU6lUNptds+GYsDaBiYiZgPu7u9FoFC0kJoj/4CCBm7g8LDbhdyEMQ7GcPqi3lqOStyEAny+wtZY3DMN13Uql8uLupUsaZ3F+/Vx/GZkBtG9vf7luEARilq+d1WRb/rxWE7b80Y8jIhqPx7HD/pFZMNvb38vlcsKWt23b9315Ufm+XywWt7F8Op22LEtSU3e73X6/ryz/HS0fXd0wDKWdoDafz75EWlFXNZvNarUaNSaALf+w4ixPRK1W6+rycr55h0X+dE4d2ZZ3HEfY8rZtE9HD74eEIcPywf7BQalUErb8z+PjwWAgL6rhcFgul7exfCaTKRQKAN5RrYt/eaJOp+N53heyfHSakmpiZnlSVCgUCoVCnEd1m/Qfp8a/3QAAAABJRU5ErkJggg==";

    // ---------- RECHERCHE DE LA PRÉSENTATION ----------

    function installerCommandes() {

        const presentation =
            document.getElementById("presentation");

        if (!presentation) return false;

        const commandes =
            presentation.querySelector(".commandes");

        if (!commandes) return false;

        // Éviter une installation en double
        if (commandes.dataset.command8btn === "true") {
            return true;
        }

        commandes.dataset.command8btn = "true";

        // ---------- RÉCUPÉRATION DES BOUTONS ----------

        const boutonReculer5 =
            commandes.querySelector('[data-action="reculer5"]');

        const boutonPrecedente =
            commandes.querySelector('[data-action="precedente"]');

        const boutonLecture =
            commandes.querySelector('[data-action="lecture"]');

        const compteur =
            commandes.querySelector(".numero-slide");

        const boutonPause =
            commandes.querySelector('[data-action="pause"]');

        const boutonSuivante =
            commandes.querySelector('[data-action="suivante"]');

        const boutonAvancer5 =
            commandes.querySelector('[data-action="avancer5"]');

        const boutonPleinEcran =
            commandes.querySelector('[data-action="pleinEcran"]');

        const elementsObligatoires = [
            boutonReculer5,
            boutonPrecedente,
            boutonLecture,
            compteur,
            boutonPause,
            boutonSuivante,
            boutonAvancer5,
            boutonPleinEcran
        ];

        if (elementsObligatoires.some(element => !element)) {
            console.error(
                "command8btn.js : un ou plusieurs éléments de commande sont introuvables."
            );
            delete commandes.dataset.command8btn;
            return false;
        }
        
        // ---------- POSITIONNEMENT DES 9 EMPLACEMENTS ----------

boutonReculer5.style.gridColumn = "2";
boutonPrecedente.style.gridColumn = "3";
boutonLecture.style.gridColumn = "4";
compteur.style.gridColumn = "5";
boutonPause.style.gridColumn = "6";
boutonSuivante.style.gridColumn = "7";
boutonAvancer5.style.gridColumn = "8";
boutonPleinEcran.style.gridColumn = "9";

        // ---------- CRÉATION DU BOUTON MENU ----------

        const boutonMenu = document.createElement("button");

        boutonMenu.type = "button";
        boutonMenu.className = "bouton-menu-presentation";
        
boutonMenu.style.gridColumn = "1";

        boutonMenu.setAttribute("aria-label", texteMenu);
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.title = texteMenu;

// Création de l'icône de secours
const imageSecours = document.createElement("img");

imageSecours.src =
    config.menuIconSecours || "";

imageSecours.alt = "Menu";
imageSecours.className = "icone-menu-secours";

imageSecours.style.width = "85%";
imageSecours.style.height = "85%";
imageSecours.style.objectFit = "contain";

// L'icône de secours est cachée au départ
imageSecours.hidden = true;

boutonMenu.appendChild(imageSecours);

/*
// Chargement de l'icône principale depuis icMenu.js

if (config.menuIconJs) {

    const scriptIcone = document.createElement("script");

scriptIcone.dataset.mode = "presentation";
scriptIcone.src = config.menuIconJs;

    // En cas d'erreur réelle de chargement
    scriptIcone.onerror = () => {
        console.error("Impossible de charger icMenu.js");
        imageSecours.hidden = false;
        scriptIcone.remove();
    };

    // Le fichier est chargé : vérifier l'image injectée
    scriptIcone.onload = () => {
        
        console.log(
    "Image trouvée :",
    boutonMenu.querySelector("img.icone-menu")
);

        const imagePrincipale =
            boutonMenu.querySelector("img.icone-menu");

        if (imagePrincipale) {
            imageSecours.hidden = true;
        } else {
            console.warn("Image principale non trouvée : icône de secours utilisée.");
            imageSecours.hidden = false;
        }
    };

    boutonMenu.appendChild(scriptIcone);

} else {

    imageSecours.hidden = false;
}
*/
// Chargement de l'icône principale depuis icMenu.js
if (config.menuIconJs) {

    const scriptIcone = document.createElement("script");

    // Définir le mode avant de lancer le chargement
    scriptIcone.dataset.mode = "presentation";

    scriptIcone.onload = () => {

        console.log("icMenu.js chargé pour la présentation");

        const imagePrincipale =
            boutonMenu.querySelector("img.icone-menu");

        console.log("Image principale trouvée :", imagePrincipale);

        if (imagePrincipale) {
            imageSecours.hidden = true;
        } else {
            console.warn("Image principale absente : secours activé");
            imageSecours.hidden = false;
        }
    };

    scriptIcone.onerror = () => {

        console.error(
            "Erreur de chargement de icMenu.js :",
            scriptIcone.src
        );

        imageSecours.hidden = false;
        scriptIcone.remove();
    };

    // Affecter le chemin après les événements et les attributs
    scriptIcone.src = config.menuIconJs;

    boutonMenu.appendChild(scriptIcone);

} else {

    imageSecours.hidden = false;
}
/*
        const image = document.createElement("img");

        image.src = imageMenu;
        image.alt = "";
        image.draggable = false;

        boutonMenu.appendChild(image);
*/
        // Le menu est inséré en première position
        commandes.insertBefore(
            boutonMenu,
            commandes.firstChild
        );
// Texte visible lorsque les commandes sont cachées
const texteCommandes = document.createElement("span");

texteCommandes.className = "texte-commandes-cachees";

texteCommandes.textContent =
    config.texteCommandesCachees || "";

texteCommandes.style.color =
    config.texteCouleur || "white";

texteCommandes.style.fontSize =
    config.texteTaille || "14px";

texteCommandes.style.gridColumn = "2 / 9";

texteCommandes.style.textAlign = "center";
texteCommandes.style.alignItems = "center";
texteCommandes.style.justifyContent = "center";
texteCommandes.style.overflow = "hidden";

commandes.insertBefore(
    texteCommandes,
    boutonMenu.nextSibling
);
        // ---------- INSERTION DU CSS ----------

        const style = document.createElement("style");
        
        
style.textContent = `
    /* Barre des commandes */
    #presentation .commandes {
        display: grid;
        grid-template-columns: repeat(9, minmax(0, 1fr));
        align-items: center;
        justify-items: stretch;
        gap: ${config.gap || "4px"};
        width: 100%;
        padding: ${config.padding || "8px 4px"};
    }

    /* Dimensions et apparence communes des boutons et du compteur */
    #presentation .commandes > button,
    #presentation .commandes > .numero-slide {
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        min-height: 0;
        aspect-ratio: 1 / 1;
        margin: 0;
        border: ${config.commandesBorder || "1px solid #888"};
        border-radius: ${config.commandesBorderRadius || "10px"};
        background: ${config.commandesBackground || "#252525"};
        color: ${config.commandesColor || "white"};
        filter: ${config.commandesFilter || "none"};
    }

    /* Boutons de commande */
    #presentation .commandes > button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        overflow: hidden;
        font-size: clamp(
            ${config.fontMin || "9px"},
            2.5vw,
            ${config.fontMax || "16px"}
        );
        white-space: nowrap;
        cursor: pointer;
    }

    #presentation .commandes > button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    /* Compteur de diapositives */
    #presentation .commandes > .numero-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1px;
        overflow: hidden;
        text-align: center;
        font-size: clamp(
            ${config.compteurFontMin || "8px"},
            2vw,
            ${config.compteurFontMax || "14px"}
        );
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
    }

    /* Bouton contenant l'icône du menu */
    #presentation .bouton-menu-presentation {
        grid-column: 1;
        border: none !important;
        background: transparent !important;
        padding: 0 !important;
    }

    /* Icône du menu : même bordure et même fond */
    #presentation .bouton-menu-presentation img {
        display: block;
        box-sizing: border-box;
width: ${config.menuWidth || "85%"};
height: ${config.menuHeight || "85%"};
        object-fit: contain;
        border: ${config.commandesBorder || "1px solid #888"};
        border-radius: ${config.commandesBorderRadius || "10px"};
        background: ${config.commandesBackground || "#252525"};
        filter: ${config.commandesFilter || "none"};
        transition: transform 0.2s ease,
                    box-shadow 0.2s ease,
                    filter 0.2s ease;
    }

    /* Effet au survol du menu */
    @media (hover: hover) and (pointer: fine) {
        #presentation .bouton-menu-presentation:hover img {
            transform: scale(1.10);
            box-shadow: 0 0 8px ${config.commandesColor || "white"};
            filter: brightness(1.2);
        }
    }

    /* Effet au clic sur le menu */
    #presentation .bouton-menu-presentation:active img {
        transform: scale(0.92);
    }

    /* Contour de focus clavier */
    #presentation .commandes button:focus-visible {
        outline: 3px solid #FF69B4;
        outline-offset: 2px;
    }

    /* Texte affiché lorsque les commandes sont masquées */
    #presentation .commandes > .texte-commandes-cachees {
        display: flex;
        min-width: 0;
        white-space: nowrap;
        color: ${config.texteCouleur || "red"};
    }

    /* Respect de l'attribut hidden */
    #presentation .commandes [hidden] {
        display: none !important;
    }
`;


/*        style.textContent = `
            #presentation .commandes {
                justify-content: center;
            }

            #presentation .commandes.menu-reduit {
                justify-content: space-between;
            }

            #presentation .bouton-menu-presentation {
                display: flex;
                flex: 0 0 auto;
                align-items: center;
                justify-content: center;

                width: ${largeurMenu};
                height: ${hauteurMenu};

                min-width: 38px;
                min-height: 38px;

                padding: 0;
                border: none;
                background: transparent;
                cursor: pointer;
            }

            #presentation .bouton-menu-presentation img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;

                border: 1px solid white;
                border-radius: 10px;

                transition: transform 0.2s ease,
                            box-shadow 0.2s ease,
                            filter 0.2s ease;
            }

            @media (hover: hover) and (pointer: fine) {
                #presentation .bouton-menu-presentation:hover img {
                    transform: scale(1.10);
                    box-shadow: 0 0 8px white;
                    filter: brightness(1.2);
                }
            }

            #presentation .bouton-menu-presentation:active img {
                transform: scale(0.92);
            }

            #presentation .bouton-menu-presentation:focus-visible {
                outline: 3px solid #FF69B4;
                outline-offset: 2px;
            }

            #presentation .commandes [hidden] {
                display: none !important;
            }
        `;
*/

        document.head.appendChild(style);

        // ---------- ÉTAT INITIAL ----------

        const commandesMasquees = [
            boutonReculer5,
            boutonPrecedente,
            boutonLecture,
            compteur,
            boutonPause,
            boutonSuivante,
            boutonAvancer5
        ];

        commandesMasquees.forEach(element => {
            element.hidden = true;
        });

        // Plein écran reste toujours visible
        boutonPleinEcran.hidden = false;

//commandes.classList.add("menu-reduit");

        // ---------- OUVERTURE / FERMETURE ----------

        boutonMenu.addEventListener("click", () => {

            const menuOuvert =
                boutonMenu.getAttribute("aria-expanded") === "true";

            const nouvelEtat = !menuOuvert;

            commandesMasquees.forEach(element => {
                element.hidden = !nouvelEtat;
            });

            boutonMenu.setAttribute(
                "aria-expanded",
                String(nouvelEtat)
            );

            boutonMenu.title = nouvelEtat
                ? "Masquer les commandes"
                : texteMenu;

            boutonMenu.setAttribute(
                "aria-label",
                nouvelEtat
                    ? "Masquer les commandes"
                    : texteMenu
            );
texteCommandes.hidden = nouvelEtat;
/*commandes.classList.toggle(
    "menu-reduit",
    !nouvelEtat
);*/
        });

        return true;
    }

    // ---------- ATTENTE DE LA PRÉSENTATION ----------

    if (installerCommandes()) return;

    const observateur = new MutationObserver(() => {

        if (installerCommandes()) {
            observateur.disconnect();
        }
    });

    observateur.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
