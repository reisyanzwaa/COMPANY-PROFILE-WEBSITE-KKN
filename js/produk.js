// ========================================
// PRODUCT DATA
// ========================================
const products = [
    { id: 1, name: 'Jamur Tiram Segar', category: 'jamur', description: 'Jamur tiram segar berkualitas tinggi, dibudidayakan secara organik.', image: 'img/jamur/Jamur tiram segar.png' },
    { id: 2, name: 'Ikan Nila Segar', category: 'perikanan', description: 'Ikan nila segar dari kolam budidaya berkualitas.', image: 'img/perikanan/Ikan Nila Segar.png' },
    { id: 3, name: 'Keripik Jamur Tiram Original', category: 'olahan', description: 'Keripik jamur tiram renyah dengan rasa original yang gurih.', image: 'img/olahan/Keripik jamur tiram rasa original.png' },
    { id: 4, name: 'Keripik Jamur Tiram Balado', category: 'olahan', description: 'Keripik jamur tiram pedas dengan bumbu balado khas.', image: 'img/olahan/Keripik jamur tiram rasa balado.png' },
    { id: 5, name: 'Keripik Jamur Tiram Coklat', category: 'olahan', description: 'Keripik jamur tiram dengan rasa coklat manis dan renyah.', image: 'img/olahan/Keripik jamur tiram rasa coklat.png' },
    { id: 6, name: 'Keripik Jamur Tiram Jagung Bakar', category: 'olahan', description: 'Keripik jamur tiram dengan rasa jagung bakar yang gurih.', image: 'img/olahan/Keripik jamur tiram rasa jagung bakar.png' },
    { id: 7, name: 'Sambal Jamur Tiram', category: 'olahan', description: 'Sambal pedas berbahan dasar jamur tiram dengan cita rasa khas.', image: 'img/produk/Sambal jamur tiram.png' },
    { id: 8, name: 'Madu Kelulut', category: 'olahan', description: 'Madu kelulut murni dengan khasiat tinggi untuk kesehatan.', image: 'img/produk/Madu kelulut murni 100 ml.png' }
];

