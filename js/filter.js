// ========================================
// FILTER DROPDOWN - DIPERBAIKI
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    var trigger = document.getElementById('filterTrigger');
    var dropdown = document.getElementById('filterDropdown');
    var closeBtn = document.getElementById('dropdownClose');
    var options = document.querySelectorAll('.filter-option');
    var label = document.querySelector('.filter-label');

    // Toggle dropdown
    if (trigger) {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            trigger.classList.toggle('active');
            dropdown.classList.toggle('open');
            document.body.style.overflow = dropdown.classList.contains('open') ? 'hidden' : '';
        });
    }

    // Close dropdown
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            trigger.classList.remove('active');
            dropdown.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
        var wrapper = document.querySelector('.filter-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            trigger.classList.remove('active');
            dropdown.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Select option
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            var value = this.dataset.value;
            var text = this.textContent.trim();
            
            // Update label
            if (label) label.textContent = text;
            
            // Update active state
            options.forEach(function(opt) { opt.classList.remove('active'); });
            this.classList.add('active');
            
            // Close dropdown
            trigger.classList.remove('active');
            dropdown.classList.remove('open');
            document.body.style.overflow = '';
            
            // Apply filter - PANGGIL filterProducts dari produk.js
            if (typeof filterProducts === 'function') {
                filterProducts();
            } else {
                // Fallback
                applyFilterFallback(value);
            }
        });
    });
});

// Fallback jika filterProducts belum tersedia
function applyFilterFallback(category) {
    var container = document.getElementById('catalogGrid');
    if (!container) return;
    
    var cards = container.querySelectorAll('.product-card');
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var foundCount = 0;
    
    cards.forEach(function(card) {
        var cardCategory = card.querySelector('.product-tag')?.textContent?.toLowerCase() || '';
        var cardName = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        var cardDesc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        var show = true;
        
        if (category !== 'all') {
            var labels = {
                'jamur': 'Jamur',
                'pertanian': 'Pertanian',
                'perikanan': 'Perikanan',
                'peternakan': 'Peternakan',
                'olahan': 'Olahan'
            };
            var categoryLabel = (labels[category] || category).toLowerCase();
            if (!cardCategory.includes(categoryLabel)) {
                show = false;
            }
        }
        
        if (show && searchTerm !== '') {
            if (!cardName.includes(searchTerm) && 
                !cardDesc.includes(searchTerm) && 
                !cardCategory.includes(searchTerm)) {
                show = false;
            }
        }
        
        card.style.display = show ? '' : 'none';
        if (show) foundCount++;
    });
    
    // Tampilkan pesan jika tidak ada hasil
    var existing = container.querySelector('.no-results');
    if (existing) existing.remove();
    
    if (foundCount === 0) {
        var msg = document.createElement('div');
        msg.className = 'no-results';
        msg.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            background: #f7f9f8;
            border-radius: 20px;
            border: 1px solid #edf0ef;
        `;
        
        var labels = {
            'jamur': 'Jamur',
            'pertanian': 'Pertanian',
            'perikanan': 'Perikanan',
            'peternakan': 'Peternakan',
            'olahan': 'Olahan',
            'all': 'Semua Kategori'
        };
        var categoryName = labels[category] || category;
        
        var message = 'Tidak ada produk yang ditemukan';
        if (category !== 'all' && searchTerm) {
            message = 'Tidak ada produk di kategori ' + categoryName + ' yang cocok dengan "' + searchTerm + '"';
        } else if (category !== 'all') {
            message = 'Tidak ada produk di kategori ' + categoryName;
        } else if (searchTerm) {
            message = 'Tidak ada produk yang cocok dengan "' + searchTerm + '"';
        }
        
        msg.innerHTML = `
            <h3 style="font-size: 1.3rem; font-weight: 700; color: #1a2622; margin-bottom: 8px;">
                ${message}
            </h3>
            <p style="color: #6b7d77;">
                Coba gunakan kata kunci lain atau pilih kategori yang berbeda
            </p>
        `;
        container.appendChild(msg);
    }
}

// Export ke global
window.filter = { 
    apply: function() { 
        if (typeof filterProducts === 'function') {
            filterProducts();
        }
    } 
};