const routes = {
    "/" : homepage,
    "/about" : aboutPage,
    "/projects" : projectsPage
};

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function router() {
    const path = window.location.pathname;
    const route = routes[path] || notFoundPage;
    document.getElementById("app").innerHTML = route();
}

function homepage() {
    return `
        <h1>Home</h1>
        <p>Welcome to my Vanilla JavaScript SPA</p>
    `;
}

function aboutPage() {
    return `
        <h1>About</h1>
        <p>This SPA is built without any framework</p>
    `;
}

function projectsPage() {
    return `
        <h1>Projects</h1>
        <ul>
            <li>Job Tracker</li>
            <li>Kanban Board</li>
            <li>API Dashboard</li>
        </ul>
    `;
}

function notFoundPage() {
    return `<h1>404 - Page Not Found</h1>`;
}

document.addEventListener("click", e => {
    const link = e.target.closest("[data-link]");
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute("href"));
    }
});

window.addEventListener("popstate", router);

router();