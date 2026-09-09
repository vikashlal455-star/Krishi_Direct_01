// ==========================================================================
// 1. STATE & INITIAL DATASETS
// ==========================================================================

let products = [
    { id: 1, name: "Organic Tomatoes", price: 26, marketPrice: 40, farmer: "Ramesh Patil (FPO Nashik)", qty: "1200 Kg Available", img: "🍅" },
    { id: 2, name: "Fresh Red Onions", price: 32, marketPrice: 50, farmer: "Suresh Kumar (Pune)", qty: "2500 Kg Available", img: "🧅" },
    { id: 3, name: "Premium Potatoes", price: 22, marketPrice: 35, farmer: "AgriCoop Society", qty: "4000 Kg Available", img: "🥔" }
];

// ==========================================================================
// 2. NAVIGATION & TAB SWITCHER
// ==========================================================================

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
}

// ==========================================================================
// 3. MARKETPLACE FUNCTIONS
// ==========================================================================

/**
 * Renders product cards dynamically into the grid container
 */
function renderProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div class="text-4xl bg-slate-50 p-4 rounded-xl text-center mb-4">${p.img}</div>
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-slate-800 text-lg">${p.name}</h3>
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">Direct Price</span>
            </div>
            <p class="text-xs text-slate-500 mb-4"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${p.farmer}</p>
            
            <div class="flex items-baseline gap-2 mb-4">
                <span class="text-2xl font-extrabold text-slate-900">₹${p.price}</span>
                <span class="text-xs text-slate-400 line-through">Retail Mandi Price: ₹${p.marketPrice}/kg</span>
            </div>

            <div class="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between">
                <span>Stock Available:</span>
                <span class="font-semibold text-slate-700">${p.qty}</span>
            </div>

            <button onclick="buyProduct('${p.name}', ${p.price})" class="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2">
                <i class="fa-solid fa-cart-shopping"></i> Order Direct
            </button>
        </div>
    `).join('');
}

/**
 * Simulates purchasing a product
 */
function buyProduct(cropName, price) {
    alert(`Order Placed Successfully for ${cropName} at ₹${price}/kg! Direct logistics dispatch initiated.`);
}

// ==========================================================================
// 4. FARMER PORTAL & LISTING FUNCTIONS
// ==========================================================================

/**
 * Handles adding new produce submitted by farmers
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cropName').value;
    const qty = document.getElementById('cropQty').value;
    const price = document.getElementById('cropPrice').value;
    const farmer = document.getElementById('farmerLoc').value;

    // Add new produce item to product list
    products.unshift({
        id: Date.now(),
        name: name,
        price: parseInt(price),
        marketPrice: Math.round(price * 1.45),
        farmer: farmer,
        qty: `${qty} Kg Available`,
        img: "🌾"
    });

    // Re-render UI views
    renderProducts();
    updateFarmerTable(name, qty, price);
    
    // Reset form and notify user
    document.getElementById('add-produce-form').reset();
    alert('Listing successfully published! Consumers and Bulk Buyers can now see your produce.');
}

/**
 * Adds a new row entry to the farmer's produce management table
 */
function updateFarmerTable(name, qty, price) {
    const tbody = document.getElementById('farmer-listings-table');
    if (!tbody) return;

    const row = document.createElement('tr');
    row.className = 'border-b border-slate-100 hover:bg-slate-50';
    row.innerHTML = `
        <td class="p-3 font-semibold text-slate-800">${name}</td>
        <td class="p-3">${qty} Kg</td>
        <td class="p-3 font-bold text-emerald-600">₹${price}/kg</td>
        <td class="p-3"><span class="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">Pickup Scheduled</span></td>
        <td class="p-3"><button onclick="this.closest('tr').remove()" class="text-rose-600 hover:text-rose-800 text-xs font-medium">Cancel</button></td>
    `;
    tbody.prepend(row);
}

/**
 * Populates initial default rows in the farmer management table
 */
function initFarmerTable() {
    const tbody = document.getElementById('farmer-listings-table');
    if (!tbody) return;

    tbody.innerHTML = `
        <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="p-3 font-semibold text-slate-800">Organic Tomatoes</td>
            <td class="p-3">1200 Kg</td>
            <td class="p-3 font-bold text-emerald-600">₹26/kg</td>
            <td class="p-3"><span class="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">In Transit</span></td>
            <td class="p-3"><button onclick="this.closest('tr').remove()" class="text-rose-600 hover:text-rose-800 text-xs font-medium">Cancel</button></td>
        </tr>
        <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="p-3 font-semibold text-slate-800">Fresh Red Onions</td>
            <td class="p-3">2500 Kg</td>
            <td class="p-3 font-bold text-emerald-600">₹32/kg</td>
            <td class="p-3"><span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">Matched with Buyer</span></td>
            <td class="p-3"><button onclick="this.closest('tr').remove()" class="text-rose-600 hover:text-rose-800 text-xs font-medium">Cancel</button></td>
        </tr>
    `;
}

// ==========================================================================
// 5. AI ANALYTICS & LOGISTICS SIMULATION
// ==========================================================================

/**
 * Simulates route optimization recalculation
 */
function runRouteOptimization() {
    const statusEl = document.getElementById('optimization-status');
    if (!statusEl) return;

    statusEl.innerHTML = `<i class="fa-solid fa-spinner animate-spin text-amber-400"></i> Recalculating AI cold-chain path...`;
    
    setTimeout(() => {
        statusEl.innerHTML = `<i class="fa-solid fa-check-circle text-emerald-400"></i> New Optimal Route Locked: Saved 31 Km & 45 Mins Transit Time!`;
    }, 1200);
}

/**
 * Initializes the AI Demand & Price Chart via Chart.js
 */
function initChart() {
    const canvas = document.getElementById('demandChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Predicted Mandi Retail Price (₹)',
                    data: [38, 40, 42, 45, 44, 46, 48],
                    borderColor: '#e11d48',
                    backgroundColor: 'rgba(225, 29, 72, 0.05)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'KrishiDirect Farmer Payout (₹)',
                    data: [30, 32, 35, 38, 37, 39, 41],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                }
            }
        }
    });
}

// ==========================================================================
// 6. APPLICATION INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFarmerTable();
    initChart();
});
// app.js

// Sample Products Dataset
let products = [
    { id: 1, name: "Organic Tomatoes", price: 26, marketPrice: 40, farmer: "Ramesh Patil (FPO Nashik)", qty: 1200, category: "vegetable", img: "🍅" },
    { id: 2, name: "Fresh Red Onions", price: 32, marketPrice: 50, farmer: "Suresh Kumar (Pune)", qty: 2500, category: "vegetable", img: "🧅" },
    { id: 3, name: "Premium Potatoes", price: 22, marketPrice: 35, farmer: "AgriCoop Society", qty: 4000, category: "vegetable", img: "🥔" },
    { id: 4, name: "Basmati Paddy Rice", price: 65, marketPrice: 90, farmer: "Punjab Grain Growers", qty: 5000, category: "grain", img: "🌾" },
    { id: 5, name: "Fresh Nagpur Oranges", price: 45, marketPrice: 70, farmer: "Vidarbha Orchard FPO", qty: 800, category: "fruit", img: "🍊" }
];

let cart = [];
let currentFilter = 'all';

// Tab Navigation Switcher
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');

    // Style Active Tab Button
    ['marketplace', 'farmer-portal', 'ai-analytics'].forEach(id => {
        const btn = document.getElementById(`nav-${id}`);
        if (id === tabId) {
            btn.className = "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 bg-white text-emerald-700 shadow-sm";
        } else {
            btn.className = "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 text-slate-600 hover:text-emerald-700";
        }
    });
}

// Category Filter Logic
function setFilter(cat, btnElement) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.className = "filter-btn bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold transition";
    });
    btnElement.className = "filter-btn bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition";
    renderProducts();
}

// Live Search Filter
function filterProducts() {
    renderProducts();
}

// Render Product Cards dynamically
function renderProducts() {
    const container = document.getElementById('products-grid');
    const searchVal = document.getElementById('search-input').value.toLowerCase();

    const filtered = products.filter(p => {
        const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.farmer.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400">
                <i class="fa-solid fa-seedling text-4xl mb-3"></i>
                <p class="font-semibold text-sm">No produce matching your search parameters.</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
                <div class="text-5xl bg-slate-50 py-6 rounded-2xl text-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    ${p.img}
                </div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-extrabold text-slate-800 text-base">${p.name}</h3>
                    <span class="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Direct Price
                    </span>
                </div>
                <p class="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i> ${p.farmer}
                </p>
                
                <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-2xl font-black text-slate-900">₹${p.price}</span>
                    <span class="text-xs text-slate-400 line-through">Mandi Rate: ₹${p.marketPrice}/kg</span>
                </div>
            </div>

            <div>
                <div class="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between font-medium">
                    <span>Available Stock:</span>
                    <span class="font-bold text-slate-700">${p.qty} Kg</span>
                </div>

                <button onclick="addToCart(${p.id})" class="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md">
                    <i class="fa-solid fa-cart-plus"></i> Add To Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add Product to Cart Logic
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    const existing = cart.find(c => c.id === productId);

    if (existing) {
        existing.cartQty += 10;
    } else {
        cart.push({ ...item, cartQty: 10 });
    }

    updateCartUI();
    toggleCartDrawer(true);
}

// Drawer Controls
function toggleCartDrawer(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if (forceOpen) {
        drawer.classList.remove('hidden');
    } else {
        drawer.classList.toggle('hidden');
    }
}

// Update Cart Drawer UI
function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');

    const totalItems = cart.reduce((sum, item) => sum + item.cartQty, 0);
    countEl.innerText = totalItems;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3"></i>
                <p class="text-sm font-semibold">Your cart is currently empty.</p>
            </div>`;
        subtotalEl.innerText = "₹0";
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.cartQty;
        subtotal += itemTotal;
        return `
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">${item.img}</span>
                    <div>
                        <h4 class="font-bold text-xs text-slate-800">${item.name}</h4>
                        <p class="text-[11px] text-slate-500">₹${item.price}/kg × ${item.cartQty}kg</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-extrabold text-sm text-slate-900">₹${itemTotal}</span>
                    <button onclick="removeFromCart(${item.id})" class="text-rose-500 hover:text-rose-700 p-1 text-xs">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    subtotalEl.innerText = `₹${subtotal}`;
}

// Remove Cart Item
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Checkout Action
function checkoutCart() {
    if (cart.length === 0) return alert('Your cart is empty!');
    alert('Direct farm logistics order placed successfully! Dispatch confirmation sent to registered mobile number.');
    cart = [];
    updateCartUI();
    toggleCartDrawer();
}

// Farmer Form Submit Handling
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cropName').value;
    const category = document.getElementById('cropCategory').value;
    const qty = parseInt(document.getElementById('cropQty').value);
    const price = parseInt(document.getElementById('cropPrice').value);
    const farmer = document.getElementById('farmerLoc').value;

    // Push New Produce
    products.unshift({
        id: Date.now(),
        name: name,
        price: price,
        marketPrice: Math.round(price * 1.45),
        farmer: farmer,
        qty: qty,
        category: category,
        img: category === 'fruit' ? '🍎' : (category === 'grain' ? '🌾' : '🥦')
    });

    renderProducts();
    updateFarmerTable(name, qty, price);

    document.getElementById('add-produce-form').reset();
    alert('Listing published successfully to the direct marketplace!');
}

// Update Farmer Active Listings Table
function updateFarmerTable(name, qty, price) {
    const tbody = document.getElementById('farmer-listings-table');
    const row = document.createElement('tr');
    row.className = 'border-b border-slate-100 hover:bg-slate-50/80 transition';
    row.innerHTML = `
        <td class="p-3 font-extrabold text-slate-800">${name}</td>
        <td class="p-3 font-semibold">${qty} Kg</td>
        <td class="p-3 font-black text-emerald-600">₹${price}/kg</td>
        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full">In Marketplace</span></td>
        <td class="p-3 text-right"><button onclick="this.closest('tr').remove()" class="text-rose-500 hover:text-rose-700 text-xs font-semibold">Delist</button></td>
    `;
    tbody.prepend(row);
}

function initFarmerTable() {
    updateFarmerTable("Organic Tomatoes", 1200, 26);
    updateFarmerTable("Fresh Red Onions", 2500, 32);
}

// Route Optimization Simulation
function runRouteOptimization() {
    const statusEl = document.getElementById('optimization-status');
    statusEl.innerHTML = `<i class="fa-solid fa-spinner animate-spin text-amber-400"></i> Recalculating cold-chain transit path...`;
    
    setTimeout(() => {
        statusEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> Optimal Route Active: Saved 31 Km & 45 Mins Transit Time!`;
    }, 1000);
}

// Initialize AI Demand Forecast Chart
function initChart() {
    const canvas = document.getElementById('demandChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Predicted Mandi Rate (₹)',
                    data: [38, 40, 42, 45, 44, 46, 48],
                    borderColor: '#e11d48',
                    backgroundColor: 'rgba(225, 29, 72, 0.05)',
                    borderDash: [4, 4],
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'KrishiDirect Payout (₹)',
                    data: [30, 32, 35, 38, 37, 39, 41],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { family: "'Plus Jakarta Sans'", size: 11 } } }
            },
            scales: {
                y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: "'Plus Jakarta Sans'" } } },
                x: { grid: { display: false }, ticks: { font: { family: "'Plus Jakarta Sans'" } } }
            }
        }
    });
}

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFarmerTable();
    initChart();
});