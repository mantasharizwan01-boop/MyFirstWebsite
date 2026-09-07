/* =========================================
   PROJECT LOADER
========================================= */

const projectsContainer =
    document.getElementById(
        "projectsContainer"
    );

const projectSearch =
    document.getElementById(
        "projectSearch"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


let projects = [];


/* =========================================
   LOAD JSON
========================================= */

async function loadProjects() {

    try {

        const response =
            await fetch(
                "data/projects.json"
            );

        projects =
            await response.json();

        displayProjects(projects);

    }

    catch (error) {

        projectsContainer.innerHTML = `

            <p>
                ❌ Unable to load projects.
            </p>

        `;

        console.error(error);

    }

}


/* =========================================
   DISPLAY PROJECTS
========================================= */

function displayProjects(projectList) {

    projectsContainer.innerHTML = "";


    if (projectList.length === 0) {

        projectsContainer.innerHTML = `

            <div class="no-results">

                <h3>
                    No projects found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    projectList.forEach(
        function(project) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "project-card reveal";


            card.innerHTML = `

                <div class="project-image">

                    ${project.icon}

                </div>


                <div class="project-body">

                    <span class="project-category">

                        ${project.category}

                    </span>


                    <h3>

                        ${project.title}

                    </h3>


                    <p>

                        ${project.description}

                    </p>


                    <div class="project-tags">

                        ${project.technologies
                            .map(
                                tech =>
                                `<span>${tech}</span>`
                            )
                            .join("")
                        }

                    </div>

                </div>

            `;


            projectsContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================
   FILTER
========================================= */

function filterProjects() {

    const search =
        projectSearch.value
            .toLowerCase()
            .trim();

    const category =
        categoryFilter.value;


    const filtered =
        projects.filter(
            function(project) {

                const matchesSearch =
                    project.title
                        .toLowerCase()
                        .includes(search)
                    ||
                    project.description
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =
                    category === "all"
                    ||
                    project.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayProjects(filtered);

}


if (projectSearch) {

    projectSearch.addEventListener(
        "input",
        filterProjects
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProjects
    );

}


loadProjects();