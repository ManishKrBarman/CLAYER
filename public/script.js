// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeLabel = document.getElementById('themeLabel');
    const themeIcon = document.getElementById('themeIcon');

    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeLabel.textContent = 'Dark Mode';
        // Change icon to sun
        themeIcon.innerHTML = '<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Light Mode';
        // Change icon to moon
        themeIcon.innerHTML = '<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>';
    }
}

// Create background animation elements
document.addEventListener('DOMContentLoaded', function () {
    createBackgroundAnimation();
    animateSections();

    // Check for viewport size changes
    window.addEventListener('resize', adjustForScreenSize);
    adjustForScreenSize();
});

function createBackgroundAnimation() {
    const bgAnimation = document.getElementById('bgAnimation');

    // Clear existing elements
    bgAnimation.innerHTML = '';

    // Add circuit lines
    const lineCount = Math.min(15, Math.floor(window.innerHeight / 40));
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDuration = `${15 + Math.random() * 10}s`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        bgAnimation.appendChild(line);
    }

    // Add circuit dots
    const dotCount = Math.min(20, Math.floor((window.innerWidth * window.innerHeight) / 10000));
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'circuit-dot';
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${3 + Math.random() * 2}s`;
        dot.style.animationDelay = `${Math.random() * 3}s`;
        bgAnimation.appendChild(dot);
    }
}

// Function to animate sections as they come into view
function animateSections() {
    const sections = document.querySelectorAll('.section');
    const statBoxes = document.querySelectorAll('.stat-box');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const phaseBoxes = document.querySelectorAll('.phase-box');

    // Intersection Observer options
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s forwards';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, options);

    // Observer for stat boxes
    const statBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'scaleUp 0.5s forwards';
                statBoxObserver.unobserve(entry.target);
            }
        });
    }, options);

    // Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s forwards';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, options);

    // Observer for phase boxes
    const phaseBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s forwards';
                phaseBoxObserver.unobserve(entry.target);
            }
        });
    }, options);

    // Apply observers to elements
    sections.forEach(section => sectionObserver.observe(section));
    statBoxes.forEach(box => statBoxObserver.observe(box));
    timelineItems.forEach(item => timelineObserver.observe(item));
    phaseBoxes.forEach(box => phaseBoxObserver.observe(box));
}

// Adjust elements based on screen size
function adjustForScreenSize() {
    const width = window.innerWidth;

    // Adjust the number of animation elements based on screen size
    createBackgroundAnimation();

    // Handle theme toggle button text
    const themeLabel = document.getElementById('themeLabel');
    if (width <= 480) {
        themeLabel.style.display = 'none';
    } else {
        themeLabel.style.display = 'inline';
    }

    // Optionally adjust font sizes for extremely small screens
    if (width <= 320) {
        document.body.style.fontSize = '12px';
    } else {
        document.body.style.fontSize = '';
    }
}