// ========================================
// MAP TOGGLE - SWITCH MAP (Google & Waze)
// ========================================

/**
 * Switch between Google Maps and Waze
 * @param {string} mapType - 'google' or 'waze'
 */
function switchMap(mapType) {
    // Get all toggle buttons
    var buttons = document.querySelectorAll('.map-toggle-btn');
    var maps = {
        google: document.getElementById('mapGoogle'),
        waze: document.getElementById('mapWaze')
    };

    // Update toggle buttons
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.map === mapType) {
            btn.classList.add('active');
        }
    });

    // Hide all maps
    for (var key in maps) {
        if (maps[key]) {
            maps[key].classList.remove('active');
        }
    }

    // Show selected map
    if (maps[mapType]) {
        maps[mapType].classList.add('active');
    }

    // Log for debugging
    console.log('Map switched to:', mapType);
}

// ========================================
// COPY COORDINATES
// ========================================

/**
 * Copy coordinates to clipboard
 */
function copyCoords() {
    var coords = '0°29\'50.4"N 117°30\'09.3"E';
    var btn = document.querySelector('.coords-copy');
    
    if (!btn) return;

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(coords)
            .then(function() {
                showCopyFeedback(btn, 'Koordinat disalin!', true);
            })
            .catch(function() {
                fallbackCopy(coords, btn);
            });
    } else {
        fallbackCopy(coords, btn);
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} btn - Button element
 */
function fallbackCopy(text, btn) {
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
            showCopyFeedback(btn, 'Koordinat disalin!', true);
        } else {
            showCopyFeedback(btn, 'Gagal menyalin', false);
        }
    } catch (err) {
        showCopyFeedback(btn, 'Gagal menyalin', false);
    }
    
    document.body.removeChild(textarea);
}

/**
 * Show feedback on copy button
 * @param {HTMLElement} btn - Button element
 * @param {string} message - Message to show
 * @param {boolean} success - Whether copy was successful
 */
function showCopyFeedback(btn, message, success) {
    // Save original content
    var originalHTML = btn.innerHTML;
    var originalBg = btn.style.background;
    var originalBorder = btn.style.borderColor;
    var originalColor = btn.style.color;
    
    // Change button appearance
    if (success) {
        btn.innerHTML = `
            <span class="copy-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </span>
            ${message}
        `;
        btn.style.background = '#2d8f5e';
        btn.style.borderColor = '#2d8f5e';
        btn.style.color = '#ffffff';
        btn.classList.add('copied');
    } else {
        btn.innerHTML = `
            <span class="copy-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            </span>
            ${message}
        `;
        btn.style.background = '#d32f2f';
        btn.style.borderColor = '#d32f2f';
        btn.style.color = '#ffffff';
    }
    
    // Show toast notification
    showToast(message, success);
    
    // Reset after 2.5 seconds
    setTimeout(function() {
        btn.innerHTML = originalHTML;
        btn.style.background = originalBg || 'transparent';
        btn.style.borderColor = originalBorder || '#e4e8e6';
        btn.style.color = originalColor || '#6b7d77';
        btn.classList.remove('copied');
    }, 2500);
}

// ========================================
// TOAST NOTIFICATION
// ========================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {boolean} success - Whether operation was successful
 */
function showToast(message, success) {
    // Remove existing toast
    var existingToast = document.querySelector('.toast-custom');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    var toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
        <span class="toast-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                ${success ? '<polyline points="20 6 9 17 4 12"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
            </svg>
        </span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    // Style toast
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: ${success ? 'rgba(10, 20, 16, 0.95)' : 'rgba(211, 47, 47, 0.95)'};
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 14px;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 500;
        box-shadow: 0 12px 48px rgba(0,0,0,0.12);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(255,255,255,0.04);
        max-width: 90%;
        pointer-events: auto;
    `;
    
    // Style icon
    var icon = toast.querySelector('.toast-icon');
    icon.style.cssText = `
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    icon.querySelector('svg').style.cssText = `
        width: 100%;
        height: 100%;
        stroke: ${success ? '#66BB6A' : '#ff6b6b'};
        fill: none;
    `;
    
    // Style close button
    var closeBtn = toast.querySelector('.toast-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: rgba(255,255,255,0.15);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
        margin-left: 4px;
    `;
    closeBtn.querySelector('svg').style.cssText = `
        width: 14px;
        height: 14px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
    `;
    closeBtn.addEventListener('mouseenter', function() {
        this.style.color = '#ffffff';
    });
    closeBtn.addEventListener('mouseleave', function() {
        this.style.color = 'rgba(255,255,255,0.15)';
    });
    
    // Add to body
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(function() {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Auto remove after 3.5 seconds
    var timeoutId = setTimeout(function() {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 500);
        }
    }, 3500);
    
    // Store timeout ID for cleanup
    toast.dataset.timeoutId = timeoutId;
    
    // Click on toast to close
    toast.addEventListener('click', function(e) {
        if (e.target.closest('.toast-close')) return;
        clearTimeout(timeoutId);
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(function() {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 500);
    });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize map with default Google Maps
 */
function initMap() {
    // Set default to Google Maps
    var defaultMap = document.getElementById('mapGoogle');
    var defaultBtn = document.querySelector('.map-toggle-btn[data-map="google"]');
    var wazeMap = document.getElementById('mapWaze');
    
    // Hide all maps first
    var allMaps = document.querySelectorAll('.map-display');
    allMaps.forEach(function(map) {
        map.classList.remove('active');
    });
    
    // Show default Google Maps
    if (defaultMap) {
        defaultMap.classList.add('active');
    }
    
    // Set default button active
    if (defaultBtn) {
        defaultBtn.classList.add('active');
    }
    
    // Hide Waze if exists
    if (wazeMap) {
        wazeMap.classList.remove('active');
    }
    
    console.log('✅ Maps initialized - Google Maps default');
}

// ========================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ========================================

window.switchMap = switchMap;
window.copyCoords = copyCoords;

// ========================================
// DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', initMap);

// ========================================
// HANDLE RESIZE FOR RESPONSIVE
// ========================================

var resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Optional: adjust map height or other responsive behavior
        console.log('📱 Map resized');
    }, 250);
});

console.log('🗺️ Maps.js loaded successfully');