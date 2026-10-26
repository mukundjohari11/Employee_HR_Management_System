/**
 * HRMS Dashboard Controller
 * Handles dynamic greetings, counter animations, chart year switcher, and real-time table filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting & Current Date
    const welcomeH1 = document.querySelector('.welcome h1');
    const dateSpan = document.querySelector('.top-actions .date span');

    if (welcomeH1) {
        const hour = new Date().getHours();
        let greeting = 'Good Morning';
        if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
        else if (hour >= 17) greeting = 'Good Evening';
        welcomeH1.innerHTML = `${greeting}, Admin! 👋`;
    }

    if (dateSpan) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateSpan.textContent = new Date().toLocaleDateString('en-GB', options);
    }

    // 2. Animated Stats Counters
    const statCards = document.querySelectorAll('.stat-card h2');
    statCards.forEach((heading) => {
        const text = heading.textContent.trim();
        // If it's a plain integer (e.g. 248, 229, 12)
        if (/^\d+$/.test(text)) {
            const target = parseInt(text, 10);
            let current = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                heading.textContent = current;
            }, 25);
        }
    });

    // 3. Real-time Search Filter for Recent Employees Table
    const searchInput = document.getElementById('recentSearch');
    const tableBody = document.querySelector('.table-container tbody');

    if (searchInput && tableBody) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            const rows = tableBody.querySelectorAll('tr:not(.no-results-row)');
            let visibleCount = 0;

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Handle no results row
            let noResults = tableBody.querySelector('.no-results-row');
            if (visibleCount === 0) {
                if (!noResults) {
                    noResults = document.createElement('tr');
                    noResults.className = 'no-results-row';
                    noResults.innerHTML = `
                        <td colspan="5" style="text-align: center; padding: 24px; color: #64748b;">
                            <i class="fas fa-search" style="font-size: 20px; margin-bottom: 8px; display: block;"></i>
                            No employees found matching "${query}"
                        </td>
                    `;
                    tableBody.appendChild(noResults);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }

    // 4. Interactive Chart Year Selector
    const chartSelect = document.querySelector('.chart-header select');
    const chartBars = document.querySelectorAll('.chart .bar-group .bar');

    if (chartSelect && chartBars.length > 0) {
        chartSelect.addEventListener('change', (e) => {
            const selectedYear = e.target.value;
            HRMS_UI.showToast(`Updated chart metrics for ${selectedYear}`, 'info');

            // Animate height change based on year
            chartBars.forEach((bar, index) => {
                const randomHeight = Math.floor(Math.random() * 60) + 35;
                bar.style.transition = 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.height = `${randomHeight}%`;
            });
        });
    }

    // 5. Notification Bell Toggle
    const notifBtn = document.querySelector('.top-actions .notification');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            HRMS_UI.showToast('You have 3 unread payroll and leave notifications', 'info');
        });
    }
});
