
/*
  icAcc.js
  Icône Accueil : maison (50 × 50 px).

  Dans HTML :
  <script src="../BIBLIO/icones/icAcc.js"></script>
*/

console.log("icAcc.js chargé");

document.currentScript.insertAdjacentHTML("afterend", `

<style>
  .icone-acc {
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
    .icone-acc:hover {
      transform: scale(1.10);
      box-shadow: 0 0 8px white;
      filter: brightness(1.2);
    }
  }

  /* Appui tactile ou clic */
  .icone-acc:active {
    transform: scale(0.92);
    box-shadow: 0 0 3px white;
  }
</style>

<img
  class="icone-acc"
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSIxMCIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yOSAxMiBMMTcgMjUgTDI5IDM4IE0xOCAyNSBIMzgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+"
  width="50"
  height="50"
  alt="Accueil"
/>

`);
