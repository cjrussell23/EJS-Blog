window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > 0) {
        const nav = document.getElementById("main-nav");
        nav.classList.add("scrolled");
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
    }
    else {
        const nav = document.getElementById("main-nav");
        nav.classList.remove("scrolled");
        nav.classList.add("navbar-light");
        nav.classList.remove("navbar-dark");
    }
});

var loader = document.getElementById("preloader");
if (loader) {
    window.addEventListener("load", function () {
        loader.style.display = "none";
        typeMessage("Hi, I'm Charles!", 100, document.getElementById("welcome-text"));
    });
}

function typeMessage(message, speed, element) {
    let i = 0;
    let text = message;
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}