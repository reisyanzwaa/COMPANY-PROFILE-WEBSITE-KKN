// ================================================================ */
// PROFIL MODAL - JAVASCRIPT                                        */
// ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🚀 Profil Modal loaded successfully!');

    // ============================================================ */
    // ELEMEN                                                       */
    // ============================================================ */

    const openBtn = document.getElementById('openProfileBtn');
    const modal = document.getElementById('profileModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const closeBtn2 = document.getElementById('modalCloseBtn');
    const modalInner = document.querySelector('.modal-inner');

    // ============================================================ */
    // FUNGSI - BUKA MODAL                                          */
    // ============================================================ */

    function openModal() {
        if (!modal) return;
        
        modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';
        
        console.log('✅ Modal profil dibuka');
        
        // Trigger entrance animation
        if (modalInner) {
            modalInner.style.opacity = '0';
            modalInner.style.transform = 'translateY(20px)';
            setTimeout(() => {
                modalInner.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                modalInner.style.opacity = '1';
                modalInner.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // ============================================================ */
    // FUNGSI - TUTUP MODAL                                         */
    // ============================================================ */

    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        console.log('✅ Modal profil ditutup');
    }

    // ============================================================ */
    // FUNGSI - TOAST NOTIFICATION                                  */
    // ============================================================ */

    function showToast(message, duration = 2500) {
        // Remove existing toast
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    // ============================================================ */
    // EVENT LISTENERS                                              */
    // ============================================================ */

    // ===== Buka =====
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    }

    // ===== Tutup - Overlay =====
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // ===== Tutup - Tombol Close =====
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // ===== Tutup - Tombol Tutup =====
    if (closeBtn2) {
        closeBtn2.addEventListener('click', closeModal);
    }

    // ===== Tutup - ESC =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ===== Tutup - Click Outside =====
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ============================================================ */
    // SOCIAL LINK TRACKING                                         */
    // ============================================================ */

    const socialLinks = document.querySelectorAll('.profile-social a, .profile_social_link');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const label = this.getAttribute('aria-label') || this.textContent.trim() || 'Social';
            console.log(`🔗 Mengunjungi: ${label}`);
            showToast(`🌐 Membuka ${label}...`);
        });
    });

    // ============================================================ */
    // AVATAR RING ANIMATION                                        */
    // ============================================================ */

    const avatar = document.querySelector('.profile-avatar');
    if (avatar) {
        const ring = avatar.querySelector('.avatar-ring');
        
        avatar.addEventListener('mouseenter', function() {
            if (ring) {
                ring.style.animationDuration = '4s';
                ring.style.borderTopColor = '#FDBF2D';
                ring.style.borderRightColor = '#4CAF50';
            }
        });
        
        avatar.addEventListener('mouseleave', function() {
            if (ring) {
                ring.style.animationDuration = '10s';
                ring.style.borderTopColor = '#4CAF50';
                ring.style.borderRightColor = '#FDBF2D';
            }
        });
    }

    // ============================================================ */
    // INFO ITEM HOVER EFFECT                                       */
    // ============================================================ */

    const infoItems = document.querySelectorAll('.profile-info-item');
    infoItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const svg = this.querySelector('.label svg');
            if (svg) {
                svg.style.transform = 'scale(1.1) rotate(-5deg)';
                svg.style.stroke = '#4CAF50';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const svg = this.querySelector('.label svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.stroke = '';
            }
        });
    });

    // ============================================================ */
    // KEYBOARD SHORTCUTS                                           */
    // ============================================================ */

    document.addEventListener('keydown', function(e) {
        // Ctrl + K = Buka Modal (jika ada tombol)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            if (openBtn) {
                openBtn.click();
            }
        }
        
        // Ctrl + Shift + M = Toggle Modal
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            if (modal && modal.classList.contains('active')) {
                closeModal();
            } else if (openBtn) {
                openBtn.click();
            }
        }
    });

    // ============================================================ */
    // PERFORMANCE LOG                                              */
    // ============================================================ */

    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Page load time: ${loadTime}ms`);
    }

    // ============================================================ */
    // DARK MODE DETECTION                                          */
    // ============================================================ */

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(`🌓 Dark mode: ${prefersDark.matches ? 'active' : 'inactive'}`);

    // ============================================================ */
    // EXPOSE FUNCTIONS (untuk debugging)                           */
    // ============================================================ */

    window.__profileModal = {
        open: openModal,
        close: closeModal,
        toast: showToast
    };

    console.log('✅ Profil Modal ready! Gunakan window.__profileModal untuk debugging.');
});