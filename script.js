// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme on load
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        currentTheme = 'dark';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        currentTheme = 'light';
    }
    localStorage.setItem('theme', currentTheme);
});

// Animate on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

const animateOnScroll = () => {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('show');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Trigger skill chart animation once
let chartAnimated = false;

function createSkillsChart() {
    const chartContainer = document.getElementById('skillsChart');
    chartContainer.innerHTML = ''; // clear any existing chart

    const skills = [
        { name: 'SQL', value: 90 },
        { name: 'Python', value: 85 },
        { name: 'Data Viz', value: 95 },
        { name: 'Stats', value: 80 },
        { name: 'ML', value: 75 }
    ];

    const colors = [
        '#3a86ff',
        '#8338ec',
        '#ff006e',
        '#fb5607',
        '#ffbe0b'
    ];

    skills.forEach((skill, index) => {
        const size = 100;

        // Create skill circle
        const circle = document.createElement('div');
        circle.className = 'chart-circle';
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.background = `conic-gradient(${colors[index]} 0% 0%, rgba(255,255,255,0.1) 0% 100%)`;
        circle.dataset.value = skill.value;
        circle.dataset.name = skill.name;

        // Center percentage label
        const percentLabel = document.createElement('div');
        percentLabel.style.position = 'absolute';
        percentLabel.style.top = '50%';
        percentLabel.style.left = '50%';
        percentLabel.style.transform = 'translate(-50%, -50%)';
        percentLabel.style.fontSize = '0.9rem';
        percentLabel.style.fontWeight = 'bold';
        percentLabel.style.color = 'black';
        percentLabel.textContent = '0%';

        circle.appendChild(percentLabel);
        chartContainer.appendChild(circle);

        // Animate fill and percentage
        circle.animateSkill = () => {
            let progress = 0;
            const interval = setInterval(() => {
                if (progress >= skill.value) {
                    clearInterval(interval);
                } else {
                    progress++;
                    circle.style.background = `conic-gradient(${colors[index]} 0% ${progress}%, rgba(255,255,255,0.1) ${progress}% 100%)`;
                    percentLabel.textContent = `${progress}%`;
                }
            }, 10);
        };
    });
}

// Run animation when skill section scrolls into view
function triggerSkillsChartAnimation() {
    if (chartAnimated) return;
    const chart = document.getElementById('skillsChart');
    const top = chart.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
        chartAnimated = true;
        [...chart.children].forEach(c => c.animateSkill?.());
    }
}

window.addEventListener('scroll', triggerSkillsChartAnimation);
window.addEventListener('load', () => {
    createSkillsChart();
    triggerSkillsChartAnimation();
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
