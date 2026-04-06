/* 
   CONECTATE - Notebook Core Logic (v1.0)
   Centralized Interaction System for Grade 9
*/

document.addEventListener('DOMContentLoaded', () => {
    const themes = ['default', 'light-mode', 'theme-cyber', 'theme-aurora', 'theme-eink'];
    const themeIcons = ['bx-moon', 'bx-sun', 'bx-terminal', 'bx-planet', 'bx-book-reader'];
    let currentThemeIndex = 0;

    const themeBtn = document.getElementById('notebook-theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentClass = themes[currentThemeIndex];
            if (currentClass !== 'default') {
                document.body.classList.remove(currentClass);
                document.documentElement.classList.remove(currentClass); // For html tag
            }

            currentThemeIndex = (currentThemeIndex + 1) % themes.length;

            const nextClass = themes[currentThemeIndex];
            if (nextClass !== 'default') {
                document.body.classList.add(nextClass);
                document.documentElement.classList.add(nextClass); // html tag background handling
            }

            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = `bx ${themeIcons[currentThemeIndex]}`;
            }
        });
    }

    // 2. Preloader Removal
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }
    });
});

// 3. Concept Card Toggle (Global scope for onclick attributes)
function toggleDesc(element) {
    const desc = element.querySelector('.concept-desc');
    const icon = element.querySelector('i');
    if (desc) {
        if (desc.style.display === 'block') {
            desc.style.display = 'none';
            if(icon) icon.className = 'bx bx-plus';
        } else {
            desc.style.display = 'block';
            if(icon) icon.className = 'bx bx-minus';
        }
    }
}
