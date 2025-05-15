document.addEventListener('DOMContentLoaded', function () {

    // Connect the header search to the main search functionality
    const headerSearchInput = document.querySelector('nav input[placeholder="Search courses..."]');
    const mainSearchInput = document.getElementById('course-search');

    if (headerSearchInput && mainSearchInput) {
        headerSearchInput.addEventListener('input', function () {
            mainSearchInput.value = this.value;
            // Trigger the search event
            mainSearchInput.dispatchEvent(new Event('input'));
        });
    }

    // Course filtering functionality
    const courseCards = document.querySelectorAll('.course-card');
    const categoryCheckboxes = document.querySelectorAll('input[data-category]');
    const levelCheckboxes = document.querySelectorAll('input[data-level]');
    const durationCheckboxes = document.querySelectorAll('input[data-duration]');
    const searchInput = document.getElementById('course-search');
    const sortSelect = document.getElementById('sort-by');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const noResultsDiv = document.getElementById('no-results');
    const courseCountSpan = document.getElementById('course-count');
    const loadMoreBtn = document.getElementById('load-more');

    // Initial setup - show only first 6 courses
    let visibleCourses = 6;
    updateCourseVisibility();

    // Function to check if a course matches the current filters
    function courseMatchesFilters(card) {
        // Get selected filters
        const selectedCategories = getSelectedValues(categoryCheckboxes, 'data-category');
        const selectedLevels = getSelectedValues(levelCheckboxes, 'data-level');
        const selectedDurations = getSelectedValues(durationCheckboxes, 'data-duration');
        const searchTerm = searchInput?.value.toLowerCase() || '';

        // Course properties
        const category = card.getAttribute('data-category');
        const level = card.getAttribute('data-level');
        const duration = card.getAttribute('data-duration');
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';

        // Check if the course matches all filters
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(level);
        const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(duration);
        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);

        return matchesCategory && matchesLevel && matchesDuration && matchesSearch;
    }

    // Helper function to get selected checkbox values
    function getSelectedValues(checkboxes, dataAttribute) {
        const selected = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(checkbox.getAttribute(dataAttribute));
            }
        });
        return selected;
    }

    // Function to update which courses are visible
    function updateCourseVisibility() {
        let matchingCourses = 0;
        let visibleCount = 0;

        courseCards.forEach(card => {
            const matches = courseMatchesFilters(card);

            if (matches) {
                matchingCourses++;
                if (matchingCourses <= visibleCourses) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            } else {
                card.classList.add('hidden');
            }
        });

        // Update course count
        if (courseCountSpan) {
            courseCountSpan.textContent = matchingCourses;
        }

        // Show/hide no results message
        if (noResultsDiv) {
            if (matchingCourses === 0) {
                noResultsDiv.classList.remove('hidden');
            } else {
                noResultsDiv.classList.add('hidden');
            }
        }

        // Show/hide load more button
        if (loadMoreBtn) {
            if (visibleCount < matchingCourses) {
                loadMoreBtn.classList.remove('hidden');
            } else {
                loadMoreBtn.classList.add('hidden');
            }
        }
    }

    // Sort courses
    function sortCourses() {
        if (!sortSelect) return;

        const sortValue = sortSelect.value;
        const courseGrid = document.querySelector('.grid');
        if (!courseGrid) return;

        const courses = Array.from(courseCards);

        courses.sort((a, b) => {
            const titleA = a.querySelector('h3')?.textContent || '';
            const titleB = b.querySelector('h3')?.textContent || '';

            switch (sortValue) {
                case 'az':
                    return titleA.localeCompare(titleB);
                case 'za':
                    return titleB.localeCompare(titleA);
                case 'newest':
                    // This would normally use a date attribute, but we'll just
                    // reverse the default order for demonstration purposes
                    return -1;
                case 'popular':
                default:
                    // For the demo, we'll use the original order
                    return 0;
            }
        });

        // Remove existing courses
        courses.forEach(course => {
            if (courseGrid.contains(course)) {
                courseGrid.removeChild(course);
            }
        });

        // Add sorted courses back
        courses.forEach(course => courseGrid.appendChild(course));

        // Re-apply visibility
        updateCourseVisibility();
    }

    // Event listeners for filters
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            visibleCourses = 6; // Reset visible count when filters change
            updateCourseVisibility();
        });
    });

    levelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            visibleCourses = 6;
            updateCourseVisibility();
        });
    });

    durationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            visibleCourses = 6;
            updateCourseVisibility();
        });
    });

    // Search functionality
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                visibleCourses = 6;
                updateCourseVisibility();
            }, 300);
        });
    }

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', sortCourses);
    }

    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            // Uncheck all checkboxes
            categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
            levelCheckboxes.forEach(checkbox => checkbox.checked = false);
            durationCheckboxes.forEach(checkbox => checkbox.checked = false);

            // Clear search
            if (searchInput) searchInput.value = '';
            if (headerSearchInput) headerSearchInput.value = '';

            // Reset sort
            if (sortSelect) sortSelect.value = 'popular';

            // Reset visible courses count
            visibleCourses = 6;

            // Update display
            updateCourseVisibility();
            sortCourses();
        });
    }

    // Clear filters button (from no results message)
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (resetFiltersBtn) resetFiltersBtn.click();
        });
    }

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCourses += 6;
            updateCourseVisibility();
        });
    }
});

