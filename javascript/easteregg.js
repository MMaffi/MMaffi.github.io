// Easter Egg
const logo = document.getElementById("footer-logo");
let clickCount = 0;
let clickTimer;

logo.addEventListener("click", () => {
clickCount++;

// Reset count if 2s pass without click
clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 2000);

    // When you reach 5 clicks
    if (clickCount === 5) {
        window.location.href = "https://mmaffi.github.io/OLD_PORTFOLIO/index.html"; 
    }
});