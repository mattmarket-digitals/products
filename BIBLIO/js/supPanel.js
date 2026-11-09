//SupPanel.js
/*######  Derniere intregration  #######
<!-- ######## Panneau params ##########-->
               <!--                 ###-->
<script                                
    src="../BIBLIO/js/supPanel.js"
    data-params='{
        "height": "70px",
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
#########################################*/
console.log("supPanel.js chargé");
"use strict";

(() => {
    const scriptPrincipal = document.currentScript;

    if (!scriptPrincipal) {
        console.error("supPanel.js : balise script introuvable.");
        return;
    }

    // Lecture des paramètres
    let params = {};

    try {
        params = JSON.parse(scriptPrincipal.dataset.params || "{}");
    } catch (erreur) {
        console.error("supPanel.js : paramètres invalides.", erreur);
        return;
    }

    // Dimensions et couleurs
    const hauteur = params.height || "70px";
    const couleurBord = params.borderColor || "green";
    const couleurOmbre = params.shadowColor || couleurBord;

    // Dimensions des icônes
    //const icMargRatio = params.icMargRatio ?? 71.43;
    const icMenuDim = params.icMenuDim || "50px";
    const icFlecheDim = params.icFlecheDim || "50px";

    // Création du panneau et de ses deux emplacements
    scriptPrincipal.insertAdjacentHTML("afterend", `
        <div id="supPanel">
            <div id="supPanelGauche"></div>
            <div id="supPanelDroite"></div>
        </div>

        <style>
            #supPanel {
                position: fixed;
                top: 0;
                left: 0;

                width: 100%;
                height: ${hauteur};

                display: flex;
                align-items: center;
                justify-content: space-between;

                box-sizing: border-box;
                padding: 0 10px;

                background: black;
                border: none;
                border-bottom: 2px solid ${couleurBord};
                box-shadow: 0 3px 8px ${couleurOmbre};

                z-index: 1000;
            }

            #supPanelGauche,
            #supPanelDroite {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 auto;
            }

            #supPanelGauche {
                width: ${icFlecheDim};
                height: ${icFlecheDim};
            }

            #supPanelDroite {
                width: ${icMenuDim};
                height: ${icMenuDim};
            }
        </style>
    `);

    // Récupération des emplacements
    const emplacementGauche =
        document.getElementById("supPanelGauche");

    const emplacementDroite =
        document.getElementById("supPanelDroite");

    // Chargement d'une icône dans son emplacement réservé
    function chargerIcone(chemin, emplacement, nom) {
        if (!chemin) return;

        const scriptIcone = document.createElement("script");
        scriptIcone.src = chemin;

        scriptIcone.onerror = () => {
            console.error(
                `supPanel.js : impossible de charger ${nom} : ${chemin}`
            );
            scriptIcone.remove();
        };

        emplacement.appendChild(scriptIcone);
    }

    chargerIcone(
        params.leftIconJs,
        emplacementGauche,
        "icFlecheG.js"
    );

    chargerIcone(
        params.rightIconJs,
        emplacementDroite,
        "icMenu.js"
    );

})();
