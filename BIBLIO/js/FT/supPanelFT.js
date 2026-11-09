// intégration:  <script src="../BIBLIO/js/FT/supPanelFTparam.js"></script>


"use strict";

console.log("supPanelFTparam.js chargé");

// Détermination de l'icône gauche
const aUnPrecedent = Boolean(document.referrer);

const iconeGauche = aUnPrecedent
    ? "../BIBLIO/icones/icPrec.js"
    : "../BIBLIO/icones/icAcc.js";

// Paramètres du panneau
const paramsSupPanelFT = {
    height: "60px",
    borderColor: "green",
    shadowColor: "green",

    leftIconJs: iconeGauche,
    icFlecheDim: "50px",

    rightIconJs: "../BIBLIO/icones/icMenu.js",
    icMenuDim: "50px"
};

// Création de la balise script
const scriptSupPanel = document.createElement("script");

scriptSupPanel.src = "../BIBLIO/js/supPanel.js";
scriptSupPanel.dataset.params = JSON.stringify(paramsSupPanelFT);

// Après chargement du panneau, ajout du comportement Précédent
scriptSupPanel.onload = () => {

    if (!aUnPrecedent) return;

    const emplacementGauche =
        document.getElementById("supPanelGauche");

    if (!emplacementGauche) {
        console.error("Emplacement de l'icône gauche introuvable.");
        return;
    }

    // Attendre que l'image soit insérée par icPrec.js
    const observer = new MutationObserver(() => {

        const icone = emplacementGauche.querySelector("img");

        if (!icone) return;

        observer.disconnect();

        icone.style.cursor = "pointer";

        icone.addEventListener("click", () => {
            history.back();
        });
    });

    observer.observe(emplacementGauche, {
        childList: true,
        subtree: true
    });
};

// Insertion et exécution
document.currentScript.insertAdjacentElement(
    "afterend",
    scriptSupPanel
);



/*
document.currentScript.insertAdjacentHTML("afterend", `

<!-- ######## Panneau params ##########-->
               <!--                 ###-->
<script                                
    src="../BIBLIO/js/supPanel.js"
    data-params='{
        "height": "60px",
        "borderColor": "green", 
        "shadowColor": "green",
        "leftIconJs": "../BIBLIO/icones/icAcc.js",
        "icFlecheDim": "50px",
        "rightIconJs": "../BIBLIO/icones/icMenu.js",
        "icMenuDim": "50px"
    }'>
</script>
<!--                                ##
// ces 2 color en variable commune?##
//##################################
<script src="../BIBLIO/icones/icMenu.js"></script>
-->    
`);
*/