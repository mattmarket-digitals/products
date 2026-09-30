function afficherDimensions() {
    console.log("******** Dimensions **********")
    console.log("Largeur-device (px) = ", screen.width);
    console.log("Hauteur-device (px) = ", screen.height);
    console.log("Largeur-page (px) = ", window.innerWidth);
    console.log("Hauteur-page (px) = ", window.innerHeight);
    console.log("Visual viewport :");
    console.log("  largeur =", window.visualViewport.width);
    console.log("  hauteur =", window.visualViewport.height);
    console.log("  scale =", window.visualViewport.scale);
}

afficherDimensions();

