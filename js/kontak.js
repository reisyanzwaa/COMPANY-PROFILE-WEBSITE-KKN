// ========================================
// KONTAK - JavaScript Premium
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. SWITCH MAP (Google Maps & Waze)
    // ========================================
    window.switchMap = function(type) {
        var googleMap = document.getElementById('mapGoogle');
        var wazeMap = document.getElementById('mapWaze');
        var buttons = document.querySelectorAll('.map-toggle-btn');
        
        buttons.forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.dataset.map === type) {
                btn.classList.add('active');
            }
        });
        
        if (type === 'google') {
            if (googleMap) googleMap.classList.add('active');
            if (wazeMap) wazeMap.classList.remove('active');
        } else {
            if (wazeMap) wazeMap.classList.add('active');
            if (googleMap) googleMap.classList.remove('active');
        }
        
        console.log('📍 Map switched to:', type);
    };

    // ========================================
    // 2. COPY COORDINATES
    // ========================================
    window.copyCoords = function() {
        var coords = '0°29\'50.4"N 117°30\'09.3"E';
        var button = document.querySelector('.coords-copy');
        if (!button) return;
        
        var originalHTML = button.innerHTML;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(coords)
                .then(function() {
                    showCopyFeedback(button, 'Tersalin!', true, originalHTML);
                })
                .catch(function() {
                    fallbackCopy(coords, button, originalHTML);
                });
        } else {
            fallbackCopy(coords, button, originalHTML);
        }
    };

    function fallbackCopy(text, button, originalHTML) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            var success = document.execCommand('copy');
            if (success) {
                showCopyFeedback(button, 'Tersalin!', true, originalHTML);
            } else {
                showCopyFeedback(button, 'Gagal salin', false, originalHTML);
            }
        } catch (e) {
            showCopyFeedback(button, 'Gagal salin', false, originalHTML);
        }
        
        document.body.removeChild(textarea);
    }

    function showCopyFeedback(button, message, success, originalHTML) {
        if (success) {
            button.innerHTML = 
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
                    '<polyline points="20 6 9 17 4 12"/>' +
                '</svg> ' + message;
            button.style.background = '#2d8f5e';
            button.style.borderColor = '#2d8f5e';
            button.style.color = '#ffffff';
        } else {
            button.innerHTML = 
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '<circle cx="12" cy="12" r="10"/>' +
                    '<line x1="12" y1="8" x2="12" y2="12"/>' +
                    '<line x1="12" y1="16" x2="12.01" y2="16"/>' +
                '</svg> ' + message;
            button.style.background = '#d32f2f';
            button.style.borderColor = '#d32f2f';
            button.style.color = '#ffffff';
        }
        
        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.style.background = 'transparent';
            button.style.borderColor = '#e8edeb';
            button.style.color = '#4a5a54';
        }, 2500);
    }

    // ========================================
    // 3. WHATSAPP CHAT
    // ========================================
    window.openWaChat = function(number, message) {
        var url = 'https://wa.me/' + number;
        if (message && message.trim() !== '') {
            url += '?text=' + encodeURIComponent(message);
        }
        window.open(url, '_blank');
    };

    // ========================================
    // 4. SCROLL ANIMATION (Fade Up)
    // ========================================
    function initScrollAnimation() {
        var fadeElements = document.querySelectorAll('.fade-up');
        
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var delay = parseInt(el.dataset.delay) || 0;
                        setTimeout(function() {
                            el.classList.add('visible');
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, delay * 100);
                        observer.unobserve(el);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            fadeElements.forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
                observer.observe(el);
            });
        } else {
            fadeElements.forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }

    // ========================================
    // 5. RESPONSIVE MAP HEIGHT
    // ========================================
    function adjustMapHeight() {
        var iframes = document.querySelectorAll('.map-display iframe');
        var width = window.innerWidth;
        var height = 420;
        
        if (width < 480) height = 200;
        else if (width < 768) height = 280;
        else if (width < 1024) height = 360;
        
        iframes.forEach(function(iframe) {
            iframe.style.height = height + 'px';
        });
    }

    // ========================================
    // 6. BACK TO TOP
    // ========================================
    function initBackToTop() {
        var backBtn = document.getElementById('backToTop');
        if (!backBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        });
        
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // 7. RESPONSIVE QUICK CONTACT
    // ========================================
    function initQuickContact() {
        var wrapper = document.querySelector('.quick-contact-wrapper');
        if (!wrapper) return;
        
        var items = wrapper.querySelectorAll('.quick-contact-item');
        var dividers = wrapper.querySelectorAll('.quick-contact-divider');
        
        function checkMobile() {
            var isMobile = window.innerWidth < 768;
            if (isMobile) {
                items.forEach(function(item, index) {
                    if (index > 0) {
                        item.style.borderTop = '1px solid #edf0ef';
                        item.style.paddingTop = '12px';
                        item.style.marginTop = '4px';
                    }
                });
                dividers.forEach(function(div) {
                    div.style.display = 'none';
                });
            } else {
                items.forEach(function(item) {
                    item.style.borderTop = 'none';
                    item.style.paddingTop = '12px';
                    item.style.marginTop = '0';
                });
                dividers.forEach(function(div) {
                    div.style.display = 'block';
                });
            }
        }
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
    }

    // ========================================
    // 8. INIT
    // ========================================
    function init() {
        console.log('🔄 Kontak page initialized');
        
        // Set default map
        var defaultMap = document.getElementById('mapGoogle');
        var defaultBtn = document.querySelector('.map-toggle-btn[data-map="google"]');
        if (defaultMap) defaultMap.classList.add('active');
        if (defaultBtn) defaultBtn.classList.add('active');
        
        // Jalankan semua fungsi
        initScrollAnimation();
        adjustMapHeight();
        initBackToTop();
        initQuickContact();
        
        // Event listener resize untuk map
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(adjustMapHeight, 200);
        });
        
        console.log('✅ All functions initialized');
    }

    init();

    // ========================================
    // 9. EXPOSE GLOBAL FUNCTIONS
    // ========================================
    window.switchMap = switchMap;
    window.copyCoords = copyCoords;
    window.openWaChat = openWaChat;

});

console.log('📄 kontak.js loaded successfully');