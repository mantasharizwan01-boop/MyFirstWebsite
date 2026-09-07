/* =========================================
   THEME
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


function updateThemeIcon() {

    if (!themeToggle) return;

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

}


if (
    localStorage.getItem("theme") === "dark"
) {

    document.body.classList.add("dark");

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function() {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );

            updateThemeIcon();

        }
    );

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function() {

            navLinks.classList.toggle("active");

        }
    );

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


/* =========================================
   SCROLL TO TOP
========================================= */

const scrollTop =
    document.getElementById("scrollTop");


if (scrollTop) {

    window.addEventListener(
        "scroll",
        function() {

            if (window.scrollY > 500) {

                scrollTop.style.display =
                    "block";

            } else {

                scrollTop.style.display =
                    "none";

            }

        }
    );


    scrollTop.addEventListener(
        "click",
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList
                            .add("show");

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    function(element) {

        revealObserver.observe(element);

    }
);


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
    document.querySelectorAll(
        "[data-target]"
    );


let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    if (!counters.length) return;

    const firstCounter =
        counters[0];

    const position =
        firstCounter.getBoundingClientRect().top;

    if (
        position <
        window.innerHeight - 100
    ) {

        countersStarted = true;

        counters.forEach(
            function(counter) {

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    target / 50;

                const timer =
                    setInterval(
                        function() {

                            current += increment;

                            if (
                                current >= target
                            ) {

                                counter.textContent =
                                    target;

                                clearInterval(timer);

                            } else {

                                counter.textContent =
                                    Math.floor(current);

                            }

                        },
                        30
                    );

            }
        );

    }

}


window.addEventListener(
    "scroll",
    startCounters
);

startCounters();