
/* Formulaire de contact des professionnels de santé et des étudiants.
   Le formulaire est inséré après le script dans la page HTML. */

document.currentScript.insertAdjacentHTML("afterend", `
<form id="formulaireSante" class="formulaire">

    <fieldset>
        <legend>1. Identifiant et confidentialité</legend>

        <div class="champ">
            <label for="email">E-mail (identifiant) * :</label>
            <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                required
            >
        </div>

        <p>Choisissez si votre adresse e-mail d'identification peut être affichée.</p>

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
            <label for="emailPublic">E-mail public :</label>
            <input
                type="email"
                id="emailPublic"
                name="emailPublic"
                autocomplete="off"
            >
            <small>
                Adresse de contact distincte, si vous souhaitez en communiquer une.
            </small>
        </div>
    </fieldset>

    <fieldset>
        <legend>2. Votre profil</legend>

        <p>Choisissez la situation qui vous correspond.</p>


<label for="profil">Profil *</label>
<select id="profil" name="profil" required>
    <option value="">Choisir...</option>
    <option value="ergotherapeute">Ergothérapeute</option>
    <option value="etudiant_ergotherapie">Étudiant en ergothérapie</option>
    <option value="autre_therapeute">Autre thérapeute ou professionnel de santé</option>
    <option value="representant_etablissement">Représentant d'un établissement de santé ou médico-social</option>
</select>


        <div id="blocEtudes" hidden>
            <label for="anneeEtudes">Année d'études en ergothérapie</label>
            <select id="anneeEtudes" name="anneeEtudes">
                <option value="">Non renseignée</option>
                <option value="1">1re année</option>
                <option value="2">2e année</option>
                <option value="3">3e année</option>
            </select>
        </div>

        <div id="blocProfessionnel" hidden>
            <label for="profession">Profession ou fonction</label>
            <input
                type="text"
                id="profession"
                name="profession"
                maxlength="150"
                placeholder="Ex. : psychologue, infirmier..."
            >
        </div>

        <div id="blocEtablissement" hidden>
            <label for="nomEtablissement">Nom de l'établissement</label>
            <input
                type="text"
                id="nomEtablissement"
                name="nomEtablissement"
                maxlength="200"
            >

            <label for="fonctionEtablissement">Votre fonction</label>
            <input
                type="text"
                id="fonctionEtablissement"
                name="fonctionEtablissement"
                maxlength="150"
                placeholder="Ex. : directeur, coordinateur..."
            >
        </div>
    </fieldset>

    <fieldset>
        <legend>3. Vos coordonnées professionnelles</legend>

        <label for="nomContact">Nom et prénom</label>
        <input
            type="text"
            id="nomContact"
            name="nomContact"
            autocomplete="name"
            maxlength="200"
        >

        <label for="structure">Structure ou organisme</label>
        <input
            type="text"
            id="structure"
            name="structure"
            maxlength="200"
            placeholder="Cabinet, association, établissement..."
        >

        <label for="telephone">Téléphone</label>
        <input
            type="tel"
            id="telephone"
            name="telephone"
            autocomplete="tel"
        >

        <label for="site_web">Site web</label>
        <input
            type="url"
            id="site_web"
            name="site_web"
            placeholder="https://..."
        >
    </fieldset>

    <fieldset>
        <legend>4. Votre localisation</legend>

        <label for="region">Région *</label>
        <select id="region" name="region" required>
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

        <label for="departement">Département *</label>
        <input
            type="text"
            id="departement"
            name="departement"
            maxlength="100"
            placeholder="Ex. : Moselle (57)"
            required
        >

        <label for="commune">Commune *</label>
        <input
            type="text"
            id="commune"
            name="commune"
            maxlength="150"
            required
        >
    </fieldset>

    <fieldset>
        <legend>5. Vos centres d'intérêt</legend>

        <p>Plusieurs réponses possibles.</p>

        <label>
            <input type="checkbox" name="interets" value="actualites">
            Actualités de FermTerrap
        </label>

        <label>
            <input type="checkbox" name="interets" value="formations">
            Formations et montée en compétences
        </label>

        <label>
            <input type="checkbox" name="interets" value="decouverte_fermes">
            Découverte de fermes à vocation thérapeutique
        </label>

        <label>
            <input type="checkbox" name="interets" value="collaboration">
            Collaboration avec une ferme
        </label>

        <label>
            <input type="checkbox" name="interets" value="projet_etude">
            Projet d'étude ou de recherche
        </label>

        <label>
            <input type="checkbox" name="interets" value="intervention">
            Intervention ou partenariat professionnel
        </label>

        <label>
            <input type="checkbox" name="interets" value="autre">
            Autre
        </label>

        <label for="interetsAutre">Précisez, si nécessaire</label>
        <input
            type="text"
            id="interetsAutre"
            name="interetsAutre"
            maxlength="500"
        >
    </fieldset>

    <fieldset>
        <legend>6. Votre projet</legend>

        <label for="typeProjet">Quel est votre objectif principal ?</label>
        <select id="typeProjet" name="typeProjet">
            <option value="">Choisir...</option>
            <option value="information">Obtenir des informations</option>
            <option value="formation">Suivre une formation</option>
            <option value="visite">Visiter une ferme</option>
            <option value="collaboration">Construire une collaboration</option>
            <option value="recherche">Développer un projet d'étude ou de recherche</option>
            <option value="autre">Autre projet</option>
        </select>

        <label for="descriptionProjet">
            Décrivez brièvement vos besoins ou votre projet
        </label>
        <textarea
            id="descriptionProjet"
            name="descriptionProjet"
            rows="4"
            maxlength="2000"
            placeholder="Votre projet, vos attentes, le type de ferme recherché..."
        ></textarea>
    </fieldset>

    <fieldset>
        <legend>7. Information et consentement</legend>

        <p>
            Les informations recueillies servent à gérer votre demande
            et à vous contacter au sujet de vos centres d'intérêt.
<!--
            Consultez la politique de confidentialité de FermTerrap
            pour connaître les modalités de traitement de vos données.
-->
        </p>

        <label>
            <input
                type="checkbox"
                id="accordContact"
                name="accordContact"
                value="oui"
                required
            >
            J'accepte que FermTerrap utilise mon e-mail privé pour me transmettre les informations. *
        </label>
    </fieldset>

    <div
        id="messageFormulaireSante"
        class="statut-formulaire statut-attente"
        role="status"
        aria-live="polite"
        aria-atomic="true"
    >
        En attente de saisie.
    </div>

    <button type="submit">Envoyer mon inscription</button>

</form>
`);


