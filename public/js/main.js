window.addEventListener("scroll", (event) => {
    const nav = document.getElementById("main-nav");
    var colorMode = "dark";
    if (nav.classList.contains('navbar-light')) {
        colorMode = "light";
    }
    console.log(colorMode)
    let scroll = this.scrollY;
    if (colorMode === "dark") {
        if (scroll > 0) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }
    else {
        if (scroll > 0) {
            nav.classList.add("scrolled");
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        }
        else {
            nav.classList.remove("scrolled");
            nav.classList.add("navbar-light");
            nav.classList.remove("navbar-dark");
        }
    }
});

var loader = document.getElementById("preloader");
if (loader) {
    window.addEventListener("load", function () {
        loader.style.display = "none";
    });
}