// LearnHub - Main JavaScript File

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search courses..."]');
    if (searchInput) {
        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    window.location.href = `pages/courses.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
    
    // const searchInput = document.querySelector('input[placeholder="Search courses..."]');
    // if (searchInput) {
    //     searchInput.addEventListener('keyup', function (e) {
    //         if (e.key === 'Enter') {
    //             const searchTerm = this.value.trim();
    //             if (searchTerm) {
    //                 window.location.href = `pages/courses.html?q=${encodeURIComponent(searchTerm)}`;
    //             }
    //         }
    //     });
    // }

    // Dark mode functionality
    const html = document.documentElement;
    // Select all toggles with a common class, e.g. "dark-mode-toggle"
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');

    // Check for a saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply the saved or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        darkModeToggles.forEach(toggle => {
            toggle.checked = true;
        });
    } else {
        html.classList.remove('dark');
        darkModeToggles.forEach(toggle => {
            toggle.checked = false;
        });
    }

    // Listen for changes on each toggle and update the theme
    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            if (this.checked) {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                // Sync all toggles
                darkModeToggles.forEach(t => t.checked = true);
            } else {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                darkModeToggles.forEach(t => t.checked = false);
            }
        });
    });
});

