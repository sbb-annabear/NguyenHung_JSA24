// ==========================================
// 1. DATA DEFINITIONS
// ==========================================
const types = [
  "Chair", "Table", "Sofa", "Desk", "Bed", "Shelf", "Cabinet",
  "Wardrobe", "TV Stand", "Bookshelf", "Nightstand", "Coffee Table"
];

const materials = [
  "Wooden", "Metal", "Glass", "Marble", "Bamboo", "Leather", "Fabric"
];

const styles = [
  "Modern", "Classic", "Industrial", "Minimalist", "Scandinavian", "Vintage"
];

const colors = [
  "Black", "White", "Brown", "Gray", "Beige", "Dark Oak", "Walnut"
];

const rooms = [
  "Living Room", "Bedroom", "Office", "Dining Room"
];

const brands = [
  "IKEA", "Ashley", "Wayfair", "Herman Miller", "Steelcase"
];

// Verified high-quality fallback image if anything breaks
const fallbackImage = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=600&q=80";

// Exact category image mapping to ensure NO missing images
const categoryImages = {
    "Chair": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=600&q=80",
    "Table": "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&h=600&q=80",
    "Coffee Table": "https://images.unsplash.com/photo-1530018607912-eff2df11a3be?auto=format&fit=crop&w=600&h=600&q=80",
    "Sofa": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=600&q=80",
    "Desk": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&h=600&q=80",
    "Bed": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&h=600&q=80",
    "Shelf": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&h=600&q=80",
    "Bookshelf": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&h=600&q=80",
    "Cabinet": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&h=600&q=80",
    "Wardrobe": "https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=600&h=600&q=80",
    "TV Stand": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&h=600&q=80",
    "Nightstand": "https://images.unsplash.com/photo-1532372320978-9b4d6a3a854c?auto=format&fit=crop&w=600&h=600&q=80"
};

// ==========================================
// 2. GENERATE 150 MOCK PRODUCTS
// ==========================================
const data = []; 
for (let i = 1; i <= 150; i++) {
  const type = types[Math.floor(Math.random() * types.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const room = rooms[Math.floor(Math.random() * rooms.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const price = Math.floor(Math.random() * 900) + 100;

  const assignedImage = categoryImages[type] || fallbackImage;

  data.push({
    id: i,
    name: `${style} ${material} ${type}`,
    price: price,
    category: room,
    brand: brand,
    color: color,
    rating: (Math.random() * 2 + 3).toFixed(1), 
    stock: Math.floor(Math.random() * 50),
    image: assignedImage
  });
}

// ==========================================
// 3. MAIN INTERACTION ENGINE (DOMContentLoaded)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeBtn = document.getElementById("themeBtn");
    const yearEl = document.getElementById("year");
    const catalogGrid = document.getElementById("catalog");
    const logoutBtn = document.getElementById("logoutBtn");

    // Dynamic Footer Year
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 1. Check localStorage for saved theme on initial load
// ==========================================
    // 3. MAIN INTERACTION ENGINE (DOMContentLoaded)
    // ==========================================
    
    // 1. Check localStorage for saved theme on initial load
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // FIX: Update the button text right away so it matches the loaded theme!
    if (themeBtn) {
        themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            }
        });
    }

    // Functional Logout Trigger
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
            if (confirmLogout) {
                localStorage.removeItem("currentUser");
                window.location.href = "./login.html";
            }
        });
    }

    // Render First 12 Items
    const homePageItems = data.slice(0, 12);

    if (catalogGrid) {
        catalogGrid.innerHTML = "";

        homePageItems.forEach(item => {
            const card = document.createElement("div");
            card.className = "product-card";
            
            card.addEventListener("click", (e) => {
                if (e.target.closest('.add-to-cart-btn')) {
                    alert('Đã thêm vào giỏ hàng!');
                    return;
                }
                
                const newTab = window.open("", "_blank");
                newTab.document.write(`
                    <!DOCTYPE html>
                    <html lang="vi">
                    <head>
                        <meta charset="UTF-8">
                        <title>${item.name} | Hase Shop</title>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                        <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
                            .shopee-container { max-width: 1200px; margin: 40px auto; background: #fff; display: flex; gap: 40px; padding: 30px; border-radius: 8px; box-shadow: 0 1px 12px rgba(0,0,0,0.05); }
                            .product-gallery { width: 450px; }
                            .product-gallery img { width: 100%; border-radius: 4px; aspect-ratio: 1; object-fit: cover; }
                            .product-details { flex: 1; display: flex; flex-direction: column; }
                            .product-title { font-size: 24px; font-weight: 500; margin: 0 0 15px 0; }
                            .badge { background: #ee4d2d; color: white; font-size: 12px; padding: 2px 6px; border-radius: 2px; margin-right: 8px; }
                            .price-box { background: #fafafa; padding: 15px 20px; border-radius: 4px; margin-bottom: 25px; }
                            .current-price { color: #ee4d2d; font-size: 30px; font-weight: 500; }
                            .info-row { display: flex; margin-bottom: 20px; font-size: 14px; }
                            .info-label { width: 110px; color: #757575; }
                            .btn-group { display: flex; gap: 15px; margin-top: auto; }
                            .btn-buy-now { background: #ee4d2d; border: none; color: white; padding: 14px 40px; font-size: 15px; border-radius: 4px; cursor: pointer; font-weight: 500; }
                        </style>
                    </head>
                    <body>
                        <div class="shopee-container">
                            <div class="product-gallery">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="product-details">
                                <h1 class="product-title"><span class="badge">Yêu Thích</span>${item.name}</h1>
                                <div class="price-box">
                                    <span class="current-price">$${item.price}</span>
                                </div>
                                <div class="info-row"><div class="info-label">Thương hiệu</div><div>${item.brand}</div></div>
                                <div class="info-row"><div class="info-label">Màu sắc</div><div>${item.color}</div></div>
                                <div class="info-row"><div class="info-label">Danh mục</div><div>${item.category}</div></div>
                                <div class="btn-group">
                                    <button class="btn-buy-now" onclick="alert('Cảm ơn bạn đã mua hàng!')">Mua Ngay</button>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                `);
                newTab.document.close();
            });

            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${item.image}" onerror="this.onerror=null; this.src='${fallbackImage}';" alt="${item.name}" loading="lazy">
                    ${item.stock < 10 ? `<span class="stock-badge">Sắp Cháy Hàng</span>` : ''}
                </div>
                <div class="product-info">
                    <span class="product-brand">${item.brand}</span>
                    <h4 class="product-title" title="${item.name}">${item.name}</h4>
                    <div class="product-meta">
                        <span class="product-rating">⭐ ${item.rating}</span>
                        <span class="product-category">${item.category}</span>
                    </div>
                    <div class="product-footer-row">
                        <span class="product-price">$${item.price}</span>
                        <button class="add-to-cart-btn">
                            <i class="fa fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            catalogGrid.appendChild(card);
        });
    }
});

