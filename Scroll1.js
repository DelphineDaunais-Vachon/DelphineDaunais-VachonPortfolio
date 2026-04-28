document.addEventListener("DOMContentLoaded", () => {

    let velocity = 0;
    let isAnimating = false;

    window.addEventListener("wheel", (evt) => {
        evt.preventDefault();

        // vitesse lente et contrôlée
        velocity += evt.deltaY * 0.07;

        // limite pour éviter les accélérations trop fortes
        velocity = Math.max(Math.min(velocity, 15), -15);

        if (!isAnimating) animate();
    }, { passive: false });

    function animate() {
        isAnimating = true;

        // scroll fluide vertical
        window.scrollBy(0, velocity);

        // inertie douce
        velocity *= 0.97;

        // arrêt naturel (aucun snap)
        if (Math.abs(velocity) < 0.05) {
            velocity = 0;
            isAnimating = false;
            return;
        }

        requestAnimationFrame(animate);
    }
});