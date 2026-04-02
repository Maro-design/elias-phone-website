const fs = require('fs');

const htmlFiles = ['index.html', 'boutique.html', 'promotions.html', 'contact.html'];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the literal '\n' bug near </nav>
    content = content.replace(/\\n\s*<\/nav>/g, '\n    </nav>');
    
    // Replace multiple empty classes or redundant styles if present
    content = content.replace(/class="\s*"/g, '');

    // Let's rewrite the <img> tags for the products properly
    const imgMap = {
        'iPhone 17 Pro Max': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-max-1.jpg',
        'iPhone 17 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-1.jpg',
        'iPhone 16 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg',
        'iPhone 16': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg',
        'iPhone 15 Pro Max': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg',
        'iPhone 15 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
        'iPhone 15': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg',
        'iPhone 14 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg',
        'iPhone 14': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg',
        'iPhone 13 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-1.jpg',
        'iPhone 13': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-1.jpg',
        'iPhone 12 Pro': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-r1.jpg',
        'iPhone 12': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-1.jpg',
        'iPhone 11': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg'
    };

    // Make sure EVERY image inside .product-card has the correct style and onerror
    content = content.replace(/<img(.*?)alt="(iPhone[^"]*)"(.*?)>/gi, function(match, p1, p2, p3) {
        let model = p2.trim();
        let src = imgMap[model] || 'https://via.placeholder.com/300x400?text=iPhone';
        
        return `<img src="${src}" alt="${model}" class="product-image" loading="lazy" style="width:100%;height:220px;object-fit:contain;" onerror="this.src='https://via.placeholder.com/300x400?text=iPhone'">`;
    });

    fs.writeFileSync(file, content, 'utf8');
});

// Update main.js
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// Change localStorage keys
mainJs = mainJs.replace(/ep_cart/g, 'elias_cart');
// Replace ep_session with local session logic (if we want, but user just said saves to localStorage, ep_session is fine).

// Update cart buttons logic
// Find where we loop over addToCartBtns:
// `addToCartBtns.forEach(btn => {`
// Before this we defined: `const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');`
mainJs = mainJs.replace(/const addToCartBtns = document\.querySelectorAll\('\.add-to-cart-btn'\);/, `const addToCartBtns = document.querySelectorAll('a.btn-blue, button.btn-blue, .add-to-cart-btn');`);

// Change the event listener logic
// Inside btn.addEventListener('click', (e) => {
// We want to make sure it intercepts "Découvrir" and "Voir détails"
mainJs = mainJs.replace(/btn\.addEventListener\('click',\s*\(e\)\s*=>\s*{/g, `btn.addEventListener('click', (e) => {
            const text = e.target.textContent || '';
            if (text.includes('Découvrir') || text.includes('Voir détails')) {
                e.preventDefault();
            } else if (!e.target.closest('.product-card')) {
                return; // not a product card button
            }
            e.preventDefault();
`);

fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log("Fixes applied successfully.");
