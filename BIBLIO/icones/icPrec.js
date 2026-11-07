
/*
  icPrec.js
  Icône Précédent : flèche vers la gauche (50 × 50 px).

  Dans HTML :
  <script src="../BIBLIO/icones/icPrec.js"></script>
*/

console.log("icPrec.js chargé");

document.currentScript.insertAdjacentHTML("afterend", `

<style>
  .icone-prec {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid white;
    cursor: pointer;

    transition: transform 0.2s ease,
                box-shadow 0.2s ease,
                filter 0.2s ease;
  }

  /* Survol réservé aux appareils avec souris */
  @media (hover: hover) and (pointer: fine) {
    .icone-prec:hover {
      transform: scale(1.10);
      box-shadow: 0 0 8px white;
      filter: brightness(1.2);
    }
  }

  /* Appui tactile ou clic */
  .icone-prec:active {
    transform: scale(0.92);
    box-shadow: 0 0 3px white;
  }
</style>

<img
  class="icone-prec"
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMTAiIGZpbGw9IiMwMDAiLz4KPHBhdGggZD0iTTI5IDEyIEwxNyAyNSBMMjkgMzggTTE4IDI1IEgzOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4="
  width="50"
  height="50"
  alt="Précédent"
/>

`);
