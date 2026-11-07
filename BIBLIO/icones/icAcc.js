
/*
  icAcc.js
  Icône Accueil : maison blanche sur fond noir.
  Dimensions : 50 × 50 px.
  Sans bordure.

  Dans HTML :
  <script src="../BIBLIO/icones/icAcc.js"></script>
*/

console.log("icAcc.js chargé");

document.currentScript.insertAdjacentHTML("afterend", `

<style>
.icone-acc {
    width: 50px;
    height: 50px;
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;
    
    transition: transform 0.2s ease,
                filter 0.2s ease;
  }

  /* Survol souris */
  @media (hover: hover) and (pointer: fine) {
    .icone-acc:hover {
      transform: scale(1.10);
      filter: brightness(1.3);
    }
  }

  /* Appui tactile ou clic */
  .icone-acc:active {
    transform: scale(0.92);
  }
</style>

<img
  class="icone-acc"
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNCAyMy41IDIzLjMgNi44YTIuNSAyLjUgMCAwIDEgMy40IDBMMzMgMTNWOS41aDZWMThsNyA1LjVhMi41IDIuNSAwIDAgMS0zLjEgMy45TDQxIDI2djE3YTIgMiAwIDAgMS0yIDJIMTFhMiAyIDAgMCAxLTItMlYyNmwtMiAxLjRBMi41IDIuNSAwIDAgMSA0IDIzLjVaIi8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIwIDQ1VjMxYTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjE0WiIvPjwvc3ZnPg=="
  width="50"
  height="50"
  alt="Accueil"
/>

`);
