/* =========================================================
   AiMapCarte1leaf.js
   Logique de la carte Leaflet
   ========================================================= */


/* =========================================================
   CONFIGURATION LEAFLET
   ========================================================= */

let leafletMap = null;
let leafletMarkers = [];
let mapStyle = 0;


/*
 * Coordonnées de démonstration.
 *
 * Les adresses du prototype sont fictives.
 * Les coordonnées servent uniquement à positionner
 * visuellement les repères sur la carte.
 */
const demoCoordinates = {
  0: [48.6500, 7.2400], // Maison des Tilleuls
  1: [48.7410, 7.3620], // Café des Rives
  2: [48.5830, 7.7450]  // Jardin du Marché
};


/* =========================================================
   INITIALISATION
   ========================================================= */

function initMap() {

  const mapElement = $("#map");

  if (!mapElement) {
    console.warn("Leaflet : #map introuvable.");
    return;
  }

  /*
   * Création de la carte.
   */
  leafletMap = L.map(mapElement, {
    zoomControl: false,
    attributionControl: true
  });


  /*
   * Fond OpenStreetMap.
   */
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  ).addTo(leafletMap);


  /*
   * Position initiale.
   *
   * On utilise une vue générale Grand Est / Alsace
   * pour le prototype.
   */
  leafletMap.setView(
    [48.70, 7.45],
    9
  );


  /*
   * Création des repères.
   */
  createMarkers();


  /*
   * Ajustement automatique de la carte.
   */
  fitMarkers();


  /*
   * Gestion des contrôles.
   */
  initMapControls();

}


/* =========================================================
   CRÉATION DES MARQUEURS
   ========================================================= */

function createMarkers() {

  /*
   * Suppression d'éventuels anciens marqueurs.
   */
  leafletMarkers.forEach(marker => {
    marker.remove();
  });

  leafletMarkers = [];


  /*
   * Création d'un marqueur pour chaque lieu.
   */
  places.forEach((place, index) => {

    const coords = demoCoordinates[place.id];

    if (!coords) {
      return;
    }


    /*
     * Icône personnalisée.
     */
    const icon = L.divIcon({

      className: "reperes-leaflet-icon",

      html: `
        <div
          class="reperes-marker"
          data-place="${place.id}"
        >
          <span>${place.photo || place.emoji || "📍"}</span>
        </div>
      `,

      iconSize: [42, 42],

      iconAnchor: [21, 42],

      popupAnchor: [0, -40]

    });


    /*
     * Création du marker.
     */
    const marker = L.marker(
      coords,
      {
        icon,
        title: place.name
      }
    );


    /*
     * Popup.
     */
    marker.bindPopup(`
      <div class="map-popup">

        <h4>${esc(place.name)}</h4>

        <p>
          ${esc(place.kind)}
          ·
          ${esc(place.city)}
        </p>

        <p>
          ${esc(place.distance)}
        </p>

        <button
          type="button"
          data-map-place="${place.id}"
        >
          Voir le lieu
        </button>

      </div>
    `);


    /*
     * Lorsqu'on clique sur le marqueur.
     */
    marker.on("click", () => {

      selectedPlace = Number(place.id);

      highlightPin(place.id);

      /*
       * On laisse Leaflet ouvrir son popup.
       * Puis on ouvre également le panneau Repères.
       */
      setTimeout(() => {

        openSheet(
          "place",
          "mid"
        );

      }, 100);

    });


    /*
     * Quand le popup est ouvert,
     * on branche le bouton "Voir le lieu".
     */
    marker.on("popupopen", event => {

      const popupElement = event.popup.getElement();

      if (!popupElement) {
        return;
      }

      const button =
        popupElement.querySelector("[data-map-place]");

      if (!button) {
        return;
      }

      button.addEventListener("click", () => {

        selectedPlace = Number(
          button.dataset.mapPlace
        );

        highlightPin(selectedPlace);

        openSheet(
          "place",
          "mid"
        );

        leafletMap.closePopup();

      });

    });


    /*
     * Ajout à la carte.
     */
    marker.addTo(leafletMap);

    leafletMarkers.push(marker);

  });

}


/* =========================================================
   SÉLECTION D'UN REPÈRE
   ========================================================= */

function highlightPin(id) {

  /*
   * Mise à jour visuelle des icônes.
   */
  document
    .querySelectorAll(".reperes-marker")
    .forEach(marker => {

      marker.classList.toggle(
        "selected",
        Number(marker.dataset.place) === Number(id)
      );

    });


  /*
   * Mise à jour des markers Leaflet.
   */
  leafletMarkers.forEach(marker => {

    const element =
      marker.getElement();

    if (!element) {
      return;
    }

    const pin =
      element.querySelector(".reperes-marker");

    if (!pin) {
      return;
    }

    pin.classList.toggle(
      "selected",
      Number(pin.dataset.place) === Number(id)
    );

  });

}


/* =========================================================
   CENTRAGE SUR LES REPÈRES
   ========================================================= */

function fitMarkers() {

  if (!leafletMap || !leafletMarkers.length) {
    return;
  }

  const group =
    L.featureGroup(leafletMarkers);

  leafletMap.fitBounds(
    group.getBounds().pad(0.15)
  );

}


