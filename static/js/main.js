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
                    sessionStorage.setItem('searchTerm', searchTerm);
                    window.location.href = `courses`
                }
            }
        });
    }

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

    // courses detail
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            tabContents.forEach(content => content.classList.add('hidden'));

            // Add active class to clicked tab
            button.classList.add('active-tab');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
});

