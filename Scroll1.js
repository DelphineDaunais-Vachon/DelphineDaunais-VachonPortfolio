document.addEventListener("DOMContentLoaded", () => {

    let velocity = 0;
    let isAnimating = false;

    const textMenu = document.getElementById("dropdown-text");

    let isMouseInTextMenu = false;
    let disableSmoothScroll = false;


    /* =======================
       DETECTION SOURIS MENU
    ======================= */
    if (textMenu) {
        textMenu.addEventListener("mouseenter", () => {
            isMouseInTextMenu = true;
        });

        textMenu.addEventListener("mouseleave", () => {
            isMouseInTextMenu = false;
        });
    }


    /* =======================
       SCROLL FLUIDE GLOBAL
    ======================= */
    window.addEventListener("wheel", (evt) => {

        if (isMouseInTextMenu) return;
        if (disableSmoothScroll) return;

        evt.preventDefault();

        velocity += evt.deltaY * 0.07;
        velocity = Math.max(Math.min(velocity, 15), -15);

        if (!isAnimating) animate();

    }, { passive: false });


    function animate() {
        isAnimating = true;

        window.scrollBy(0, velocity);
        velocity *= 0.97;

        if (Math.abs(velocity) < 0.05) {
            velocity = 0;
            isAnimating = false;
            return;
        }

        requestAnimationFrame(animate);
    }


    /* =======================
       MENU INDEX
    ======================= */
    const indexBtn = document.getElementById("index-btn");
    const indexMenu = document.getElementById("dropdown-menu");

    indexBtn.addEventListener("click", (e) => {
        e.preventDefault();

        indexMenu.style.display =
            (indexMenu.style.display === "block") ? "none" : "block";
    });


    /* =======================
       MENU NOM
    ======================= */
    const nameBtn = document.getElementById("name-btn");

    nameBtn.addEventListener("click", () => {
        textMenu.style.display =
            (textMenu.style.display === "block") ? "none" : "block";
    });


    /* =======================
       SCROLL CENTRÉ VERS PROJET
    ======================= */
    function scrollToProject(id) {
        const element = document.getElementById(id);
        if (!element) return;

        disableSmoothScroll = true;

        const rect = element.getBoundingClientRect();

        // 👉 centrage vertical
        const offset = window.innerHeight / 2 - rect.height / 2;

        window.scrollTo({
            top: rect.top + window.pageYOffset - offset,
            behavior: "auto"
        });

        setTimeout(() => {
            disableSmoothScroll = false;
        }, 200);
    }


    /* =======================
       LIENS INDEX -> PROJETS
    ======================= */
    document.querySelectorAll(".dropdown-menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (href.startsWith("#")) {
                e.preventDefault();

                const id = href.substring(1);
                scrollToProject(id);

            }
        });
    });

});