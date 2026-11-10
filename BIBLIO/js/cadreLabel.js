console.log("cadreLabel.js chargé.");
/*avec <div id="cadreLabel">
document.querySelector("#cadreLabel").insertAdjacentHTML("beforeend",*/

"use strict";

document.currentScript.insertAdjacentHTML("afterend", `
    <fieldset>
        <legend>Menu</legend>
        ${window.contenuMenu || ""}
    </fieldset>
`);

/*
document.currentScript.insertAdjacentHTML("afterend", `
    <fieldset>
        <legend>Menu</legend>
        ${contenuMenu}
    </fieldset>
`);
*/