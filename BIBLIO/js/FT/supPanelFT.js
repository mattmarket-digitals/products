// intégration:  <script src="../BIBLIO/js/FT/supPanelFT.js"></script>


"use strict";

console.log("supPanelFT.js chargé");

// Détermination de l'icône gauche
const aUnPrecedent = Boolean(document.referrer);

const iconeGauche = aUnPrecedent
    ? "../BIBLIO/icones/icPrec.js"
    : "../BIBLIO/icones/icAcc.js";

// Paramètres du panneau supérieur
const paramsSupPanelFT = {
    height: "60px",
    borderColor: "green",
    shadowColor: "green",

    homePage: "FermTerrap.html",

    leftIconJs: iconeGauche,
    icFlecheDim: "50px",

    rightIconJs: "../BIBLIO/icones/icMenu.js",
    icMenuDim: "50px"
};

// Création du script du panneau
const scriptSupPanel = document.createElement("script");

scriptSupPanel.src = "../BIBLIO/js/supPanel.js";
scriptSupPanel.dataset.params = JSON.stringify(paramsSupPanelFT);

// Page d'accueil du site
//const pageAccueil = params.homePage || "FermTerrap.html";

// Après chargement du panneau
scriptSupPanel.onload = () => {

    // --- Icône gauche : Précédent ---

    if (aUnPrecedent) {

        const emplacementGauche =
            document.getElementById("supPanelGauche");

        if (emplacementGauche) {

            const observerGauche = new MutationObserver(() => {
                const icone = emplacementGauche.querySelector("img");

                if (!icone) return;

                observerGauche.disconnect();

                icone.style.cursor = "pointer";

                icone.addEventListener("click", () => {
                    history.back();
                });
            });

            observerGauche.observe(emplacementGauche, {
                childList: true,
                subtree: true
            });
        }
    }

    // --- Icône droite : ouverture du menu ---

    const emplacementDroite =
        document.getElementById("supPanelDroite");

    if (!emplacementDroite) {
        console.error("Emplacement de l'icône droite introuvable.");
        return;
    }

    const observerDroite = new MutationObserver(() => {

        const icone = emplacementDroite.querySelector("img");

        if (!icone) return;

        observerDroite.disconnect();

        icone.style.cursor = "pointer";

        icone.addEventListener("click", ouvrirFermerMenu);
    });

    observerDroite.observe(emplacementDroite, {
        childList: true,
        subtree: true
    });
};

// Insertion et exécution du script du panneau
document.currentScript.insertAdjacentElement(
    "afterend",
    scriptSupPanel
);


// =====================================
// Gestion du menu déroulant
// =====================================

function ouvrirFermerMenu() {

    // Si le menu existe déjà, on le ferme
    const menuExistant = document.getElementById("cadreLabel");

    if (menuExistant) {
        menuExistant.remove();
        return;
    }

    // Création du conteneur du menu
    const cadre = document.createElement("div");

    cadre.id = "cadreLabel";

    cadre.style.position = "fixed";
    cadre.style.top = "60px";
    cadre.style.right = "0";
    cadre.style.zIndex = "999";

    cadre.style.background = "black";
    cadre.style.color = "white";
    cadre.style.padding = "10px";
    cadre.style.minWidth = "220px";

    cadre.style.border = "1px solid green";
    cadre.style.boxShadow = "0 3px 8px green";

    document.body.appendChild(cadre);

    // Chargement de cadreLabel.js dans le conteneur
    const scriptMenu = document.createElement("script");

    scriptMenu.src = "../BIBLIO/js/cadreLabel.js";

    cadre.appendChild(scriptMenu);
}

/*function chargerIcone(chemin, emplacement, nom) {
    if (!chemin) return;

    const scriptIcone = document.createElement("script");
    scriptIcone.src = chemin;
    scriptIcone.dataset.homePage = pageAccueil;

    scriptIcone.onerror = () => {
        console.error(
            `supPanel.js : impossible de charger ${nom} : ${chemin}`
        );
        scriptIcone.remove();
    };

    emplacement.appendChild(scriptIcone);
}*/

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