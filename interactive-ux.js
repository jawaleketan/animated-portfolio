// ==========================================
// Expand All Case Studies Functionality
// ==========================================
const expandAllBtn = document.getElementById('expand-all-btn');
if (expandAllBtn) {
    let allExpanded = false;
    expandAllBtn.addEventListener('click', () => {
        allExpanded = !allExpanded;
        expandAllBtn.textContent = allExpanded ? 'Collapse All Case Studies' : 'Expand All Case Studies';

        document.querySelectorAll('.case-study').forEach(caseStudy => {
            toggleCaseStudy(caseStudy, allExpanded);
        });
    });
}

// ==========================================
// Copy Email to Clipboard with Toast Notification
// ==========================================
const copyEmailLink = document.getElementById('copy-email-link');
const toast = document.getElementById('toast');

if (copyEmailLink && toast) {
    copyEmailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'jawale.ketan@gmail.com';

        navigator.clipboard.writeText(email).then(() => {
            toast.textContent = '📧 Copied email to clipboard!';
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            // Fallback
            window.location.href = `mailto:${email}`;
        });
    });
}

// ==========================================
// Interactive Skill Category Filtering
// ==========================================
const skillTabs = document.querySelectorAll('.skill-tab');
const skillCards = document.querySelectorAll('.skill-badge-card');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        skillTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });

        // Add active class to clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const category = tab.getAttribute('data-category');

        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                // Trigger smooth fade in
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
