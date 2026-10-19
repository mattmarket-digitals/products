
/* Formulaire destiné aux patients, familles et aidants.
   Le formulaire est inséré après le script dans la page HTML. */

document.currentScript.insertAdjacentHTML("afterend", `
<form id="formulairePublic" class="formulaire">

    <fieldset>
        <legend>1. Identifiant et confidentialité</legend>

        <div class="champ">
            <label for="emailPublicIdentifiant">Adresse e-mail *</label>
            <input
                type="email"
                id="emailPublicIdentifiant"
                name="email"
                autocomplete="email"
                required
            >
        </div>

        <p>
            Choisissez si votre adresse e-mail d'identification
            peut être affichée publiquement.
        </p>

        <label>
            <input
                type="radio"
                name="emailConfidentialite"
                value="prive"
                checked
            >
            Privé
        </label>

        <label>
            <input
                type="radio"
                name="emailConfidentialite"
                value="public"
            >
            Public
        </label>

        <div class="champ">
            <label for="emailPublicContact">E-mail public</label>
            <input
                type="email"
                id="emailPublicContact"
                name="emailPublic"
                autocomplete="off"
            >
            <small>
                Adresse distincte que vous pouvez communiquer
                si vous souhaitez être contacté à une autre adresse.
            </small>
        </div>
    </fieldset>

    <fieldset>
        <legend>2. Votre situation</legend>

        <label for="profilPublic">Vous êtes… *</label>
        <select id="profilPublic" name="profil" required>
            <option value="">Choisir...</option>
            <option value="personne_concernee">
                Une personne directement concernée
            </option>
            <option value="famille">
                Un membre de la famille ou un proche
            </option>
            <option value="aidant">
                Un aidant
            </option>
            <option value="autre">
                Une autre situation
            </option>
        </select>

        <div id="blocAutreProfilPublic" hidden>
            <label for="autreProfilPublic">Précisez votre situation</label>
            <input
                type="text"
                id="autreProfilPublic"
                name="autreProfil"
                maxlength="200"
            >
        </div>
    </fieldset>

    <fieldset>
        <legend>3. Vos coordonnées</legend>

        <label for="nomPublic">Nom et prénom</label>
        <input
            type="text"
            id="nomPublic"
            name="nom"
            autocomplete="name"
            maxlength="200"
        >

        <label for="telephonePublic">Téléphone</label>
        <input
            type="tel"
            id="telephonePublic"
            name="telephone"
            autocomplete="tel"
        >
    </fieldset>

    <fieldset>
        <legend>4. Votre localisation</legend>

        <label for="regionPublic">Région *</label>
        <select id="regionPublic" name="region" required>
            <option value="">Choisir...</option>
            <option>Auvergne-Rhône-Alpes</option>
            <option>Bourgogne-Franche-Comté</option>
            <option>Bretagne</option>
            <option>Centre-Val de Loire</option>
            <option>Corse</option>
            <option>Grand Est</option>
            <option>Hauts-de-France</option>
            <option>Normandie</option>
            <option>Nouvelle-Aquitaine</option>
            <option>Occitanie</option>
            <option>Pays de la Loire</option>
            <option>Provence-Alpes-Côte d'Azur</option>
            <option>Île-de-France</option>
            <option>Guadeloupe</option>
            <option>Martinique</option>
            <option>Guyane</option>
            <option>La Réunion</option>
            <option>Mayotte</option>
        </select>

        <label for="departementPublic">Département *</label>
        <input
            type="text"
            id="departementPublic"
            name="departement"
            maxlength="100"
            placeholder="Ex. : Moselle (57)"
            required
        >

        <label for="communePublic">Commune</label>
        <input
            type="text"
            id="communePublic"
            name="commune"
            maxlength="150"
        >
    </fieldset>

    <fieldset>
        <legend>5. Ce qui vous intéresse</legend>

        <p>Plusieurs réponses possibles.</p>

        <label>
            <input type="checkbox" name="interets" value="actualites">
            Recevoir les actualités de FermTerrap
        </label>

        <label>
            <input type="checkbox" name="interets" value="decouverte_fermes">
            Découvrir les fermes et leurs activités
        </label>

        <label>
            <input type="checkbox" name="interets" value="activites">
            Découvrir les activités proposées à la ferme
        </label>

        <label>
            <input type="checkbox" name="interets" value="accueil">
            Trouver une ferme susceptible de m'accueillir
        </label>

        <label>
            <input type="checkbox" name="interets" value="famille_aidants">
            Obtenir des informations pour un proche
        </label>

        <label>
            <input type="checkbox" name="interets" value="evenements">
            Être informé des rencontres et événements
        </label>

        <label>
            <input type="checkbox" name="interets" value="autre">
            Autre
        </label>

        <label for="interetsAutrePublic">Précisez, si nécessaire</label>
        <input
            type="text"
            id="interetsAutrePublic"
            name="interetsAutre"
            maxlength="500"
        >
    </fieldset>

    <fieldset>
        <legend>6. Votre demande</legend>

        <label for="typeDemandePublic">Que recherchez-vous ?</label>
        <select id="typeDemandePublic" name="typeDemande">
            <option value="">Choisir...</option>
            <option value="information">Des informations générales</option>
            <option value="ferme">Des informations sur une ferme</option>
            <option value="activites">Des activités adaptées à mes attentes</option>
            <option value="accueil">Des possibilités d'accueil</option>
            <option value="evenement">Un événement ou une rencontre</option>
            <option value="autre">Autre demande</option>
        </select>

        <label for="descriptionDemandePublic">
            Votre message (facultatif)
        </label>
        <textarea
            id="descriptionDemandePublic"
            name="descriptionDemande"
            rows="4"
            maxlength="2000"
            placeholder="Décrivez votre demande sans indiquer de détails médicaux personnels."
        ></textarea>
    </fieldset>

    <fieldset>
        <legend>7. Information et consentement</legend>

        <p>
            Les informations recueillies servent à traiter votre demande
            et à vous contacter selon vos choix. Consultez la politique
            de confidentialité de FermTerrap pour connaître les modalités
            de traitement de vos données.
        </p>

        <label>
            <input
                type="checkbox"
                id="accordContactPublic"
                name="accordContact"
                value="oui"
                required
            >
            J'accepte que FermTerrap utilise mon adresse e-mail
            pour répondre à ma demande. *
        </label>

        <label>
            <input
                type="checkbox"
                id="accordActualitesPublic"
                name="accordActualites"
                value="oui"
            >
            Je souhaite également recevoir les actualités de FermTerrap.
        </label>
    </fieldset>

    <div
        id="messageFormulairePublic"
        class="statut-formulaire statut-attente"
        role="status"
        aria-live="polite"
        aria-atomic="true"
    >
        En attente de saisie.
    </div>

    <button type="submit">Envoyer ma demande</button>

</form>
`);


