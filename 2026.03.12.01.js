document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.getElementById('galerie');
    if (!galerie) return;

    let velocity = 0;
    let isAnimating = false;

    window.addEventListener("wheel", (evt) => {
        evt.preventDefault();

        velocity += evt.deltaY * 0.08;
        velocity = Math.max(Math.min(velocity, 25), -25);

        if (!isAnimating) animate();
    }, { passive: false });

    function animate() {
        isAnimating = true;

        galerie.scrollLeft += velocity;
        velocity *= 0.95;

        if (Math.abs(velocity) < 0.05) {
            velocity = 0;
            isAnimating = false;
            return;
        }

        requestAnimationFrame(animate);
    }

    // TROUVER IMAGE CENTRALE + INDEX
    function getImageLaPlusCentrale() {
        const images = document.querySelectorAll("#galerie .item img");
        const centerX = window.innerWidth / 2;

        let closestImage = null;
        let minDistance = Infinity;
        let index = 0;

        images.forEach((img, i) => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - imgCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestImage = img;
                index = i;
            }
        });

        return { img: closestImage, index };
    }

    // SAUVEGARDE
    const lienAccueil = document.querySelector('a[href="Index.html"]');

    if (lienAccueil) {
        lienAccueil.addEventListener("click", () => {
            const result = getImageLaPlusCentrale();

            if (result.img) {
                const rect = result.img.getBoundingClientRect();

                localStorage.setItem("UneEcoleForetImage", result.img.src);
                localStorage.setItem("UneEcoleForetWidth", rect.width);
                localStorage.setItem("UneEcoleForetHeight", rect.height);
                localStorage.setItem("UneEcoleForetIndex", result.index);
            }
        });
    }

    // RESTAURATION POSITION AU CHARGEMENT
    const savedIndex = localStorage.getItem("UneEcoleForetIndex");

    if (savedIndex !== null) {
        const images = document.querySelectorAll("#galerie .item");

        const target = images[savedIndex];

        if (target) {
            // attendre que tout soit bien rendu
            setTimeout(() => {
                const rect = target.getBoundingClientRect();
                const galerieRect = galerie.getBoundingClientRect();

                const offset = rect.left - galerieRect.left;

                galerie.scrollLeft += offset - (window.innerWidth / 2 - rect.width / 2);
            }, 100);
        }
    }
});