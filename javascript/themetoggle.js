// Theme Toggle with Proper Class Sync & Meta Theme-Color Update
const themeToggles = document.querySelectorAll('.theme-toggle');
const body = document.body;
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

const applyTheme = (theme) => {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(theme);

    const isDark = theme === 'dark-mode';
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#07080d' : '#f8fafc');
    }

    themeToggles.forEach(btn => {
        btn.innerHTML = isDark
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
        btn.style.transform = isDark ? 'rotate(0deg)' : 'rotate(180deg)';
    });
};

// Apply saved or default theme on load
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
applyTheme(savedTheme);

themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
});