/* Gestion du formulaire */

(() => {
    "use strict";

    const formulairePublic =
        document.getElementById("formulairePublic");

    if (!formulairePublic) {
        console.error("Le formulairePublic est introuvable.");
        return;
    }

    /* 1. Confidentialité de l'adresse e-mail */

    const champEmailPublic =
        formulairePublic.querySelector("#emailPublicContact");

    const choixConfidentialite =
        formulairePublic.querySelectorAll(
            'input[name="emailConfidentialite"]'
        );

    function actualiserEmailPublic() {
        const choix = formulairePublic.querySelector(
            'input[name="emailConfidentialite"]:checked'
        );

        const identifiantPublic = choix?.value === "public";

        champEmailPublic.disabled = identifiantPublic;

        if (identifiantPublic) {
            champEmailPublic.value = "";
        }
    }

    choixConfidentialite.forEach((choix) => {
        choix.addEventListener("change", actualiserEmailPublic);
    });

    actualiserEmailPublic();


    /* 2. Affichage du champ « Autre situation » */

    const champProfil =
        formulairePublic.querySelector("#profilPublic");

    const blocAutreProfil =
        formulairePublic.querySelector("#blocAutreProfilPublic");

    const champAutreProfil =
        formulairePublic.querySelector("#autreProfilPublic");

    function actualiserProfilPublic() {
        const autreProfil = champProfil.value === "autre";

        blocAutreProfil.hidden = !autreProfil;

        if (!autreProfil) {
            champAutreProfil.value = "";
        }
    }

    champProfil.addEventListener("change", actualiserProfilPublic);

    actualiserProfilPublic();


    /* 3. Vérification et message de confirmation */

    const messageFormulaire =
        formulairePublic.querySelector("#messageFormulairePublic");

    formulairePublic.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        if (!formulairePublic.reportValidity()) {
            return;
        }

        messageFormulaire.textContent =
            "Le formulaire est valide, mais votre demande n'est pas encore enregistrée. L'enregistrement dans Supabase reste à configurer.";

        messageFormulaire.classList.remove("statut-attente");
    });
})();
