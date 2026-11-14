/* Dans html :
<script src="../BIBLIO/icones/icMenu.js"></script>
*/

/*
console.log("icMenu.js chargé");

// Récupération du script qui exécute ce fichier
const scriptCourant = document.currentScript;

// Détection du mode présentation
const modePresentation =
    scriptCourant?.dataset.mode === "presentation";

console.log("Mode présentation :", modePresentation);
console.log("Script icMenu :", scriptCourant);

// Vérification de la disponibilité du menu général
const menuDisponible =
    modePresentation ||
    (
        window.contenuMenu !== null &&
        window.contenuMenu !== undefined &&
        String(window.contenuMenu).trim() !== ""
    );   
    
scriptCourant.insertAdjacentHTML("afterend", `  */

"use strict";

(() => {

    console.log("icMenu.js chargé");

    // Récupération du script qui exécute ce fichier
    const scriptCourant = document.currentScript;

    // Détection du mode présentation
    const modePresentation =
        scriptCourant?.dataset.mode === "presentation";

    console.log("Mode présentation :", modePresentation);
    console.log("Script icMenu :", scriptCourant);

    // Vérification de la disponibilité du menu général
    const menuDisponible =
        modePresentation ||
        (
            window.contenuMenu !== null &&
            window.contenuMenu !== undefined &&
            String(window.contenuMenu).trim() !== ""
        );

    scriptCourant.insertAdjacentHTML("afterend", `
<style>
/* Apparence commune */
.icone-menu {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid white;

  transition: transform 0.2s ease,
              box-shadow 0.2s ease,
              filter 0.2s ease;
}

/* Menu disponible */
.icone-menu.actif {
  cursor: pointer;
}

/* Menu indisponible */
.icone-menu.inactif {
  cursor: default;
  opacity: 0.35;
  filter: grayscale(100%);
  pointer-events: none;
}

/* Survol uniquement si le menu est disponible */
@media (hover: hover) and (pointer: fine) {
  .icone-menu.actif:hover {
    transform: scale(1.10);
    box-shadow: 0 0 8px white;
    filter: brightness(1.2);
  }
}

/* Clic ou appui uniquement si actif */
.icone-menu.actif:active {
  transform: scale(0.92);
  box-shadow: 0 0 3px white;
}
</style>

<img
  class="icone-menu ${menuDisponible ? "actif" : "inactif"}"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAB9klEQVR42u2WT0/iQBiH319Lo6gHbtxI6gGXklBIXC7CJ7IHMRHCaXvT6Lci8gU4cNALvZULcFiBpNDXQ1ERyy7DOhv/zHNomiYz885v3nlSIoVCoVB8QwDoui5vfl3XAXy2UGJzIqLdnZ3r65uTygkzA9qfNsbExACYeREAP83Nq+swMYcMoN1u1+v16XRKRMz890oTiQQR1S8uWDKNRuN5udUa1hVnmodENJlMDMN4u+lFJFiNbfFl+SXuSIIgSCaTpmkKnKumaQAsy+r1evKi8jwvn88D0DRto96K2ouZU6lUNptds+GYsDaBiYiZgPu7u9FoFC0kJoj/4CCBm7g8LDbhdyEMQ7GcPqi3lqOStyEAny+wtZY3DMN13Uql8uLupUsaZ3F+/Vx/GZkBtG9vf7luEARilq+d1WRb/rxWE7b80Y8jIhqPx7HD/pFZMNvb38vlcsKWt23b9315Ufm+XywWt7F8Op22LEtSU3e73X6/ryz/HS0fXd0wDKWdoDafz75EWlFXNZvNarUaNSaALf+w4ixPRK1W6+rycr55h0X+dE4d2ZZ3HEfY8rZtE9HD74eEIcPywf7BQalUErb8z+PjwWAgL6rhcFgul7exfCaTKRQKAN5RrYt/eaJOp+N53heyfHSakmpiZnlSVCgUCoVCnEd1m/Qfp8a/3QAAAABJRU5ErkJggg=="
  width="50"
  height="50"
  alt="Menu"
/>
    `);

})();