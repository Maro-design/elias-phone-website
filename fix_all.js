const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'boutique.html', 'promotions.html', 'contact.html'];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the literal '\n' bug near </nav>
    content = content.replace(/\\n\s*<\/nav>/g, '\n    </nav>');
    
    // Fix product images in ALL cards
    // 17 Pro Max
    content = content.replace(/src=".*?"([^>]*alt="iPhone 17 Pro Max")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-max-1.jpg"$1');
    // 17 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 17 Pro(?! Max)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-1.jpg"$1');
    // 16 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 16 Pro(?! Max)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg"$1');
    // 16
    content = content.replace(/src=".*?"([^>]*alt="iPhone 16(?! Pro)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg"$1');
    // 15 Pro Max
    content = content.replace(/src=".*?"([^>]*alt="iPhone 15 Pro Max")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg"$1');
    // 15 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 15 Pro(?! Max)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"$1');
    // 15
    content = content.replace(/src=".*?"([^>]*alt="iPhone 15(?! Pro)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"$1');
    // 14 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 14 Pro")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg"$1');
    // 14
    content = content.replace(/src=".*?"([^>]*alt="iPhone 14(?! Pro)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"$1');
    // 13 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 13 Pro")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-1.jpg"$1');
    // 13
    content = content.replace(/src=".*?"([^>]*alt="iPhone 13(?! Pro)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-1.jpg"$1');
    // 12 Pro
    content = content.replace(/src=".*?"([^>]*alt="iPhone 12 Pro")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-r1.jpg"$1');
    // 12
    content = content.replace(/src=".*?"([^>]*alt="iPhone 12(?! Pro)")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-1.jpg"$1');
    // 11
    content = content.replace(/src=".*?"([^>]*alt="iPhone 11")/g, 'src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg"$1');

    // Make sure EVERY image inside .product-card has the correct style and onerror
    // We match <img ...> that is preceded by product-card somewhere (or just replace all imgs that have alt="iPhone...")
    content = content.replace(/<img(.*?)alt="(iPhone[^"]*)"(.*?)>/g, function(match, p1, p2, p3) {
        // remove existing style and onerror and src (src is already handled before if it matches, wait, let's just make sure)
        // Actually, it's safer to re-construct it.
        let cleanedP1P3 = (p1 + " " + p3)
            .replace(/style="[^"]*"/g, '')
            .replace(/onerror="[^"]*"/g, '')
            .replace(/class="[^"]*"/g, '') // optionally remove class, but let's keep class="product-image"
            .trim();
        
        let srcMatch = cleanedP1P3.match(/src="([^"]*)"/);
        let src = srcMatch ? srcMatch[1] : '';
        cleanedP1P3 = cleanedP1P3.replace(/src="[^"]*"/, '').trim();

        return `<img src="${src}" alt="${p2}" class="product-image" loading="lazy" style="width:100%;height:220px;object-fit:contain;" onerror="this.src='https://via.placeholder.com/300x400?text=iPhone'" ${cleanedP1P3}>`.replace(/\s+/g, ' ').replace(' >', '>');
    });

    fs.writeFileSync(file, content, 'utf8');
});

// Update main.js
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// Change localStorage keys
mainJs = mainJs.replace(/ep_cart/g, 'elias_cart');

// Update cart buttons to select 'Découvrir' and 'Voir détails'
mainJs = mainJs.replace(/const addToCartBtns\s*=\s*document\.querySelectorAll\('.add-to-cart-btn'\);/, `const addToCartBtns = document.querySelectorAll('a, button');`);

mainJs = mainJs.replace(/addToCartBtns\.forEach\(btn => {/g, `addToCartBtns.forEach(btn => {
        if (!btn.textContent.includes('Découvrir') && !btn.textContent.includes('Voir détails')) return;
`);

mainJs = mainJs.replace(/btn\.addEventListener\('click',\s*\(e\)\s*=>\s*{/g, `btn.addEventListener('click', (e) => {
            if (!btn.textContent.includes('Découvrir') && !btn.textContent.includes('Voir détails')) return;
            e.preventDefault();
`);

// The logout button behavior is already present in updateProfileUI but we are instructed:
// "Click when logged in → shows 'Se déconnecter' option" 
// We should modify toggleProfileModal to check if logged in
let logoutLogic = `
    const toggleProfileModal = () => {
        if (userSession) {
            // Already logged in, clicking the icon should just show logout option directly or via confirm
            if (confirm("Voulez-vous vous déconnecter ?")) {
                localStorage.removeItem('ep_session');
                userSession = null;
                updateProfileUI();
            }
        } else {
            if (profileModal) profileModal.classList.toggle('active');
            if (profileBackdrop) profileBackdrop.classList.toggle('active');
        }
    };
`;

mainJs = mainJs.replace(/const toggleProfileModal = \(\) => {[\s\S]*?};/, logoutLogic);

fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log("Fixes applied successfully.");
