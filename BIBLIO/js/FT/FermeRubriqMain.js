//alert("ok");
        // --------------------------------------------------
        // QUESTIONS ET RUBRIQUES DU FORMULAIRE
        // L'ordre suit ajFermeForm.js.
        // --------------------------------------------------

        export const rubriques = [
            {
                titre: "Identifiant et confidentialité",
                champs: [
                    ["email", "E-mail (identifiant)"],
                    ["emailConfidentialite", "Confidentialité de l’identifiant"]
                ]
            },
            {
                titre: "1. Coordonnées",
                champs: [
                    ["emailPublic", "E-mail public"],
                    ["telephone", "Téléphone"],
                    ["site_web", "Site web"]
                ]
            },
            {
                titre: "2. Profil et localisation",
                champs: [
                    ["nom", "Nom de la ferme"],
                    ["type_structure", "Type de structure"],
                    ["region", "Région"],
                    ["departement", "Département"],
                    ["commune", "Commune"],
                    ["adresse", "Adresse"],
                    ["code_postal", "Code postal"],
                    ["latitude", "Latitude"],
                    ["longitude", "Longitude"]
                ]
            },
            {
                titre: "3. Publics accueillis",
                champs: [
                    ["publics", "Publics accueillis"],
                    ["publicsAutre", "Autres publics précisés"]
                ]
            },
            {
                titre: "4. Médiations et activités",
                champs: [
                    ["activites", "Médiations et activités"],
                    ["activitesAutre", "Autres activités précisées"]
                ]
            },
            {
                titre: "5. Professionnels présents",
                champs: [
                    ["professionnels", "Professionnels présents"],
                    ["professionnelsAutre", "Autres professionnels précisés"]
                ]
            },
            {
                titre: "6. Modalités d'accueil",
                champs: [
                    ["accueil_individuel", "Accueil individuel"],
                    ["accueil_groupe", "Accueil en groupe"],
                    ["accueil_institutions", "Accueil d'institutions"],
                    ["accessibilite_pmr", "Accessibilité PMR"],
                    ["hebergement", "Hébergement"],
                    ["tarifs", "Tarifs et conditions"]
                ]
            },
            {
                titre: "7. Source de l'information",
                champs: [
                    ["source", "Source (site web ou référence)"]
                ]
            }
        ];

