// ========================================
// SEARCH FUNCTION - DIPERBAIKI
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var searchButton = document.getElementById('searchButton');
    
    if (searchInput) {
        // Search saat mengetik (real-time) - LANGSUNG FILTER
        searchInput.addEventListener('input', function() {
            if (typeof filterProducts === 'function') {
                filterProducts();
            } else {
                // Fallback jika filterProducts belum tersedia
                performSearchFallback(this.value);
            }
        });
        
        // Search saat tekan Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (typeof filterProducts === 'function') {
                    filterProducts();
                }
            }
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                if (typeof filterProducts === 'function') {
                    filterProducts();
                }
            });
        }
    }
});

// Fallback jika filterProducts belum tersedia
function performSearchFallback(query) {
    var container = document.getElementById('catalogGrid');
    if (!container) return;
    
    var cards = container.querySelectorAll('.product-card');
    var searchTerm = query.toLowerCase().trim();
    var foundCount = 0;
    
    cards.forEach(function(card) {
        var name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        var category = card.querySelector('.product-tag')?.textContent?.toLowerCase() || '';
        var description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        var show = true;
        
        if (searchTerm !== '') {
            if (!name.includes(searchTerm) && 
                !description.includes(searchTerm) && 
                !category.includes(searchTerm)) {
                show = false;
            }
        }
        
        card.style.display = show ? '' : 'none';
        if (show) foundCount++;
    });
    
    // Tampilkan pesan jika tidak ada hasil
    var existing = container.querySelector('.no-results');
    if (existing) existing.remove();
    
    if (foundCount === 0 && searchTerm !== '') {
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
        msg.innerHTML = `
            <h3 style="font-size: 1.3rem; font-weight: 700; color: #1a2622; margin-bottom: 8px;">
                Tidak ada produk yang cocok dengan "${searchTerm}"
            </h3>
            <p style="color: #6b7d77;">
                Coba gunakan kata kunci lain
            </p>
        `;
        container.appendChild(msg);
    }
}

// Export ke global
window.search = { 
    perform: function() { 
        if (typeof filterProducts === 'function') {
            filterProducts();
        }
    } 
};