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
        var learnMore = document.getElementById("learn-more");
        smile.classList.remove("hidden");
        // wait 1 second before bounce
        async function delayBounce() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            learnMore.classList.add("bounce"); 
        }
        delayBounce();
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