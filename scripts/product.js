// Product database - same as shop.html
const productsDatabase = [
    {
        id: 'NES-SYN-5W30-1L',
        name: 'Nesab Synth 5W-30',
        category: 'engine-oil',
        viscosity: '5W-30',
        base: 'synthetic',
        price: 950.00,
        stock: 45,
        image: '../resources/images/products/product-synth-5w30.jpg',
        specs: { type: 'Full Synthetic', api: 'SN/CF', acea: 'A5/B5', capacity: '1 Liter', drainInterval: '10,000 km' },
        description: 'Premium synthetic engine oil for modern petrol engines.'
    },
    // ... (add all 24 products here with full data)
];

// Initialize products page
function initializeProducts() {
    localStorage.setItem('nesab-products', JSON.stringify(productsDatabase));
    
    let allProducts = productsDatabase;
    let filteredProducts = [...allProducts];
    let comparisonProducts = [];
    let currentFilters = { type: [], viscosity: [], base: [], price: [] };
    
    renderProducts();
    setupFilters();
    setupSorting();
}

// Render products
function renderProducts(products = filteredProducts) {
    const grid = document.getElementById('products-grid');
    const productCount = document.getElementById('product-count');
    const noProducts = document.getElementById('no-products');
    
    if (products.length === 0) {
        if (grid) grid.innerHTML = '';
        if (noProducts) noProducts.classList.remove('hidden');
        return;
    }
    
    if (noProducts) noProducts.classList.add('hidden');
    if (productCount) productCount.textContent = `${products.length} products`;
    
    if (!grid) return;
    
    grid.innerHTML = products.map(product => {
        const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
        const stockText = product.stock > 10 ? `In Stock: ${product.stock}` : product.stock > 0 ? `Low Stock: ${product.stock}` : 'Out of Stock';
        const disabled = product.stock === 0 ? 'opacity-50 pointer-events-none' : '';
        const isSelected = comparisonProducts.some(p => p.id === product.id);
        
        return `
            <div class="product-card bg-gray-900 rounded-lg overflow-hidden ${disabled}" data-id="${product.id}">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="absolute top-2 right-2">
                        <span class="px-2 py-1 bg-gray-900/80 rounded text-xs ${stockClass.includes('in') ? 'text-green-400' : stockClass.includes('low') ? 'text-copper' : 'text-red-400'}">
                            ${stockText}
                        </span>
                    </div>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold text-white">${product.name}</h3>
                        <button onclick="toggleProductComparison('${product.id}')" class="p-2 border border-gray-600 rounded ${isSelected ? 'bg-copper border-copper' : ''}" title="Add to comparison">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-gray-400 mb-2">${product.specs.type} • ${product.specs.capacity}</p>
                    <p class="text-xs text-gray-500 mb-3">${product.description}</p>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-2xl font-bold copper-accent">ETB ${product.price.toFixed(2)}</span>
                        <div class="flex items-center gap-1 text-xs text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>OEM Approved</span>
                        </div>
                    </div>
                    <button onclick="addToCart('${product.id}')" class="w-full bg-copper hover:bg-copper-dark py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                        </svg>
                        Add to Cart
                    </button>
                    <div class="mt-3 flex gap-2">
                        <a href="${product.sds}" target="_blank" class="flex-1 text-center text-xs bg-gray-800 hover:bg-gray-700 py-1 rounded transition-colors">SDS</a>
                        <a href="${product.tds}" target="_blank" class="flex-1 text-center text-xs bg-gray-800 hover:bg-gray-700 py-1 rounded transition-colors">TDS</a>
                        <a href="${product.coa}" target="_blank" class="flex-1 text-center text-xs bg-gray-800 hover:bg-gray-700 py-1 rounded transition-colors">COA</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Filter functions
function setupFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange() {
    const currentFilters = { type: [], viscosity: [], base: [], price: [] };
    
    document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
        const filterType = checkbox.dataset.filter;
        const filterValue = checkbox.value;
        currentFilters[filterType].push(filterValue);
    });
    
    applyFilters(currentFilters);
}

function applyFilters(filters) {
    const allProducts = JSON.parse(localStorage.getItem('nesab-products')) || [];
    
    filteredProducts = allProducts.filter(product => {
        if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
        if (filters.viscosity.length > 0 && !filters.viscosity.includes(product.viscosity)) return false;
        if (filters.base.length > 0 && !filters.base.includes(product.base)) return false;
        if (filters.price.length > 0) {
            const priceMatch = filters.price.some(range => {
                const [min, max] = range.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                return product.price >= min && (max === undefined || product.price <= max);
            });
            if (!priceMatch) return false;
        }
        return true;
    });
    
    renderProducts();
}

function clearFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    filteredProducts = [...JSON.parse(localStorage.getItem('nesab-products')) || []];
    renderProducts();
}

// Sorting
function setupSorting() {
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            switch (sortValue) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                default:
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            }
            renderProducts();
        });
    }
}

// Comparison
function toggleProductComparison(productId) {
    const allProducts = JSON.parse(localStorage.getItem('nesab-products')) || [];
    const product = allProducts.find(p => p.id === productId);
    const existingIndex = comparisonProducts.findIndex(p => p.id === productId);
    
    if (existingIndex > -1) {
        comparisonProducts.splice(existingIndex, 1);
    } else {
        if (comparisonProducts.length < 4) {
            comparisonProducts.push(product);
        } else {
            alert('Maximum 4 products can be compared');
            return;
        }
    }
    
    updateComparisonUI();
    renderProducts();
}

function updateComparisonUI() {
    const compareBtn = document.getElementById('compare-btn');
    const compareCount = document.getElementById('compare-count');
    
    if (compareCount) compareCount.textContent = comparisonProducts.length;
    if (compareBtn) compareBtn.disabled = comparisonProducts.length === 0;
}

function toggleComparison() {
    const panel = document.getElementById('comparison-panel');
    if (!panel) return;
    
    if (comparisonProducts.length === 0) {
        alert('Please select products to compare');
        return;
    }
    
    panel.classList.toggle('active');
    renderComparison();
}

function renderComparison() {
    const content = document.getElementById('comparison-content');
    if (!content) return;
    
    if (comparisonProducts.length === 0) {
        content.innerHTML = '<p class="text-center text-gray-400">No products selected</p>';
        return;
    }
    
    let table = `
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-600">
                    <th class="text-left py-3 px-4">Feature</th>
                    ${comparisonProducts.map(p => `<th class="text-left py-3 px-4">${p.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
    `;
    
    const features = [
        { key: 'price', label: 'Price', format: (val) => `ETB ${val.toFixed(2)}` },
        { key: 'viscosity', label: 'Viscosity' },
        { key: 'base', label: 'Base Type', format: (val) => val.charAt(0).toUpperCase() + val.slice(1) },
        { key: 'specs', label: 'Specifications' },
        { key: 'description', label: 'Description' }
    ];
    
    features.forEach((feature, index) => {
        table += `<tr class="${index % 2 === 0 ? 'bg-gray-800' : ''}"><td class="py-3 px-4 font-medium">${feature.label}</td>`;
        comparisonProducts.forEach(product => {
            const value = feature.format ? feature.format(product[feature.key]) : product[feature.key];
            table += `<td class="py-3 px-4">${value}</td>`;
        });
        table += '</tr>';
    });
    
    table += '</tbody></table>';
    content.innerHTML = table;
}

function clearFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    filteredProducts = [...JSON.parse(localStorage.getItem('nesab-products')) || []];
    renderProducts();
}