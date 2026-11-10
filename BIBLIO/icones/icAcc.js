
/*
  icAcc.js
  Icône Accueil : maison blanche sur fond noir.
  Dimensions : 50 × 50 px.
  Sans bordure.

  Dans HTML :
  <script src="../BIBLIO/icones/icAcc.js"></script>
*/

"use strict";

console.log("icAcc.js chargé");

// Récupération du chemin de la page d'accueil
const scriptAcc = document.currentScript;

const pageAccueil =
    scriptAcc.dataset.homePage || "FermTerrap.html";

// Comparaison des pages
const urlAccueil = new URL(pageAccueil, window.location.href);
const urlActuelle = new URL(window.location.href);

const estPageAccueil =
    urlActuelle.pathname === urlAccueil.pathname;

// Création de l'icône
scriptAcc.insertAdjacentHTML("afterend", `

<style>
.icone-acc {
    width: 50px;
    height: 50px;
    border: 1px solid white;
    border-radius: 10px;

    transition: transform 0.2s ease,
                filter 0.2s ease,
                opacity 0.2s ease;
}

/* Icône active */
.icone-acc.actif {
    cursor: pointer;
}

/* Icône inactive */
.icone-acc.inactif {
    cursor: default;
    opacity: 0.35;
    filter: grayscale(100%);
    pointer-events: none;
}

/* Survol souris */
@media (hover: hover) and (pointer: fine) {
    .icone-acc.actif:hover {
        transform: scale(1.10);
        filter: brightness(1.3);
    }
}

/* Appui tactile ou clic */
.icone-acc.actif:active {
    transform: scale(0.92);
}
</style>

<img
    class="icone-acc ${estPageAccueil ? "inactif" : "actif"}"
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNCAyMy41IDIzLjMgNi44YTIuNSAyLjUgMCAwIDEgMy40IDBMMzMgMTNWOS41aDZWMThsNyA1LjVhMi41IDIuNSAwIDAgMS0zLjEgMy45TDQxIDI2djE3YTIgMiAwIDAgMS0yIDJIMTFhMiAyIDAgMCAxLTItMlYyNmwtMiAxLjRBMi41IDIuNSAwIDAgMSA0IDIzLjVaIi8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIwIDQ1VjMxYTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjE0WiIvPjwvc3ZnPg=="
  width="50"
  height="50"
  alt="Accueil"
/>

`);
// Ajout du comportement de navigation si l'icône est active
if (!estPageAccueil) {

    const icone = scriptAcc.nextElementSibling.nextElementSibling;

    icone.addEventListener("click", () => {
        window.location.href = urlAccueil.href;
    });
}

