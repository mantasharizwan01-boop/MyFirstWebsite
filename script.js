/* =================================
   DARK / LIGHT MODE
================================= */

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


/* Load saved theme */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";
}


/* =================================
   MOBILE MENU
================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking link */

document.querySelectorAll(".nav-links a")
    .forEach(function(link) {

        link.addEventListener("click", function() {

            navLinks.classList.remove("active");

        });

    });


/* =================================
   ANIMATED STATISTICS
================================= */

const stats =
    document.querySelectorAll(".stat h2");


let statsStarted = false;


function startStats() {

    if (statsStarted) return;

    const statsSection =
        document.querySelector(".stats-section");

    const position =
        statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        statsStarted = true;

        stats.forEach(function(stat) {

            const target =
                Number(stat.dataset.target);

            let current = 0;

            const increment =
                target / 50;

            const timer =
                setInterval(function() {

                    current += increment;

                    if (current >= target) {

                        stat.textContent = target;

                        clearInterval(timer);

                    } else {

                        stat.textContent =
                            Math.floor(current);

                    }

                }, 30);

        });

    }

}


window.addEventListener("scroll", startStats);


/* =================================
   SKILL SEARCH
================================= */

const searchInput =
    document.getElementById("skillSearch");

const skillCards =
    document.querySelectorAll(".skill-card");


searchInput.addEventListener("input", function() {

    const searchValue =
        searchInput.value.toLowerCase();

    skillCards.forEach(function(card) {

        const skillName =
            card.dataset.name.toLowerCase();

        if (skillName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


/* =================================
   PROJECT MODAL
================================= */

function showProject(projectName) {

    const modal =
        document.getElementById("projectModal");

    const title =
        document.getElementById("modalTitle");

    const text =
        document.getElementById("modalText");


    title.textContent = projectName;


    const descriptions = {

        "Linux Automation":
            "A Linux automation project involving Bash scripting, cron jobs, backups, monitoring and system maintenance.",

        "Network Monitoring":
            "A network monitoring project designed to check connectivity, services, devices and network health.",

        "Infrastructure Lab":
            "A virtual infrastructure laboratory containing Linux servers, networking, virtualization and administration exercises."

    };


    text.textContent =
        descriptions[projectName] ||
        "Project details coming soon.";


    modal.style.display = "flex";

}


function closeModal() {

    document.getElementById("projectModal")
        .style.display = "none";

}


/* Close modal when clicking outside */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("projectModal");

    if (event.target === modal) {

        closeModal();

    }

});


/* =================================
   CONTACT FORM
================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const formMessage =
        document.getElementById("formMessage");


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "❌ Please fill in all fields.";

        return;

    }


    if (!email.includes("@")) {

        formMessage.textContent =
            "❌ Please enter a valid email.";

        return;

    }


    formMessage.textContent =
        "✅ Message submitted successfully!";


    contactForm.reset();

});


/* =================================
   SCROLL TO TOP
================================= */

const scrollTop =
    document.getElementById("scrollTop");


window.addEventListener("scroll", function() {

    if (window.scrollY > 500) {

        scrollTop.style.display = "block";

    } else {

        scrollTop.style.display = "none";

    }

});


scrollTop.addEventListener("click", function() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =================================
   SIMPLE REVEAL ANIMATION
================================= */

const cards =
    document.querySelectorAll(
        ".about-card, .skill-card, .project-card"
    );


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


cards.forEach(function(card) {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});