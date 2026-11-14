
"use strict";

(() => {

    const boutonCommencer = document.getElementById("boutonCommencer");
    const accueilFormulaire = document.getElementById("accueilFormulaire");
    const zoneFormulaire = document.getElementById("zoneFormulaire");

    if (!boutonCommencer || !accueilFormulaire || !zoneFormulaire) {
        console.error("Éléments nécessaires au démarrage du formulaire introuvables.");
        return;
    }

    boutonCommencer.addEventListener("click", () => {

        // Masquer toute la zone d'accueil
        accueilFormulaire.style.display = "none";

        // Afficher le formulaire et sa phrase finale
        zoneFormulaire.style.display = "block";

        // Placer le début du formulaire en haut de l'écran
        zoneFormulaire.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

})();
