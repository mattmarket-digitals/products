/*avec <div id="cadreLabel">
*/

document.currentScript.insertAdjacentHTML("afterend", `
<form id="formulaireFerme" class="formulaire">
    <fieldset>
        <legend>1. Identification et localisation</legend>

        <label for="nom">Nom de la ferme *</label>
        <input id="nom" name="nom" type="text" required maxlength="200">
        <br>
        <label for="type_structure">Type de structure *</label>
        <select id="type_structure" name="type_structure" required>
            <option value="">Choisir...</option>
            <option>Ferme thérapeutique</option>
            <option>Ferme pédagogique</option>
            <option>Ferme éducative</option>
            <option>Ferme sociale</option>
            <option>Ferme avec médiation animale</option>
            <option>Établissement agricole ou horticole</option>
            <option>Établissement médico-social avec activité agricole</option>
            <option>Association proposant des activités à la ferme</option>
            <option>Autre</option>
        </select>
        <br>
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
            <option>Provence-Alpes-Côte d’Azur</option>
            <option>Île-de-France</option>
            <option>Guadeloupe</option>
            <option>Martinique</option>
            <option>Guyane</option>
            <option>La Réunion</option>
            <option>Mayotte</option>
        </select>
        <br>
        <label for="departement">Département *</label>
        <input id="departement" name="departement" type="text"
               required maxlength="100"
               placeholder="Ex. : Moselle (57)">
        <br>
        <label for="commune">Commune *</label>
        <input id="commune" name="commune" type="text"
               required maxlength="150">
        <br>
        <label for="adresse">Adresse</label>
        <input id="adresse" name="adresse" type="text" maxlength="250">
        <br>
        <label for="code_postal">Code postal *</label>
        <input id="code_postal" name="code_postal" type="text"
               required inputmode="numeric" pattern="[0-9]{5}"
               maxlength="5" placeholder="Ex. : 57000">
        <br>
        <label for="latitude">Latitude</label>
        <input id="latitude" name="latitude" type="number"
               min="-90" max="90" step="any">
        <br>
        <label for="longitude">Longitude</label>
        <input id="longitude" name="longitude" type="number"
               min="-180" max="180" step="any">
    </fieldset>

    <fieldset>
        <legend>2. Coordonnées</legend>

        <label for="telephone">Téléphone</label>
        <input id="telephone" name="telephone" type="tel"
               autocomplete="tel">
        <br>
        <label for="email">Adresse e-mail *</label>
        <input id="email" name="email" type="email" required
               autocomplete="email">
        <br>
        <label for="site_web">Site web</label>
        <input id="site_web" name="site_web" type="url"
               placeholder="https://...">
    </fieldset>

    <fieldset>
        <legend>3. Publics accueillis</legend>
        <p>Plusieurs réponses possibles.</p>
        <label><input type="checkbox" name="publics" value="Enfants"> Enfants</label>
        <label><input type="checkbox" name="publics" value="Adolescents"> Adolescents</label>
        <label><input type="checkbox" name="publics" value="Adultes"> Adultes</label>
                <br>
        <label><input type="checkbox" name="publics" value="Personnes âgées"> Personnes âgées</label>
        <label><input type="checkbox" name="publics" value="Familles"> Familles</label>
                <br>
        <label><input type="checkbox" name="publics" value="Handicap moteur"> Personnes en situation de handicap moteur</label>
                <br>
        <label><input type="checkbox" name="publics" value="Handicap intellectuel"> Personnes en situation de handicap intellectuel</label>
                <br>
        <label><input type="checkbox" name="publics" value="TSA"> Personnes avec TSA</label>
                <br>
        <label><input type="checkbox" name="publics" value="Troubles psychiques"> Personnes avec troubles psychiques</label>
                <br>
        <label><input type="checkbox" name="publics" value="Difficultés sociales"> Personnes avec difficultés sociales</label>
                <br>
        <label><input type="checkbox" name="publics" value="Aidants"> Aidants</label>
        <label><input type="checkbox" name="publics" value="Tout public"> Tout public</label>
                <br>
        <label><input type="checkbox" name="publics" value="Autre"> Autre</label>
        <input id="publicsAutre" name="publicsAutre" type="text" maxlength="250">
    </fieldset>

    <fieldset>
        <legend>4. Médiations et activités</legend>
        <p>Plusieurs réponses possibles.</p>
        <label><input type="checkbox" name="activites" value="Médiation animale"> Médiation animale</label>
                <br>
        <label><input type="checkbox" name="activites" value="Contact avec les animaux"> Contact avec les animaux</label>
                <br>
        <label><input type="checkbox" name="activites" value="Jardinage"> Jardinage</label>
        <label><input type="checkbox" name="activites" value="Horticulture"> Horticulture</label>
                <br>
        <label><input type="checkbox" name="activites" value="Maraîchage"> Maraîchage</label>
        <label><input type="checkbox" name="activites" value="Travaux agricoles"> Travaux agricoles</label>
                <br>
        <label><input type="checkbox" name="activites" value="Activités sensorielles"> Activités sensorielles</label>
                <br>
        <label><input type="checkbox" name="activites" value="Activités créatives"> Activités créatives ou artistiques</label>
                <br>
        <label><input type="checkbox" name="activites" value="Cuisine"> Cuisine et transformation alimentaire</label>
                <br>
        <label><input type="checkbox" name="activites" value="Activités pédagogiques"> Activités pédagogiques</label>
        <label><input type="checkbox" name="activites" value="Socialisation"> Socialisation</label>
                <br>
        <label><input type="checkbox" name="activites" value="Insertion"> Remobilisation ou insertion</label>
                <br>
        <label><input type="checkbox" name="activites" value="Équitation"> Équitation ou médiation équine</label>
                <br>
        <label><input type="checkbox" name="activites" value="Autre"> Autre</label>
        <input id="activitesAutre" name="activitesAutre" type="text" maxlength="250">


    </fieldset>

    <fieldset>
        <legend>5. Professionnels présents</legend>
        <p>Plusieurs réponses possibles.</p>
        <label><input type="checkbox" name="professionnels" value="Agriculteur"> Agriculteur ou exploitant agricole</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Animateur"> Animateur</label>
                
        <label><input type="checkbox" name="professionnels" value="Éducateur spécialisé"> Éducateur spécialisé</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Moniteur-éducateur"> Moniteur-éducateur</label>
        <label><input type="checkbox" name="professionnels" value="Ergothérapeute"> Ergothérapeute</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Psychomotricien"> Psychomotricien</label>
        <label><input type="checkbox" name="professionnels" value="Psychologue"> Psychologue</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Infirmier"> Infirmier</label>
        <label><input type="checkbox" name="professionnels" value="Médecin"> Médecin</label>
        <label><input type="checkbox" name="professionnels" value="Travailleur social"> Travailleur social</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Médiateur animal"> Professionnel de la médiation animale</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Équithérapeute"> Équithérapeute</label>
                <br>
        <label><input type="checkbox" name="professionnels" value="Autre"> Autre professionnel</label>
        <input id="professionnelsAutre" name="professionnelsAutre" type="text" maxlength="250">

    </fieldset>

    <fieldset>
        <legend>6. Modalités d'accueil</legend>

        <label for="accueil_individuel">Accueil individuel</label>
        <select id="accueil_individuel" name="accueil_individuel">
            <option value="">Non renseigné</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="À confirmer">À confirmer</option>
        </select>
        <br>
        <label for="accueil_groupe">Accueil en groupe</label>
        <select id="accueil_groupe" name="accueil_groupe">
            <option value="">Non renseigné</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="À confirmer">À confirmer</option>
        </select>
        <br>
        <label for="accueil_institutions">Accueil d'institutions</label>
        <select id="accueil_institutions" name="accueil_institutions">
            <option value="">Non renseigné</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="À confirmer">À confirmer</option>
        </select>
        <br>
        <label for="accessibilite_pmr">Accessibilité PMR</label>
        <select id="accessibilite_pmr" name="accessibilite_pmr">
            <option value="">Non renseignée</option>
            <option value="Accessible">Accessible</option>
            <option value="Partiellement accessible">Partiellement accessible</option>
            <option value="Non accessible">Non accessible</option>
            <option value="À confirmer">À confirmer</option>
        </select>
        <br>
        <label for="hebergement">Hébergement</label>
        <select id="hebergement" name="hebergement">
            <option value="">Non renseigné</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="À confirmer">À confirmer</option>
        </select>
        <br>
        <label for="tarifs">Tarifs et conditions</label>
        <br>
        <textarea id="tarifs" name="tarifs" rows="4"
                  maxlength="2000"
                  placeholder="Ex. : tarif par séance, sur devis..."></textarea>
    </fieldset>

    <fieldset>
        <legend>7. Source de l'information</legend>
        <label for="source">Source (site web ou référence)</label>
        <input id="source" name="source" type="url"
               placeholder="https://...">
        <p>La date de vérification et le niveau de confiance seront renseignés par FermTerrap après contrôle.</p>
    </fieldset>

<div id="messageFormulaire"
     class="statut-formulaire statut-attente"
     role="status"
     aria-live="polite"
     aria-atomic="true">
    En attente de saisie.
</div>

    <button type="submit">Proposer cette ferme</button>
    <!-- <p id="messageFormulaire" role="status" aria-live="polite"></p> -->
</form>
`);