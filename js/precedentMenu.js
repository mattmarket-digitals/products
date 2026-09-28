const precedent = document.referrer
    ? `<li><a href="FermTerrap.html" id="lienPrecedent">&lt; Précédent</a></li>`
    : `<li><a href="FermTerrap.html">&lt; Accueil</a></li>`;

document.body.insertAdjacentHTML("beforeend", contenuMenu);

document.addEventListener("click", (event) => {

    if (event.target.closest("#lienPrecedent")) {
        event.preventDefault();
/*
        alert("OK : le clic est détecté");
*/
        history.back();
    }

});