/* =========================================================
   CENTRER SUR UN LIEU
   ========================================================= */

function focusPlace(id) {

  const marker =
    leafletMarkers.find(marker => {

      const element =
        marker.getElement();

      if (!element) {
        return false;
      }

      const pin =
        element.querySelector(".reperes-marker");

      return pin &&
        Number(pin.dataset.place) === Number(id);

    });


  if (!marker) {
    return;
  }


  const latLng =
    marker.getLatLng();


  leafletMap.flyTo(
    latLng,
    15,
    {
      duration: .7
    }
  );


  marker.openPopup();

  highlightPin(id);

}


/* =========================================================
   GÉOLOCALISATION
   ========================================================= */

function locateUser() {

  if (!leafletMap) {
    return;
  }


  if (!navigator.geolocation) {

    toast(
      "La géolocalisation n’est pas disponible dans ce navigateur."
    );

    return;

  }


  toast(
    "Demande d’autorisation de localisation…"
  );


  navigator.geolocation.getCurrentPosition(

    position => {

      const lat =
        position.coords.latitude;

      const lng =
        position.coords.longitude;


      /*
       * Création d'une icône GPS.
       */
      const gpsIcon = L.divIcon({

        className: "reperes-gps-icon",

        html: `
          <div style="
            width:18px;
            height:18px;
            border-radius:50%;
            background:#2f6f4e;
            border:4px solid white;
            box-shadow:0 0 0 7px rgba(47,111,78,.18);
          "></div>
        `,

        iconSize: [18, 18],

        iconAnchor: [9, 9]

      });


      /*
       * Suppression de l'ancien marker GPS.
       */
      if (window.reperesGpsMarker) {

        window.reperesGpsMarker.remove();

      }


      /*
       * Ajout du nouveau marker.
       */
      window.reperesGpsMarker =
        L.marker(
          [lat, lng],
          {
            icon: gpsIcon
          }
        )
        .addTo(leafletMap);


      /*
       * Centrage.
       */
      leafletMap.flyTo(
        [lat, lng],
        14,
        {
          duration: .8
        }
      );


      $("#mapNote").textContent =
        "Position GPS obtenue";


      toast(
        `Position obtenue : ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      );

    },

    error => {

      if (error.code === 1) {

        toast(
          "Autorisation GPS refusée. Vous pouvez l’activer dans les réglages."
        );

      } else {

        toast(
          "Position indisponible. Vérifiez la connexion et les autorisations."
        );

      }

    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }

  );

}


/* =========================================================
   TYPES DE CARTE
   ========================================================= */

function changeMapStyle() {

  if (!leafletMap) {
    return;
  }


  mapStyle =
    (mapStyle + 1) % 3;


  /*
   * On agit sur les tuiles Leaflet.
   */
  const tilePane =
    document.querySelector(
      ".leaflet-tile-pane"
    );


  if (!tilePane) {
    return;
  }


  const filters = [

    "none",

    "saturate(.55) contrast(1.05)",

    "grayscale(.75)"

  ];


  tilePane.style.filter =
    filters[mapStyle];


  const labels = [

    "Carte standard",

    "Carte atténuée",

    "Carte monochrome"

  ];


  toast(
    labels[mapStyle]
  );

}


/* =========================================================
   PRÉPARER UN ITINÉRAIRE
   ========================================================= */

function prepareRoute() {

  if (selectedPlace) {

    const place =
      places.find(
        item =>
          Number(item.id) ===
          Number(selectedPlace)
      );


    if (place) {

      const coords =
        demoCoordinates[place.id];


      if (coords) {

        focusPlace(place.id);

      }


      toast(
        "Itinéraire de démonstration vers " +
        place.name
      );

      return;

    }

  }


  openSheet(
    "search",
    "mid"
  );


  toast(
    "Choisissez un lieu pour préparer un itinéraire"
  );

}


/* =========================================================
   CONTRÔLES DE LA CARTE
   ========================================================= */

function initMapControls() {

  /*
   * GPS.
   */
  $("#gpsBtn")?.addEventListener(
    "click",
    locateUser
  );


  /*
   * Type de carte.
   */
  $("#mapType")?.addEventListener(
    "click",
    changeMapStyle
  );


  /*
   * Itinéraire.
   */
  $("#routeBtn")?.addEventListener(
    "click",
    prepareRoute
  );


  /*
   * Redimensionnement de la carte lorsque
   * le panneau inférieur change de taille.
   */
  window.addEventListener(
    "resize",
    () => {

      leafletMap?.invalidateSize();

    }
  );

}


/* =========================================================
   INITIALISATION
   ========================================================= */

function initLeafletMap() {

  if (typeof L === "undefined") {

    console.error(
      "Leaflet n'est pas chargé."
    );

    return;

  }


  if (typeof places === "undefined") {

    console.error(
      "La variable 'places' n'est pas disponible."
    );

    return;

  }


  initMap();

}


/*
 * On attend que le DOM soit prêt.
 */
if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initLeafletMap
  );

} else {

  initLeafletMap();

}