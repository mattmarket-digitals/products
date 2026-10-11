export function lectureAuScroll({ presentation, lancerLecture }) {

    // ---------- DÉMARRAGE DE LA LECTURE AU SCROLL ----------

    let lectureDemarree = false;

    const observateurPresentation = new IntersectionObserver(
        (entrees, observateur) => {
            const entree = entrees[0];

            if (entree.isIntersecting && !lectureDemarree) {
                lectureDemarree = true;

                lancerLecture();

                // L'observation n'est nécessaire qu'une seule fois.
                observateur.unobserve(presentation);
            }
        },
        {
            threshold: 0.1
        }
    );

    observateurPresentation.observe(presentation);
}