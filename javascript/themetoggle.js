// Theme Toggle
const themeToggles = document.querySelectorAll('.theme-toggle');
const body = document.body;

// Applies the saved or default theme
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
themeToggles.forEach(themeToggle => {
    themeToggle.innerHTML = savedTheme === 'dark-mode'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    themeToggle.style.transform = savedTheme === 'dark-mode' ? 'rotate(0deg)' : 'rotate(180deg)';
});

themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggles.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
                btn.style.transform = 'rotate(180deg)';
            });
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggles.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
                btn.style.transform = 'rotate(0deg)';
            });
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});