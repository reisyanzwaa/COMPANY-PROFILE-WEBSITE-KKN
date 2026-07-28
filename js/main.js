// ========================================
// PRELOADER - TUTUP SAAT HALAMAN SIAP
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🚀 Website loaded successfully!');

    // ===== PRELOADER =====
    var preloader = document.getElementById('preloader');
    if (preloader) {
        var fill = document.getElementById('preloaderFill');
        if (fill) {
            var progress = 0;
            var interval = setInterval(function() {
                progress += 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    preloader.classList.add('hidden');
                    setTimeout(function() {
                        preloader.style.display = 'none';
                    }, 500);
                }
                fill.style.width = progress + '%';
            }, 20);
        } else {
            setTimeout(function() {
                preloader.classList.add('hidden');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);
        }
    }

    // ===== NAVBAR SCROLL =====
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== MENU TOGGLE =====
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        
        // Tutup menu saat link diklik
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== BACK TO TOP =====
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== ANIMASI COUNTER (METRIC) =====
    var metricNumbers = document.querySelectorAll('.metric-number');
    if (metricNumbers.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-count')) || 0;
                    var current = 0;
                    var increment = Math.ceil(target / 30);
                    var timer = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current;
                    }, 30);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        metricNumbers.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ===== TUTUP MOBILE MENU SAAT KLIK DI LUAR =====
    document.addEventListener('click', function(e) {
        if (navLinks && menuToggle && navbar) {
            var isClickInside = navbar.contains(e.target);
            if (!isClickInside && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        }
    });

    console.log('✅ All systems ready!');
});

// ========================================
// MAP TOGGLE - SWITCH MAP (Google & Waze)
// ========================================
function switchMap(mapType) {
    var buttons = document.querySelectorAll('.map-toggle-btn');
    var maps = {
        google: document.getElementById('mapGoogle'),
        waze: document.getElementById('mapWaze')
    };

    buttons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.map === mapType) {
            btn.classList.add('active');
        }
    });

    for (var key in maps) {
        if (maps[key]) {
            maps[key].classList.remove('active');
        }
    }

    if (maps[mapType]) {
        maps[mapType].classList.add('active');
    }
}

// ========================================
// COPY KOORDINAT
// ========================================
function copyCoords() {
    var coords = '0°29\'50.4"N 117°30\'09.3"E';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(coords).then(function() {
            showCopyFeedback('Koordinat disalin!');
        }).catch(function() {
            fallbackCopy(coords);
        });
    } else {
        fallbackCopy(coords);
    }
}

function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback('Koordinat disalin!');
    } catch (err) {
        showCopyFeedback('Gagal menyalin');
    }
    document.body.removeChild(textarea);
}

function showCopyFeedback(message) {
    var btn = document.querySelector('.coords-copy');
    if (!btn) return;
    
    var originalText = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ' + message;
    btn.style.background = '#2d8f5e';
    btn.style.borderColor = '#2d8f5e';
    btn.style.color = '#ffffff';
    
    setTimeout(function() {
        btn.innerHTML = originalText;
        btn.style.background = 'transparent';
        btn.style.borderColor = '#e2e6e4';
        btn.style.color = '#4a5a54';
    }, 2000);
}

// Export ke global
window.switchMap = switchMap;
window.copyCoords = copyCoords;