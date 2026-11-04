console.log("modMutual.js chargé.");

"use strict";

/* ==================================================
   1. ÉTAT DE LA MODIFICATION
   ================================================== */

let configurationActuelle = null;
let idOriginal = null;
let userMailOriginal = null;

/* ==================================================
   CHARGER CLEFJSONFORM SI NÉCESSAIRE
   ================================================== */

async function chargerClefJsonForm() {

    if (typeof window.clefJsonForm === "function") {
        return;
    }

    await new Promise((resolve, reject) => {

        const script = document.createElement("script");

        script.src = "../BIBLIO/js/clefJsonForm.js";

        script.onload = resolve;

        script.onerror = () => {
            reject(
                new Error("Impossible de charger clefJsonForm.js.")
            );
        };

        document.head.appendChild(script);
    });

    if (typeof window.clefJsonForm !== "function") {
        throw new Error(
            "La fonction clefJsonForm n'est pas disponible."
        );
    }
}
/* ==================================================
   2. AFFICHAGE DES MESSAGES
   ================================================== */

function afficherMessageModification(texte) {

    const message = document.getElementById(
        "messageModification"
    );

    if (message) {
        message.textContent = texte;
    }
}


/* ==================================================
   3. REMPLIR LE FORMULAIRE
   ================================================== */

