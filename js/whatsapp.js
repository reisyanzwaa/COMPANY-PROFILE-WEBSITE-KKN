// ========================================
// WHATSAPP - POPUP PILIHAN ADMIN
// ========================================

// Data kontak WhatsApp - Nomor yang benar
var waContacts = [
    { name: 'Arni', phone: '6282213467792', display: '0822-1346-7792' },
    { name: 'Sri', phone: '6282112064846', display: '0821-1206-4846' }
];

// Fungsi untuk menampilkan popup
function showWaPopup(productName) {
    // Hapus popup lama jika ada
    var oldOverlay = document.getElementById('waPopupOverlay');
    if (oldOverlay) {
        oldOverlay.remove();
    }
    
    // Buat overlay
    var overlay = document.createElement('div');
    overlay.id = 'waPopupOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(8px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Buat konten popup
    var popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        border-radius: 24px;
        padding: 32px;
        max-width: 420px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 30px 80px rgba(0,0,0,0.2);
    `;
    
    // Header popup
    var buttonsHtml = '';
    for (var i = 0; i < waContacts.length; i++) {
        var contact = waContacts[i];
        buttonsHtml += `
            <button onclick="openWaChat('${contact.phone}', '${productName || ''}')" style="
                display:flex;
                align-items:center;
                gap:16px;
                padding:14px 18px;
                background:#f7f9f8;
                border:2px solid #edf0ef;
                border-radius:12px;
                cursor:pointer;
                transition:all 0.3s ease;
                width:100%;
                text-align:left;
                font-family:inherit;
                margin-bottom:10px;
            " onmouseover="this.style.background='#25D366'; this.style.borderColor='#25D366'; this.querySelector('.wa-name').style.color='white'; this.querySelector('.wa-number').style.color='rgba(255,255,255,0.8)'; this.querySelector('.wa-arrow').style.color='white'; this.querySelector('.wa-icon-bg').style.background='white'; this.querySelector('.wa-icon-bg svg').style.fill='#25D366';" 
               onmouseout="this.style.background='#f7f9f8'; this.style.borderColor='#edf0ef'; this.querySelector('.wa-name').style.color='#1a2622'; this.querySelector('.wa-number').style.color='#6b7d77'; this.querySelector('.wa-arrow').style.color='#bcc5c2'; this.querySelector('.wa-icon-bg').style.background='#25D366'; this.querySelector('.wa-icon-bg svg').style.fill='white';">
                <span class="wa-icon-bg" style="display:flex; align-items:center; justify-content:center; width:40px; height:40px; background:#25D366; border-radius:50%; flex-shrink:0; transition:all 0.3s ease;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style="transition:all 0.3s ease;">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                </span>
                <span>
                    <span class="wa-name" style="display:block; font-weight:700; color:#1a2622; font-size:1rem; transition:all 0.3s ease;">${contact.name}</span>
                    <span class="wa-number" style="font-size:0.8rem; color:#6b7d77; transition:all 0.3s ease;">${contact.display}</span>
                </span>
                <span class="wa-arrow" style="margin-left:auto; font-size:1.2rem; color:#bcc5c2; transition:all 0.3s ease;">→</span>
            </button>
        `;
    }
    
    var productText = productName ? ' produk: ' + productName : '';
    popup.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:12px; border-bottom:2px solid #f0f0f0;">
            <h3 style="font-size:1.3rem; font-weight:700; color:#1a2622; margin:0;">Pilih Admin WhatsApp</h3>
            <button onclick="closeWaPopup()" style="width:36px; height:36px; border:none; background:#f5f5f5; border-radius:50%; font-size:1.5rem; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#999;">&times;</button>
        </div>
        <p style="color:#6b7d77; font-size:0.95rem; margin-bottom:20px;">Silakan pilih admin yang ingin Anda hubungi${productText}:</p>
        <div style="display:flex; flex-direction:column; gap:0px;">
            ${buttonsHtml}
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Tutup popup dengan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeWaPopup();
    });
}

// Fungsi untuk menutup popup
function closeWaPopup() {
    var overlay = document.getElementById('waPopupOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Fungsi untuk membuka WhatsApp
function openWaChat(phone, productName) {
    var message = encodeURIComponent('Halo KWT BERSERI, saya ingin bertanya tentang produk Anda.');
    window.open('https://wa.me/' + phone + '?text=' + message, '_blank');
}

// Export ke global
window.openWaChat = openWaChat;

// ========================================
// INIT - EVENT LISTENER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Cari tombol dengan ID waOrderBtn
    var btn = document.getElementById('waOrderBtn');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var product = this.getAttribute('data-product') || '';
            showWaPopup(product);
        });
    }
    
    // Cari semua tombol dengan class btn-wa
    var buttons = document.querySelectorAll('.btn-wa, .btn-wa-order');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var product = this.getAttribute('data-product') || '';
            // Cari produk terdekat dari card
            if (!product) {
                var card = this.closest('.product-card, .slot-card');
                if (card) {
                    var title = card.querySelector('h3, .slot-card__title');
                    if (title) product = title.textContent.trim();
                }
            }
            showWaPopup(product);
        });
    }
    
    // Tombol WA di kontak
    var waBtns = document.querySelectorAll('.whatsapp-btn');
    for (var j = 0; j < waBtns.length; j++) {
        waBtns[j].addEventListener('click', function(e) {
            var phone = this.getAttribute('data-phone');
            var name = this.getAttribute('data-name') || '';
            if (phone) {
                openWaChat(phone, name);
            }
        });
    }
    
    // WhatsApp Float
    var whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            showWaPopup('');
        });
    }
});

// Export ke global
window.showWaPopup = showWaPopup;
window.closeWaPopup = closeWaPopup;
window.openWaChat = openWaChat;