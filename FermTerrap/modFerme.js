
"use strict";

/* ==================================================
   1. ÉTAT DE LA MODIFICATION
   ================================================== */

// Adresse utilisée pour retrouver la ligne à modifier.
// Elle reste la référence même si le champ e-mail est modifié.
let userMailOriginal = null;
//////////////
document.getElementById("formulaireFerme")?.setAttribute("hidden", "");
//////////////
document.addEventListener("submit", async event => {
    console.log("Événement submit détecté", event.target);
    const formulaire = event.target;
    if (
        !(formulaire instanceof HTMLFormElement) ||
        formulaire.id !== "formulaireFerme"
    ) {
        console.log("Ce n'est pas formulaireFerme", formulaire);
        return;
    }
    console.log("formulaireFerme détecté");
    console.log("userMailOriginal =", userMailOriginal);
    console.log("clientSupabase =", window.clientSupabase);
    console.log("clefJsonForm =", window.clefJsonForm);
    // Le reste de ton code actuel continue ici...
});
/* ==================================================
   2. AFFICHAGE DU MESSAGE
   ================================================== */

function afficherMessageModification(texte) {
    const message = document.getElementById("messageModification");

    if (message) {
        message.textContent = texte;
    }
}


/* ==================================================
   3. FONCTION : REMPLIR LE FORMULAIRE
   ================================================== */

/**
 * Affiche les réponses dans le formulaire existant.
 *
 * @param {Object} repJson Réponses enregistrées dans Supabase
 * @param {string} userMail Adresse e-mail de la ferme
 */
function afficherFormulaireFerme(repJson, userMail) {
    const formulaire = document.getElementById("formulaireFerme");

    if (!formulaire) {
        throw new Error(
            "Le formulaire #formulaireFerme est introuvable. " +
            "Vérifie que ajFermeForm.js l'a bien créé."
        );
    }

    // Remplit chaque champ selon son type.
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

        if (champ.type === "submit" || champ.type === "button") {
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
            champ.checked = String(valeur ?? "") === champ.value;
            continue;
        }

        if (champ instanceof HTMLSelectElement && champ.multiple) {
            const valeurs = Array.isArray(valeur) ? valeur : [];
            Array.from(champ.options).forEach(option => {
                option.selected = valeurs.includes(option.value);
            });
            continue;
        }

        // Texte, nombre, date, select simple, etc.
        champ.value = valeur == null ? "" : String(valeur);
    }

    formulaire.hidden = false;
}


/* ==================================================
   4. FONCTION : RECHERCHER UNE FERME DANS SUPABASE
   ================================================== */

/**
 * Recherche une ferme par son e-mail et remplit le formulaire.
 *
 * @param {string} userMail Adresse e-mail recherchée
 */
async function chargerFerme(userMail) {
    const email = String(userMail ?? "").trim().toLowerCase();

    if (!email) {
        afficherMessageModification(
            "Saisis l'adresse e-mail de la ferme."
        );
        return;
    }

    if (!window.clientSupabase) {
        afficherMessageModification(
            "Erreur : le client Supabase n'est pas initialisé."
        );
        return;
    }

    const formulaire = document.getElementById("formulaireFerme");

    if (formulaire) {
        formulaire.hidden = true;
    }

    afficherMessageModification("Recherche de la ferme…");

    try {
        const { data, error } = await window.clientSupabase
            .from("FermeInfo")
            .select("userMail, repJson")
            .eq("userMail", email)
            .maybeSingle();

        if (error) {
            console.error("Erreur Supabase :", error);
            afficherMessageModification(
                "Impossible de rechercher la ferme. Vérifie les permissions."
            );
            return;
        }

        if (!data) {
            userMailOriginal = null;

            afficherMessageModification(
                "Aucune ferme trouvée pour cette adresse e-mail."
            );
            return;
        }

        userMailOriginal = data.userMail;

        afficherFormulaireFerme(data.repJson ?? {}, data.userMail);

        afficherMessageModification(
            "Ferme chargée. Tu peux modifier les réponses."
        );

    } catch (erreur) {
        console.error("Erreur de chargement :", erreur);

        afficherMessageModification(
            "Une erreur est survenue pendant le chargement."
        );
    }
}


/* ==================================================
   5. ENREGISTRER LES MODIFICATIONS
   ================================================== */

document.addEventListener("submit", async event => {
    const formulaire = event.target;

    if (
        !(formulaire instanceof HTMLFormElement) ||
        formulaire.id !== "formulaireFerme"
    ) {
        return;
    }

    event.preventDefault();

    if (!userMailOriginal) {
        afficherMessageModification(
            "Recherche d'abord la ferme à modifier."
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

    afficherMessageModification("Enregistrement des modifications…");

    try {
        // Réutilise ta fonction existante pour préparer les données.
        console.log("Début de la préparation des réponses");
        const resultatFormulaire = window.clefJsonForm(formulaire);
        console.log("Résultat de clefJsonForm :", resultatFormulaire);

        const { repJson } = resultatFormulaire;
        console.log("JSON à enregistrer :", repJson);
        // L'e-mail reste séparé du JSON.
console.log("Début de la requête UPDATE");
console.log("Email recherché :", userMailOriginal);
console.log("Données envoyées :", repJson);        
        
        const { data, error } = await window.clientSupabase
            .from("FermeInfo")
            .update({ repJson: repJson })
            .eq("userMail", userMailOriginal)
            .select("userMail");
            
console.log("Résultat UPDATE — data :", data);
console.log("Résultat UPDATE — error :", error);            

        if (error) {
            console.error("Erreur Supabase :", error);

            afficherMessageModification(
                "La modification a échoué. Vérifie les permissions Supabase."
            );
            return;
        }

        if (!data || data.length === 0) {
            afficherMessageModification(
                "Aucune ligne modifiée. Vérifie les droits de mise à jour."
            );
            return;
        }

        afficherMessageModification(
            "Les modifications ont bien été enregistrées."
        );


// Redirection après confirmation de la mise à jour par Supabase.
window.location.href = "lireFermeInfo.html";


    } catch (erreur) {
        console.error("Erreur de modification :", erreur);

        afficherMessageModification(
            "Une erreur est survenue pendant l'enregistrement."
        );

    } finally {
        if (bouton) bouton.disabled = false;
    }
});


/* ==================================================
   6. BRANCHER LE BOUTON DE RECHERCHE
   ================================================== */

document.getElementById("boutonRechercher")
    ?.addEventListener("click", () => {
        chargerFerme(
            document.getElementById("emailRecherche")?.value
        );
    });


// Permet aussi d'ouvrir directement :
// modFerme.html?userMail=ferme@example.fr
const parametres = new URLSearchParams(window.location.search);
const emailURL = parametres.get("userMail");

if (emailURL) {
    const champRecherche = document.getElementById("emailRecherche");

    if (champRecherche) {
        champRecherche.value = emailURL;
    }

    chargerFerme(emailURL);
}

// Rend les deux fonctions accessibles pour d'autres scripts.
window.afficherFormulaireFerme = afficherFormulaireFerme;
window.chargerFerme = chargerFerme;
