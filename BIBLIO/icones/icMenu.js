/* Dans html :
<script src="../BIBLIO/icones/icMenu.js"></script>
*/

console.log("icMenu.js chargé");

document.currentScript.insertAdjacentHTML("afterend", `
<style>
/* Animation commune */
.icone-menu {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid white;
  cursor: pointer;

  transition: transform 0.2s ease,
              box-shadow 0.2s ease,
              filter 0.2s ease;
}

/* Souris : uniquement lorsque le survol est possible */
@media (hover: hover) and (pointer: fine) {
  .icone-menu:hover {
    transform: scale(1.10);
    box-shadow: 0 0 8px white;
    filter: brightness(1.2);
  }
}

/* Clic ou appui */
.icone-menu:active {
  transform: scale(0.92);
  box-shadow: 0 0 3px white;
}

</style>

<img
  class="icone-menu"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAB9klEQVR42u2WT0/iQBiH319Lo6gHbtxI6gGXklBIXC7CJ7IHMRHCaXvT6Lci8gU4cNALvZULcFiBpNDXQ1ERyy7DOhv/zHNomiYz885v3nlSIoVCoVB8QwDoui5vfl3XAXy2UGJzIqLdnZ3r65uTygkzA9qfNsbExACYeREAP83Nq+swMYcMoN1u1+v16XRKRMz890oTiQQR1S8uWDKNRuN5udUa1hVnmodENJlMDMN4u+lFJFiNbfFl+SXuSIIgSCaTpmkKnKumaQAsy+r1evKi8jwvn88D0DRto96K2ouZU6lUNptds+GYsDaBiYiZgPu7u9FoFC0kJoj/4CCBm7g8LDbhdyEMQ7GcPqi3lqOStyEAny+wtZY3DMN13Uql8uLupUsaZ3F+/Vx/GZkBtG9vf7luEARilq+d1WRb/rxWE7b80Y8jIhqPx7HD/pFZMNvb38vlcsKWt23b9315Ufm+XywWt7F8Op22LEtSU3e73X6/ryz/HS0fXd0wDKWdoDafz75EWlFXNZvNarUaNSaALf+w4ixPRK1W6+rycr55h0X+dE4d2ZZ3HEfY8rZtE9HD74eEIcPywf7BQalUErb8z+PjwWAgL6rhcFgul7exfCaTKRQKAN5RrYt/eaJOp+N53heyfHSakmpiZnlSVCgUCoVCnEd1m/Qfp8a/3QAAAABJRU5ErkJggg=="
  width="50"
  height="50"
  alt="Menu"
/>
`);