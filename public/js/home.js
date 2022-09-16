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

typeMessage("Hi, I'm Charles!", 100, document.getElementById("welcome-text"));
