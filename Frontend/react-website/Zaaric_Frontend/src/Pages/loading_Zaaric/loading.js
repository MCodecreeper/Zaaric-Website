// Initialize progress bar animation
const progressBar = document.querySelector('.loading-progress');
progressBar.style.animation = 'progress 2.5s ease-in-out forwards';

// Initialize logo animations
const logoContainer = document.querySelector('.logo-container');
const logoCircle = document.querySelector('.logo-circle');
const logoText = document.querySelector('.logo-text');

// Apply animations
logoContainer.style.animation = 'fadeIn 1s ease forwards';
logoCircle.style.animation = 'rotate 2s linear infinite';
logoText.style.animation = 'fadeIn 1s ease forwards 0.5s';

// Initialize loading bar container animation
const loadingBar = document.querySelector('.loading-bar');
loadingBar.style.animation = 'expandLine 1s ease forwards';

document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading time
    setTimeout(() => {
        // Add fade out animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Redirect to main page after animation
        setTimeout(() => {
            window.location.href = 'index.html'; // Replace with your main page URL
        }, 500);
    }, 7000); // Adjust time as needed
});