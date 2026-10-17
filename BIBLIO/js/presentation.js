
/* ==========================================================
   PRESENTATION DE SOUTENANCE
   19 images - 5 secondes par slide
   ========================================================== */
   
    // ---------- IMPORTATION ----------

import { lectureAuScroll } from "./lectureAuScroll.js";

(() => {
    "use strict";

    // ---------- CONFIGURATION ----------

    const nombreSlides = 19;
    const numPremiereSlide = 0;
    const dureeSlide = 5000; // 5 secondes

    const cheminImages = "../images/soutenance/";

    // ---------- INSERTION DU CSS ----------

    const style = document.createElement("style");

    style.textContent = `
        #presentation {
            margin: 0;
            padding: 0;
            overflow: hidden;
            box-sizing: border-box;
            width: /*100%*/ 100vw;
            max-width: 100vw;
            margin-left: calc(50% - 50vw); 
        }

        #presentation *,
        #presentation *::before,
        #presentation *::after {
            box-sizing: border-box;
        }

        #presentation .slides {
            display: flex;
            width: 100%;
            margin: 0;
            padding: 0;
            transform: translateX(0);
            transition: transform 0.35s ease;
        }

        #presentation .slide {
            flex: 0 0 100%;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
        }

        #presentation .slide img {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
        }

        #presentation .commandes {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 100%;
            padding: 8px 4px;
        }

        #presentation .commandes button {
            min-width: 38px;
            min-height: 38px;
            padding: 6px 9px;
            border: 1px solid #888;
            border-radius: 6px;
            background: #252525;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }

        #presentation .commandes button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        #presentation .numero-slide {
            min-width: 58px;
            text-align: center;
            font-size: 14px;
            font-variant-numeric: tabular-nums;
        }

        #presentation .commandes button:focus-visible {
            outline: 3px solid #FF69B4;
            outline-offset: 2px;
        }

        #presentation:fullscreen {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #000;
            color: #fff;
            display: flex;
            flex-direction: column;
        }

        #presentation:fullscreen .zone-slides {
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        #presentation:fullscreen .slides {
            flex-shrink: 0;
        }

        #presentation:fullscreen .slide img {
            width: 100%;
            height: auto;
            max-height: calc(100dvh - 65px);
            object-fit: contain;
        }

        #presentation:fullscreen .commandes {
            flex: 0 0 auto;
            padding: 8px 4px;
            background: #111;
        }

        @media (orientation: landscape) {
            #presentation:fullscreen .slide img {
                max-height: calc(100dvh - 65px);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #presentation .slides {
                transition: none;
            }
        }
    `;

    document.head.appendChild(style);

    // ---------- CONSTRUCTION DU HTML ----------

    const listeSlides = Array.from(
        { length: nombreSlides },
        (_, index) => {
            const numero = String(index + 1).padStart(2, "0");

            return `
                <div class="slide">
                    <img
                        src="${cheminImages}page-${numero}~2.jpg"
                        alt="Diapositive ${index + 1} sur ${nombreSlides}"
                        ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                        draggable="false"
                    >
                </div>
            `;
        }
    ).join("");

    const htmlPresentation = `
        <section
            id="presentation"
            aria-label="Présentation de soutenance"
        >
            <div class="zone-slides">
                <div class="slides">
                    ${listeSlides}
                </div>
            </div>

            <nav class="commandes" aria-label="Commandes de présentation">
                <button
                    type="button"
                    data-action="reculer5"
                    aria-label="Reculer de cinq diapositives"
                    title="5 diapositives en arrière"
                >⏮ 5</button>

                <button
                    type="button"
                    data-action="precedente"
                    aria-label="Diapositive précédente"
                    title="Précédente"
                >|◀</button>

                <button
                    type="button"
                    data-action="lecture"
                    aria-label="Lancer la lecture automatique"
                    title="Lecture automatique"
                >▶</button>

                <output
                    class="numero-slide"
                    aria-label="Numéro de la diapositive"
                    aria-live="off"
                >1 / ${nombreSlides}</output>

                <button
                    type="button"
                    data-action="pause"
                    aria-label="Mettre la présentation en pause"
                    title="Pause"
                >⏸</button>

                <button
                    type="button"
                    data-action="suivante"
                    aria-label="Diapositive suivante"
                    title="Suivante"
                >▶|</button>

                <button
                    type="button"
                    data-action="avancer5"
                    aria-label="Avancer de cinq diapositives"
                    title="5 diapositives en avant"
                >5 ⏭</button>

                <button
                    type="button"
                    data-action="pleinEcran"
                    aria-label="Passer en plein écran"
                    title="Plein écran"
                >⛶</button>
            </nav>
        </section>
    `;

// ---------- INSERTION DE LA PRÉSENTATION ----------
    // Insérer la présentation à l'emplacement du script.
    /*
    const scriptCourant = document.currentScript;

    if (!scriptCourant || !scriptCourant.parentNode) {
        console.error(
            "presentation.js doit être chargé avec une balise script classique."
        );
        return;
    }

    scriptCourant.insertAdjacentHTML(
        "afterend",
        htmlPresentation
    );
*/

const scriptCourant = document.querySelector(
    'script[type="module"][src$="presentation.js"]'
);

if (!scriptCourant || !scriptCourant.parentNode) {
    console.error("Impossible de trouver la balise script de presentation.js.");
    return;
}

scriptCourant.insertAdjacentHTML("afterend", htmlPresentation);

    // ---------- RÉCUPÉRATION DES ÉLÉMENTS ----------

    const presentation = scriptCourant.nextElementSibling;
    
    const commandes = presentation.querySelector(".commandes");

    const zoneSlides = presentation.querySelector(".zone-slides");
    const bandeSlides = presentation.querySelector(".slides");
    const numeroSlide = presentation.querySelector(".numero-slide");

    const boutonReculer5 = presentation.querySelector('[data-action="reculer5"]');
    const boutonPrecedente = presentation.querySelector('[data-action="precedente"]');
    const boutonLecture = presentation.querySelector('[data-action="lecture"]');
    const boutonPause = presentation.querySelector('[data-action="pause"]');
    const boutonSuivante = presentation.querySelector('[data-action="suivante"]');
    const boutonAvancer5 = presentation.querySelector('[data-action="avancer5"]');
    const boutonPleinEcran = presentation.querySelector('[data-action="pleinEcran"]');

    const images = presentation.querySelectorAll(".slide img");

    let indexActuel = 0;
    let minuterie = null;

    // ---------- AFFICHAGE D'UNE SLIDE ----------

    function afficherSlide(index) {
        indexActuel = index;

        bandeSlides.style.transform =
            `translateX(-${indexActuel * 100}%)`;

        numeroSlide.textContent =
            `${indexActuel + numPremiereSlide} / ${nombreSlides - 1 + numPremiereSlide
            }`;/* + 1} / ${nombreSlides}`;*/

        boutonReculer5.disabled = indexActuel < 5;
        boutonPrecedente.disabled = indexActuel === 0;

        boutonSuivante.disabled =
            indexActuel === nombreSlides - 1;

        boutonAvancer5.disabled =
            indexActuel + 5 >= nombreSlides;
    }

    // ---------- LECTURE AUTOMATIQUE ----------

    function arreterLecture() {
        if (minuterie !== null) {
            clearInterval(minuterie);
            minuterie = null;
        }

        boutonLecture.setAttribute(
            "aria-label",
            "Lancer la lecture automatique"
        );
    }

    function lancerLecture() {
        arreterLecture();

        boutonLecture.setAttribute(
            "aria-label",
            "Relancer la lecture automatique"
        );

        minuterie = setInterval(() => {
            const prochainIndex =
                indexActuel === nombreSlides - 1
                    ? 0
                    : indexActuel + 1;

            afficherSlide(prochainIndex);
        }, dureeSlide);
    }

    // ---------- COMMANDES MANUELLES ----------

    boutonReculer5.addEventListener("click", () => {
        if (indexActuel >= 5) {
            afficherSlide(indexActuel - 5);
        }
    });

    boutonPrecedente.addEventListener("click", () => {
        if (indexActuel > 0) {
            afficherSlide(indexActuel - 1);
        }
    });

    boutonLecture.addEventListener("click", () => {
        if (minuterie === null) {
            lancerLecture();
        }
    });

    boutonPause.addEventListener("click", arreterLecture);

    boutonSuivante.addEventListener("click", () => {
        if (indexActuel < nombreSlides - 1) {
            afficherSlide(indexActuel + 1);
        }
    });

    boutonAvancer5.addEventListener("click", () => {
        if (indexActuel + 5 < nombreSlides) {
            afficherSlide(indexActuel + 5);
        }
    });

// ---------- ARRÊT AUTO LORS D'UNE ACTION MANUELLE ----------


commandes.addEventListener("click", (event) => {
    const bouton = event.target.closest("button");

    if (!bouton) return;

    // Le bouton Lecture reste autorisé à relancer le diaporama.
    if (bouton === boutonLecture) return;

    arreterLecture();
});

    // ---------- MODE PLEIN ÉCRAN ----------

    // Mémorise l'orientation avant l'entrée en plein écran.
    let utilisateurEnModePortrait = false;

    // Indique si la présentation a réussi à verrouiller l'orientation.
    let orientationVerrouilleeParPresentation = false;

    function mettreAJourBoutonPleinEcran() {
        const enPleinEcran =
            document.fullscreenElement === presentation;

        boutonPleinEcran.textContent = "⛶";

        boutonPleinEcran.setAttribute(
            "aria-label",
            enPleinEcran
                ? "Quitter le plein écran"
                : "Passer en plein écran"
        );

        boutonPleinEcran.title =
            enPleinEcran
                ? "Quitter le plein écran"
                : "Plein écran";
    }
    

/*
boutonPleinEcran.addEventListener("click", async () => {
    if (document.fullscreenElement === presentation) {
        try {
            await document.exitFullscreen();
        } catch (erreur) {
            console.error("Erreur en quittant le plein écran :", erreur);
        }
        return;
    }

    if (document.fullscreenElement) {
        console.warn("Un autre élément est déjà en plein écran.");
        return;
    }

    if (typeof presentation.requestFullscreen !== "function") {
        console.warn("Le plein écran n'est pas pris en charge.");
        return;
    }

    utilisateurEnModePortrait =
        window.matchMedia("(orientation: portrait)").matches;

    try {
        await presentation.requestFullscreen();
    } catch (erreur) {
        console.warn(
            "Plein écran indisponible dans cet environnement :",
            erreur.message
        );
        return;
    }

    if (screen.orientation?.lock) {
        try {
            await screen.orientation.lock("landscape");
            orientationVerrouilleeParPresentation = true;
        } catch (erreur) {
            console.warn(
                "Verrouillage paysage indisponible :",
                erreur.message
            );
        }
    }
});
*/
    

boutonPleinEcran.addEventListener("click", async () => {
    try {
        if (document.fullscreenElement === presentation) {
            await document.exitFullscreen();
            return;
        }

        if (document.fullscreenElement) {
            console.warn("Un autre élément est déjà en plein écran.");
            return;
        }

        // Mémoriser l'orientation avant le plein écran.
        utilisateurEnModePortrait =
            window.matchMedia("(orientation: portrait)").matches;

        // Vérifier la prise en charge du plein écran.
        if (!presentation.requestFullscreen) {
            console.warn(
                "Ce navigateur ne prend pas en charge le plein écran pour cet élément."
            );
            return;
        }

        await presentation.requestFullscreen();

        // Tenter le passage en paysage si possible.
        if (screen.orientation?.lock) {
            try {
                await screen.orientation.lock("landscape");
                orientationVerrouilleeParPresentation = true;
            } catch (erreur) {
                console.warn(
                    "Verrouillage en paysage refusé par le navigateur :",
                    erreur
                );
            }
        }
    } catch (erreur) {
        console.error("Erreur lors du passage en plein écran :", erreur);
    }
});

    document.addEventListener("fullscreenchange", async () => {
        mettreAJourBoutonPleinEcran();

        // Si l'utilisateur quitte le plein écran, restaure le portrait
        // seulement si l'appareil était initialement en portrait.
        if (
            !document.fullscreenElement &&
            utilisateurEnModePortrait &&
            orientationVerrouilleeParPresentation
        ) {
            try {
                screen.orientation.unlock();
            } catch (erreur) {
                console.warn(
                    "Impossible de restaurer l'orientation :",
                    erreur
                );
            }

            orientationVerrouilleeParPresentation = false;
        }
    });
    
    // ---------- GLISSEMENT TACTILE ----------

    let debutTouchX = 0;
    let debutTouchY = 0;

    zoneSlides.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;

        debutTouchX = event.touches[0].clientX;
        debutTouchY = event.touches[0].clientY;
    }, { passive: true });

    zoneSlides.addEventListener("touchend", (event) => {
        if (event.changedTouches.length !== 1) return;

        const finX = event.changedTouches[0].clientX;
        const finY = event.changedTouches[0].clientY;

        const deltaX = finX - debutTouchX;
        const deltaY = finY - debutTouchY;
/*
        // Réagir uniquement à un vrai glissement horizontal.
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
            return;
        }

        if (deltaX < 0 && indexActuel < nombreSlides - 1) {
            afficherSlide(indexActuel + 1);
        } else if (deltaX > 0 && indexActuel > 0) {
            afficherSlide(indexActuel - 1);
        }
    }, { passive: true });
*/
// Ignorer les gestes trop courts ou principalement verticaux.
        if (
            Math.abs(deltaX) < 50 ||
            Math.abs(deltaX) < Math.abs(deltaY)
        ) {
            return;
        }
    
        // Un glissement horizontal manuel arrête la lecture automatique.
        arreterLecture();
    
        if (deltaX < 0 && indexActuel < nombreSlides - 1) {
            afficherSlide(indexActuel + 1);
        } else if (deltaX > 0 && indexActuel > 0) {
            afficherSlide(indexActuel - 1);
        }
    }, { passive: true });

    // ---------- INITIALISATION ----------

    afficherSlide(0);
    //lancerLecture();
lectureAuScroll({
    presentation: presentation,
    lancerLecture: lancerLecture
});

    // Vérifier le chargement des images.
    images.forEach((image) => {
        image.addEventListener("error", () => {
            console.error("Image introuvable :", image.src);
        });
    });

})();