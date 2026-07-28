// ========================================
// BANNER SLIDESHOW - AUTO PLAY
// ========================================

let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slideshow__slide');
const dots = document.querySelectorAll('.banner-slideshow__dot');
let slideInterval;
let isPlaying = true;

// ===== TAMPILKAN SLIDE =====
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    
    currentSlide = index;
}

// ===== PINDAH SLIDE =====
function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
}

// ===== LANGSUNG KE SLIDE =====
function goToSlide(index) {
    showSlide(index);
    resetAutoPlay();
}

// ===== AUTO PLAY =====
function resetAutoPlay() {
    clearInterval(slideInterval);
    if (isPlaying) startAutoPlay();
}

function startAutoPlay() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) showSlide(0);
    startAutoPlay();
    
    // Hover pause
    const container = document.querySelector('.banner-slideshow__container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(slideInterval));
        container.addEventListener('mouseleave', () => {
            if (isPlaying) startAutoPlay();
        });
    }
    
    // Keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { changeSlide(-1); resetAutoPlay(); }
        if (e.key === 'ArrowRight') { changeSlide(1); resetAutoPlay(); }
    });
});

window.changeSlide = changeSlide;
window.goToSlide = goToSlide;