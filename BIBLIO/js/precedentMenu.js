/*
const precedent = document.referrer
    ? `<li><a href="FermTerrap.html" id="lienPrecedent">&lt; Précédent</a></li>`
    : `<li><a href="FermTerrap.html">&lt; Accueil</a></li>`;

document.body.insertAdjacentHTML("beforeend", contenuMenu);

document.addEventListener("click", (event) => {

    if (event.target.closest("#lienPrecedent")) {
        event.preventDefault();
*//*
        alert("OK : le clic est détecté");
*//*
        history.back();
    }

});
*/
const precedent = document.referrer
    ? `<li><a href="FermTerrap.html" id="lienPrecedent">&lt; Précédent</a></li>`
    : `<li><a href="FermTerrap.html">&lt; Accueil</a></li>`;

document.addEventListener("click", (event) => {
    const lien = event.target.closest("#lienPrecedent");

    if (lien) {
        event.preventDefault();
        history.back();
    }
});