// ========================================
// RENDER PRODUCTS
// ========================================
function renderProducts(productsData, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    
    // Cegah render ganda - hapus child sebelum render
    container.innerHTML = '';
    
    productsData.forEach(function(product, index) {
        var card = document.createElement('div');
        card.className = 'product-card fade-up';
        card.style.animationDelay = (index * 0.05) + 's';
        
        var isKeripik = product.id >= 3 && product.id <= 6;
        var varianRasa = '';
        var varianBadge = '';
        if (isKeripik) {
            var rasa = product.name.replace('Keripik Jamur Tiram ', '');
            varianRasa = `<span class="product-varian">${rasa}</span>`;
            varianBadge = 'Varian Rasa';
        }
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge ${isKeripik ? 'product-badge--varian' : ''}">${isKeripik ? varianBadge : 'Populer'}</span>
            </div>
            <div class="product-body">
                <span class="product-tag">${getCategoryLabel(product.category)}</span>
                ${varianRasa}
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-actions">
                    <a href="detail_produk.html?id=${product.id}" class="btn-primary btn-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Lihat Detail
                    </a>
                    <button class="btn-wa btn-sm" onclick="showWaPopup('${product.name}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                        </svg>
                        Pesan via WhatsApp
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Animasi fade-up
    requestAnimationFrame(function() {
        container.querySelectorAll('.fade-up').forEach(function(el, i) {
            setTimeout(function() {
                el.classList.add('visible');
            }, i * 50 + 100);
        });
    });
}

// ========================================
// HELPERS
// ========================================
function getCategoryLabel(category) {
    var labels = {
        'jamur': 'Jamur',
        'pertanian': 'Pertanian',
        'perikanan': 'Perikanan',
        'peternakan': 'Peternakan',
        'olahan': 'Olahan'
    };
    return labels[category] || category;
}

function getProductById(id) {
    return products.find(function(p) { return p.id === parseInt(id); });
}

function getProductsByCategory(category) {
    if (category === 'all' || !category) return products;
    return products.filter(function(p) { return p.category === category; });
}

function getRelatedProducts(productId, limit) {
    if (limit === undefined) limit = 4;
    var product = getProductById(productId);
    if (!product) return [];
    
    var related = products.filter(function(p) { 
        return p.id !== productId && p.category === product.category; 
    });
    
    return related.slice(0, limit);
}

// ========================================
// FILTER FUNCTION
// ========================================
function filterProducts() {
    var container = document.getElementById('catalogGrid');
    if (!container) return;
    
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    var activeFilter = document.querySelector('.filter-option.active');
    var category = activeFilter ? activeFilter.dataset.value : 'all';
    
    // Filter product cards
    var cards = container.querySelectorAll('.product-card');
    var foundCount = 0;
    
    cards.forEach(function(card) {
        var categoryTag = card.querySelector('.product-tag')?.textContent?.toLowerCase() || '';
        var nameTag = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        var descTag = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        var show = true;
        
        if (category !== 'all') {
            var categoryLabel = getCategoryLabel(category).toLowerCase();
            if (!categoryTag.includes(categoryLabel)) {
                show = false;
            }
        }
        
        if (show && searchTerm !== '') {
            if (!nameTag.includes(searchTerm) && 
                !descTag.includes(searchTerm) && 
                !categoryTag.includes(searchTerm)) {
                show = false;
            }
        }
        
        card.style.display = show ? '' : 'none';
        if (show) foundCount++;
    });
    
    // Filter slot cards
    var slotCards = document.querySelectorAll('.slot-card');
    var slotContainer = document.querySelector('.slot-cards');
    var slotFoundCount = 0;
    
    if (slotContainer) {
        slotCards.forEach(function(card) {
            var categoryTag = card.querySelector('.slot-card__category')?.textContent?.toLowerCase() || '';
            var nameTag = card.querySelector('.slot-card__title')?.textContent?.toLowerCase() || '';
            var descTag = card.querySelector('.slot-card__description')?.textContent?.toLowerCase() || '';
            
            var show = true;
            
            if (category !== 'all') {
                var categoryLabel = getCategoryLabel(category).toLowerCase();
                if (!categoryTag.includes(categoryLabel)) {
                    show = false;
                }
            }
            
            if (show && searchTerm !== '') {
                if (!nameTag.includes(searchTerm) && 
                    !descTag.includes(searchTerm) && 
                    !categoryTag.includes(searchTerm)) {
                    show = false;
                }
            }
            
            card.style.display = show ? '' : 'none';
            if (show) slotFoundCount++;
        });
        
        slotContainer.style.display = (slotFoundCount > 0) ? '' : 'none';
    }
    
    // Show no results
    showNoResults(foundCount + slotFoundCount, category, searchTerm);
}

function showNoResults(foundCount, category, searchTerm) {
    var container = document.getElementById('catalogGrid');
    if (!container) return;
    
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
        
        var message = 'Tidak ada produk yang ditemukan';
        if (category !== 'all' && searchTerm) {
            message = 'Tidak ada produk di kategori ' + getCategoryLabel(category) + ' yang cocok dengan "' + searchTerm + '"';
        } else if (category !== 'all') {
            message = 'Tidak ada produk di kategori ' + getCategoryLabel(category);
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

// ========================================
// DETAIL PRODUCT
// ========================================
function loadProductDetail() {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'katalog.html';
        return;
    }
    
    var product = getProductById(productId);
    if (!product) {
        window.location.href = 'katalog.html';
        return;
    }
    
    var img = document.getElementById('productImage');
    if (img) {
        img.src = product.image;
        img.alt = product.name;
    }
    
    var name = document.getElementById('productName');
    if (name) name.textContent = product.name;
    
    var cat = document.getElementById('productCategory');
    if (cat) cat.textContent = getCategoryLabel(product.category);
    
    var desc = document.getElementById('productDescription');
    if (desc) desc.textContent = product.description;
    
    var related = getRelatedProducts(productId);
    renderProducts(related, 'relatedGrid');
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateCatalogStats() {
    var totalEl = document.getElementById('totalProducts');
    var catEl = document.getElementById('totalCategories');
    
    if (totalEl) totalEl.textContent = products.length;
    if (catEl) {
        var categories = new Set(products.map(function(p) { return p.category; }));
        catEl.textContent = categories.size;
    }
}

// ========================================
// INIT - GUNAKAN SATU KALI SAJA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Hanya render jika container ada dan belum diisi
    if (document.getElementById('catalogGrid') && !document.querySelector('#catalogGrid .product-card')) {
        renderProducts(products, 'catalogGrid');
    }
    
    if (document.getElementById('productGrid') && !document.querySelector('#productGrid .product-card')) {
        var featured = products.slice(0, 4);
        renderProducts(featured, 'productGrid');
    }
    
    if (document.getElementById('detailContainer')) {
        loadProductDetail();
    }
    
    updateCatalogStats();
});

// Export ke global
window.filterProducts = filterProducts;
window.renderProducts = renderProducts;
window.getProductById = getProductById;
window.getRelatedProducts = getRelatedProducts;
window.products = products;