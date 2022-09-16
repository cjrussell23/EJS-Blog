document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball() {
    var eye = document.querySelectorAll('.eye');
    eye.forEach(function (eye) {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = 'rotate(' + rot + 'deg)';
    });
}

window.addEventListener("load", function () {
    typeMessage("Hi, I'm Charles!", 100, document.getElementById("welcome-text"), function () {
        var smile = document.getElementById("smile");
        smile.classList.remove("hidden");
    });
});

function typeMessage(message, speed, element, _callback) {
    let i = 0;
    let text = message;
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
        else {
            _callback();
        }
    }
    typeWriter();
}