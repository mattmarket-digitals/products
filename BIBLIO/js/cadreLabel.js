/*avec <div id="cadreLabel">
document.querySelector("#cadreLabel").insertAdjacentHTML("beforeend",*/
document.currentScript.insertAdjacentHTML("afterend", `
    <fieldset>
        <legend>Menu</legend>
        ${contenuMenu}
    </fieldset>
`);