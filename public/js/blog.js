function openTab(tabName) {
    // Open tab
    let tabToOpen = document.getElementById(tabName);
    let btn = document.getElementById(tabName + "btn");
    tabToOpen.classList.remove('hidden');
    btn.classList.add('active');
    // Close the other tab
    let tabToClose = document.getElementById(tabName == "blogposts" ? "devlogs" : "blogposts");
    let btnToClose = document.getElementById(tabName == "blogposts" ? "devlogsbtn" : "blogpostsbtn");
    tabToClose.classList.add('hidden');
    btnToClose.classList.remove('active');
}