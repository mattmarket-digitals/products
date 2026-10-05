/* =========================================================
   AiMapCarte.js
   Tout ce qui concerne la carte
   ========================================================= */


/* ---------------------------------------------------------
   État de la carte
   --------------------------------------------------------- */

let mapStyle = 0;


/* ---------------------------------------------------------
   Mise en évidence d'un repère
   --------------------------------------------------------- */

function highlightPin(id){
  $$(".pin").forEach(pin => {
    pin.classList.toggle(
      "selected",
      Number(pin.dataset.place) === Number(id)
    );
  });
}


/* ---------------------------------------------------------
   GPS
   --------------------------------------------------------- */

function locateUser(){

  if(!navigator.geolocation){
    toast(
      "La géolocalisation n’est pas disponible dans ce navigateur."
    );
    return;
  }

  toast("Demande d’autorisation de localisation…");

  navigator.geolocation.getCurrentPosition(
    pos => {

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      toast(
        `Position obtenue : ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      );

      $("#mapNote").textContent = "Position GPS obtenue";
    },

    err => {

      toast(
        err.code === 1
          ? "Autorisation GPS refusée. Vous pouvez l’activer dans les réglages."
          : "Position indisponible. Vérifiez la connexion et les autorisations."
      );

    },

    {
      enableHighAccuracy:true,
      timeout:10000
    }
  );
}


/* ---------------------------------------------------------
   Type / apparence de la carte
   --------------------------------------------------------- */

function changeMapStyle(){

  mapStyle = (mapStyle + 1) % 3;

  const styles = [
    "none",
    "saturate(.55) contrast(1.05)",
    "grayscale(.75)"
  ];

  const labels = [
    "Carte standard",
    "Carte atténuée",
    "Carte monochrome"
  ];

  $("#map").style.filter = styles[mapStyle];

  toast(labels[mapStyle]);
}


/* ---------------------------------------------------------
   Préparation d'un itinéraire
   --------------------------------------------------------- */

function prepareRoute(){

  if(selectedPlace){

    const p = places.find(
      x => x.id === selectedPlace
    );

    if(p){
      toast(
        "Itinéraire de démonstration vers " +
        p.name
      );
    }

  }else{

    openSheet("search","mid");

    toast(
      "Choisissez un lieu pour préparer un itinéraire"
    );
  }
}


/* ---------------------------------------------------------
   Clic sur un repère
   --------------------------------------------------------- */

function selectPin(pin){

  selectedPlace = Number(
    pin.dataset.place
  );

  highlightPin(selectedPlace);

  openSheet("place","mid");
}


/* ---------------------------------------------------------
   Initialisation des événements de la carte
   --------------------------------------------------------- */

function initMapEvents(){

  $("#gpsBtn")?.addEventListener(
    "click",
    locateUser
  );

  $("#routeBtn")?.addEventListener(
    "click",
    prepareRoute
  );

  $("#mapType")?.addEventListener(
    "click",
    changeMapStyle
  );

  $$(".pin").forEach(pin => {

    pin.addEventListener(
      "click",
      () => selectPin(pin)
    );

  });

}


/* ---------------------------------------------------------
   Initialisation
   --------------------------------------------------------- */

initMapEvents();