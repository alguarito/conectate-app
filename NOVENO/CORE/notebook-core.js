/* 
   CONECTATE - Notebook Core Logic (v1.0)
   Centralized Interaction System for Grade 9
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('notebook-theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = document.body.classList.contains('light-mode') ? 'bx bx-sun' : 'bx bx-moon';
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