function afficherFormulaireMutual(repJson, userMail) {

    const formulaire = document.getElementById(
        configurationActuelle.formulaire
    );

    if (!formulaire) {
        throw new Error("Formulaire introuvable.");
    }

    for (const champ of formulaire.elements) {

        if (!champ.name) continue;

        const nom = champ.name;

        // L'e-mail est stocké séparément du JSON.
        if (nom === "email") {
            champ.value = userMail ?? "";
            champ.readOnly = true;
            continue;
        }

        if (!Object.hasOwn(repJson, nom)) continue;

        const valeur = repJson[nom];

        if (
            champ.type === "submit" ||
            champ.type === "button"
        ) {
            continue;
        }

        if (champ.type === "checkbox") {

            if (Array.isArray(valeur)) {
                champ.checked = valeur.includes(champ.value);
            } else {
                champ.checked = Boolean(valeur);
            }

            continue;
        }

        if (champ.type === "radio") {
            champ.checked =
                String(valeur ?? "") === champ.value;

            continue;
        }

        if (
            champ instanceof HTMLSelectElement &&
            champ.multiple
        ) {
            const valeurs = Array.isArray(valeur)
                ? valeur
                : [];

            Array.from(champ.options).forEach(option => {
                option.selected = valeurs.includes(option.value);
            });

            continue;
        }

        champ.value = valeur == null
            ? ""
            : String(valeur);
    }

    /*
       Actualise les champs conditionnels des formulaires
       Santé et Public après le remplissage.
    */

    const champProfil = formulaire.querySelector(
        '[name="profil"]'
    );

    if (champProfil) {
        champProfil.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    const choixConfidentialite = formulaire.querySelector(
        'input[name="emailConfidentialite"]:checked'
    );

    if (choixConfidentialite) {
        choixConfidentialite.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    formulaire.hidden = false;

    document.getElementById("zoneFormulaire").hidden = false;
}


/* ==================================================
   4. RECHERCHER ET CHARGER LES INFORMATIONS
   ================================================== */

async function chargerInformationsMutual(userMail) {

    const zone = document.getElementById("zoneFormulaire");

    if (zone) {
        zone.hidden = true;
    }

    configurationActuelle = null;
    idOriginal = null;
    userMailOriginal = null;

    afficherMessageModification("Recherche en cours…");

    try {

        const resultat =
            await window.rechercherEtChargerFormulaire(userMail);

        await chargerClefJsonForm();

        configurationActuelle = resultat.configuration;

        idOriginal = resultat.data.id;

        userMailOriginal = resultat.data.userMail;

        afficherFormulaireMutual(
            resultat.data.repJson ?? {},
            resultat.data.userMail
        );

        afficherMessageModification(
            "Informations " +
            configurationActuelle.nom +
            " chargées. Tu peux maintenant les modifier."
        );

    } catch (erreur) {

        console.error("Erreur de recherche :", erreur);

        afficherMessageModification(erreur.message);
    }
}


/* ==================================================
   5. ENREGISTRER LES MODIFICATIONS
   ================================================== */

document.addEventListener("submit", async event => {

    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        !configurationActuelle ||
        formulaire.id !== configurationActuelle.formulaire
    ) {
        return;
    }

    event.preventDefault();

    if (!idOriginal || !userMailOriginal) {

        afficherMessageModification(
            "Recherche d'abord les informations à modifier."
        );

        return;
    }

    if (!formulaire.checkValidity()) {
        formulaire.reportValidity();

        afficherMessageModification(
            "Vérifie les champs signalés dans le formulaire."
        );

        return;
    }

    const bouton = formulaire.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (bouton?.disabled) return;

    if (bouton) bouton.disabled = true;

    afficherMessageModification(
        "Enregistrement des modifications…"
    );

    try {

        if (typeof window.clefJsonForm !== "function") {
            throw new Error(
                "La fonction clefJsonForm est introuvable."
            );
        }

        const resultatFormulaire =
            window.clefJsonForm(formulaire);

        const repJson = resultatFormulaire.repJson;

        if (!repJson) {
            throw new Error(
                "Impossible de préparer les réponses du formulaire."
            );
        }

        console.log(
            "Table à modifier :",
            configurationActuelle.table
        );

        console.log(
            "ID de la ligne :",
            idOriginal
        );

        console.log(
            "JSON à enregistrer :",
            repJson
        );

        const { data, error } = await window.clientSupabase
            .from(configurationActuelle.table)
            .update({ repJson: repJson })
            .eq("id", idOriginal)
            .select("id");

        if (error) {
            console.error("Erreur Supabase :", error);

            throw new Error(
                "La modification a échoué. Vérifie les permissions Supabase."
            );
        }

        if (!data || data.length === 0) {
            throw new Error(
                "Aucune ligne modifiée. Vérifie les droits de mise à jour."
            );
        }
        
        alert("Informations enregistrées.");
        afficherMessageModification(
            "Les modifications ont bien été enregistrées."
        );

    } catch (erreur) {

        console.error("Erreur de modification :", erreur);

        afficherMessageModification(erreur.message);

    } finally {

        if (bouton) {
            bouton.disabled = false;
        }
    }
});


/* ==================================================
   6. BRANCHER LE BOUTON DE RECHERCHE
   ================================================== */
/*
document.addEventListener("DOMContentLoaded", () => {
    const bouton = document.getElementById("boutonRechercher");

    if (!bouton) {
        console.error("Bouton #boutonRechercher introuvable.");
        return;
    }

    console.log("Écouteur du bouton Rechercher installé.");

    bouton.addEventListener("click", () => {
        console.log("Clic sur Rechercher détecté.");

        const champ = document.getElementById("emailRecherche");
        console.log("Champ email :", champ);

        if (!champ) {
            console.error("Champ #emailRecherche introuvable.");
            return;
        }

        console.log("Adresse saisie :", champ.value);

        chargerInformationsMutual(champ.value);
    });
});
*/
document.getElementById("boutonRechercher")
    ?.addEventListener("click", () => {

        chargerInformationsMutual(
            document.getElementById("emailRecherche")?.value
        );
    });


/* ==================================================
   7. RECHERCHE PAR PARAMÈTRE D'URL
   ================================================== */

const parametres = new URLSearchParams(
    window.location.search
);

const emailURL = parametres.get("userMail");

if (emailURL) {

    const champRecherche =
        document.getElementById("emailRecherche");

    if (champRecherche) {
        champRecherche.value = emailURL;
    }

    chargerInformationsMutual(emailURL);
}
