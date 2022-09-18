function openTab(tabName) {
    // Open tab
    let tabToOpen = document.getElementById(tabName);
    let btn = document.getElementById(tabName + "btn");
    let pageTitle = document.getElementById("page-title");
    tabToOpen.classList.remove('hidden');
    btn.classList.add('active');
    // Close the other tab
    if (tabName == "blogposts") {
        document.getElementById("devlogs").classList.add('hidden');
        document.getElementById("devlogsbtn").classList.remove('active');
        document.getElementById("projects").classList.add('hidden');
        document.getElementById("projectsbtn").classList.remove('active');
        pageTitle.innerHTML = "Blog Posts";
    }
    else if (tabName == "devlogs") {
        document.getElementById("blogposts").classList.add('hidden');
        document.getElementById("blogpostsbtn").classList.remove('active');
        document.getElementById("projects").classList.add('hidden');
        document.getElementById("projectsbtn").classList.remove('active');
        pageTitle.innerHTML = "Dev Logs";
    }
    else if (tabName == "projects") {
        document.getElementById("blogposts").classList.add('hidden');
        document.getElementById("blogpostsbtn").classList.remove('active');
        document.getElementById("devlogs").classList.add('hidden');
        document.getElementById("devlogsbtn").classList.remove('active');
        pageTitle.innerHTML = "Projects";
    }
}

const active = document.getElementById('active').innerHTML;
openTab(active);
