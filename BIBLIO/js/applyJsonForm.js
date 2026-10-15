    const formulaire = document.querySelector("#formulaireFerme");
    const message = document.querySelector("#messageFormulaire");

    formulaire.addEventListener("submit", function (event) {
        // Empêche le rechargement de la page.
        event.preventDefault();

        // Vérification de sécurité supplémentaire.
        if (!formulaire.checkValidity()) {
            formulaire.reportValidity();
            return;
        }

        // Récupération des réponses.
        const reponses = window.clefJsonForm(formulaire);

        // Affichage dans la console.
        console.log("Objet des réponses :", reponses);
        console.log("Format JSON :", JSON.stringify(reponses, null, 2));

        // Message visible sur la page.
        message.textContent =
            "Formulaire vérifié. Les réponses sont visibles dans la console.";
    });