(() => {
    "use strict";

    const formulaireSante =
        document.getElementById("formulaireSante");

    if (!formulaireSante) {
        console.error("Le formulaireSante est introuvable.");
        return;
    }

    /* 1. Gestion de la confidentialité de l'e-mail */

    const champEmailPublic =
        formulaireSante.querySelector("#emailPublic");

    const choixConfidentialite =
        formulaireSante.querySelectorAll(
            'input[name="emailConfidentialite"]'
        );

    function actualiserEmailPublic() {
        const choix = formulaireSante.querySelector(
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


    /* 2. Affichage des champs selon le profil */

    const champProfil =
        formulaireSante.querySelector("#profil");

    const blocEtudes =
        formulaireSante.querySelector("#blocEtudes");

    const blocProfessionnel =
        formulaireSante.querySelector("#blocProfessionnel");

    const blocEtablissement =
        formulaireSante.querySelector("#blocEtablissement");

    const champAnneeEtudes =
        formulaireSante.querySelector("#anneeEtudes");

    const champProfession =
        formulaireSante.querySelector("#profession");

    const champNomEtablissement =
        formulaireSante.querySelector("#nomEtablissement");

    const champFonctionEtablissement =
        formulaireSante.querySelector("#fonctionEtablissement");

    function actualiserProfilSante() {
        const profil = champProfil.value;

        const estEtudiant =
            profil === "etudiant_ergotherapie";

        const estAutreTherapeute =
            profil === "autre_therapeute";

        const estRepresentant =
            profil === "representant_etablissement";

        blocEtudes.hidden = !estEtudiant;
        blocProfessionnel.hidden = !estAutreTherapeute;
        blocEtablissement.hidden = !estRepresentant;

        // Effacer les réponses devenues inutiles.
        if (!estEtudiant) {
            champAnneeEtudes.value = "";
        }

        if (!estAutreTherapeute) {
            champProfession.value = "";
        }

        if (!estRepresentant) {
            champNomEtablissement.value = "";
            champFonctionEtablissement.value = "";
        }
    }

    champProfil.addEventListener("change", actualiserProfilSante);

    actualiserProfilSante();


    /* 3. Gestion du formulaire avant l'enregistrement */

    const messageFormulaire =
        formulaireSante.querySelector("#messageFormulaireSante");

    formulaireSante.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        if (!formulaireSante.reportValidity()) {
            return;
        }

        messageFormulaire.textContent =
            "Le formulaire est valide. L'enregistrement dans Supabase reste à configurer.";

        messageFormulaire.classList.remove("statut-attente");
    });

})();

/*
// Gestion de la confidentialité de l'e-mail 

const formulaireSante = document.getElementById("formulaireSante");

const champEmailPublicSante =
    formulaireSante.querySelector("#emailPublic");

const choixConfidentialiteSante =
    formulaireSante.querySelectorAll(
        'input[name="emailConfidentialite"]'
    );

function actualiserEmailPublicSante() {
    const choix = formulaireSante.querySelector(
        'input[name="emailConfidentialite"]:checked'
    );

    const identifiantPublic = choix?.value === "public";

    champEmailPublicSante.disabled = identifiantPublic;

    if (identifiantPublic) {
        champEmailPublicSante.value = "";
    }
}

choixConfidentialiteSante.forEach((choix) => {
    choix.addEventListener("change", actualiserEmailPublicSante);
});

actualiserEmailPublicSante();


// Affichage des questions adaptées au profil 

const blocEtudes = formulaireSante.querySelector("#blocEtudes");
const blocProfessionnel =
    formulaireSante.querySelector("#blocProfessionnel");
const blocEtablissement =
    formulaireSante.querySelector("#blocEtablissement");

function actualiserProfilSante() {
    const choix = formulaireSante.querySelector(
        'input[name="profil"]:checked'
    );

    const profil = choix?.value || "";

    blocEtudes.hidden = profil !== "etudiant_ergotherapie";

    blocProfessionnel.hidden =
        profil !== "autre_therapeute";

    blocEtablissement.hidden =
        profil !== "representant_etablissement";
}

formulaireSante.querySelectorAll('input[name="profil"]').forEach(
    (choix) => {
        choix.addEventListener("change", actualiserProfilSante);
    }
);

actualiserProfilSante();
*/