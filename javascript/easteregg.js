// Easter Egg
const logo = document.getElementById("footer-logo");
let clickCount = 0;
let clickTimer;

logo.addEventListener("click", () => {
    clickCount++;

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 2000);

    if (clickCount === 5) {
        const animation = document.getElementById("easter-egg-animation");
        animation.classList.remove("hidden");

        setTimeout(() => {
            window.location.href = "https://mmaffi.github.io/OLD_PORTFOLIO/index.html";
        }, 6000);
    }
});