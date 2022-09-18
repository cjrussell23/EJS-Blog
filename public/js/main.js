const nav = document.getElementById("main-nav");
var colorMode = "dark";
if (nav.classList.contains('navbar-light')) {
    colorMode = "light";
}
window.addEventListener("scroll", (event) => {
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

// For testing sizing
function checkSize() {
    const sm = 576;
    const md = 768;
    const lg = 992;
    const xl = 1200;
    const xxl = 1400;
    var width = window.innerWidth;
    console.log(width);
    var size = "xs";
    if (width >= xxl) {
        size = "xxl";
    }
    else if (width >= xl) {
        size = "xl";
    }
    else if (width >= lg) {
        size = "lg";
    }
    else if (width >= md) {
        size = "md";
    }
    else if (width >= sm) {
        size = "sm";
    }
    else {
        size = "xs";
    }
    console.log(size);
}