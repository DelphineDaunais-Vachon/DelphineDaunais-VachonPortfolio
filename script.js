document.addEventListener("DOMContentLoaded", () => {

    const galerie = document.getElementById('galerie');
    const nameBtn = document.getElementById("name-btn");
    const textMenu = document.getElementById("dropdown-text");

    if (!galerie) return;

    let velocity = 0;
    let isAnimating = false;


    /* =======================
       MENU NOM (Delphine)
    ======================= */
    if (nameBtn && textMenu) {
        nameBtn.addEventListener("click", () => {
            textMenu.style.display =
                (textMenu.style.display === "block") ? "none" : "block";
        });
    }


    /* =======================
       SCROLL HORIZONTAL
    ======================= */
    window.addEventListener("wheel", (evt) => {

        // 👉 si la souris est sur le menu déroulant
        const isInsideMenu = textMenu && textMenu.matches(":hover");

        if (isInsideMenu) return; // laisse le scroll naturel du menu

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

});

