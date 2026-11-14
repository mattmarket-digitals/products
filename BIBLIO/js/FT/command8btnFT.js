console.log("command8btnFT.js chargé");
/* ==========================================================
   command8btnFT.js
   Configuration FermTerrap des commandes de présentation.

   INTEGRATION DANS presentation.js :

   1. En haut du fichier, avec les autres imports :

   import { chargerCommandesFT } from "./command8btnFT.js";

   2. Juste après l'insertion de htmlPresentation :

   chargerCommandesFT();

   FICHIERS :
   - command8btnFT.js : configuration FermTerrap
   - command8btn.js   : moteur générique des commandes

   ========================================================== */

"use strict";

// ---------- CONFIGURATION FERM TERRAP ----------

const configurationCommandesFT = {
    
    // Dimensions de l'icône du menu
    menuWidth: "100%",
    menuHeight: "100%",

    // Fichiers
    fichierMoteur: "../command8btn.js",
    menuIconJs: "../../icones/icMenu.js",

// Apparence commune des commandes
commandesFilter: "sepia(100%) saturate(500%) hue-rotate(65deg)",

// Bordure commune
commandesBorder: "4px solid #66BB6A",
commandesBorderRadius: "20px",

// Couleur de fond commune
commandesBackground: "#000000",//"#17351D",

// Couleur des icônes et des commandes
commandesColor: "#FFFFFF",
    // Texte affiché lorsque les commandes sont cachées
    texteCommandesCachees: "Le Projet.",
    texteCouleur: "var(--couleur-texte)",//"white",
    
    // Espacement
    gap: "4px",
    padding: "8px 4px",

    // Taille des textes des boutons
    fontMin: "9px",
    fontMax: "16px",
    compteurFontMin: "8px",
    compteurFontMax: "14px",

    menuAlt: "Afficher ou masquer les commandes",
    
// Apparence du texte de présentation


texteTaille: "clamp(18px, 3vw, 26px)",
textePolice: "inherit",
texteGraisse: "bold",
texteStyle: "normal",
    
    menuIconSecours: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAB9klEQVR42u2WT0/iQBiH319Lo6gHbtxI6gGXklBIXC7CJ7IHMRHCaXvT6Lci8gU4cNALvZULcFiBpNDXQ1ERyy7DOhv/zHNomiYz885v3nlSIoVCoVB8QwDoui5vfl3XAXy2UGJzIqLdnZ3r65uTygkzA9qfNsbExACYeREAP83Nq+swMYcMoN1u1+v16XRKRMz890oTiQQR1S8uWDKNRuN5udUa1hVnmodENJlMDMN4u+lFJFiNbfFl+SXuSIIgSCaTpmkKnKumaQAsy+r1evKi8jwvn88D0DRto96K2ouZU6lUNptds+GYsDaBiYiZgPu7u9FoFC0kJoj/4CCBm7g8LDbhdyEMQ7GcPqi3lqOStyEAny+wtZY3DMN13Uql8uLupUsaZ3F+/Vx/GZkBtG9vf7luEARilq+d1WRb/rxWE7b80Y8jIhqPx7HD/pFZMNvb38vlcsKWt23b9315Ufm+XywWt7F8Op22LEtSU3e73X6/ryz/HS0fXd0wDKWdoDafz75EWlFXNZvNarUaNSaALf+w4ixPRK1W6+rycr55h0X+dE4d2ZZ3HEfY8rZtE9HD74eEIcPywf7BQalUErb8z+PjwWAgL6rhcFgul7exfCaTKRQKAN5RrYt/eaJOp+N53heyfHSakmpiZnlSVCgUCoVCnEd1m/Qfp8a/3QAAAABJRU5ErkJggg=="
};
/*     */
/*   
const configurationCommandesFT = {

    // Chemin du moteur générique, relatif à ce fichier
    fichierMoteur: "../command8btn.js",

    // Accessibilité de l'icône
    menuAlt: "Afficher ou masquer les commandes",

    // Image de l'icône (facultatif)
    // Si absent, command8btn.js utilise son image intégrée.
    menuIconSrc: null,

    // Espacement entre les 9 emplacements
    gap: "4px",

    // Marge intérieure de la barre de commandes
    padding: "8px 4px",

    // Taille adaptative du texte des boutons
    fontMin: "9px",
    fontMax: "16px",

    // Taille adaptative du compteur
    compteurFontMin: "8px",
    compteurFontMax: "14px"
};
*/

// ---------- CHARGEMENT DU MOTEUR ----------

export function chargerCommandesFT() {

    const scriptCommandes = document.createElement("script");

    scriptCommandes.src = new URL(
        configurationCommandesFT.fichierMoteur,
        import.meta.url
    ).href;

const parametres = {
    command8btnJson: {
        menuAlt: configurationCommandesFT.menuAlt,

        // Icône de menu
        menuIconJs: new URL(
            configurationCommandesFT.menuIconJs,
            import.meta.url
        ).href,
        
menuWidth: configurationCommandesFT.menuWidth,
menuHeight: configurationCommandesFT.menuHeight,
commandesBackground: configurationCommandesFT.commandesBackground,

commandesBorder: configurationCommandesFT.commandesBorder,
commandesBorderRadius: configurationCommandesFT.commandesBorderRadius,

        // Filtre commun
        commandesFilter:
            configurationCommandesFT.commandesFilter,

        // Texte en mode commandes cachées
        texteCommandesCachees:
            configurationCommandesFT.texteCommandesCachees,

        texteCouleur:
            configurationCommandesFT.texteCouleur,

        texteTaille:
            configurationCommandesFT.texteTaille,

        // Dimensions et espacements
        gap: configurationCommandesFT.gap,
        padding: configurationCommandesFT.padding,

        fontMin: configurationCommandesFT.fontMin,
        fontMax: configurationCommandesFT.fontMax,

        compteurFontMin:
            configurationCommandesFT.compteurFontMin,

        compteurFontMax:
            configurationCommandesFT.compteurFontMax
    }
};

scriptCommandes.dataset.params = JSON.stringify(parametres);

    scriptCommandes.onerror = () => {
        console.error(
            "command8btnFT.js : impossible de charger command8btn.js",
            scriptCommandes.src
        );
        scriptCommandes.remove();
    };

    document.head.appendChild(scriptCommandes);
}
