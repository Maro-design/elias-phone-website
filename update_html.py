import os
import re

html_files = ["index.html", "boutique.html", "promotions.html", "contact.html"]

nav_icons_html = """<div class="nav-icons text-muted">
            <button id="search-btn" class="icon-btn" aria-label="Rechercher">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
            <button id="profile-btn" class="icon-btn profile-icon-container" aria-label="Profil">
                <svg id="profile-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <div id="profile-initial" class="profile-initial" style="display: none;"></div>
            </button>
            <button id="cart-btn" class="icon-btn" aria-label="Panier">
                <div class="cart-icon-wrapper" style="position: relative;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span id="cart-badge" class="badge-count" style="display: none;">0</span>
                </div>
            </button>
        </div>"""

overlays_html = """
    <!-- Overlays -->
    <!-- Search Overlay -->
    <div id="search-overlay" class="search-overlay glass-panel">
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Rechercher un iPhone..." autocomplete="off">
            <button id="close-search" class="icon-btn">✕</button>
        </div>
    </div>

    <!-- Cart Drawer -->
    <div id="cart-backdrop" class="modal-backdrop"></div>
    <div id="cart-drawer" class="cart-drawer glass-panel">
        <div class="cart-header">
            <h3>Votre Panier</h3>
            <button id="close-cart" class="icon-btn">✕</button>
        </div>
        <div id="cart-items" class="cart-items">
            <!-- Items injected by JS -->
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cart-total-price" class="tabular-nums">0 MAD</span>
            </div>
            <button class="btn btn-primary" style="width: 100%;">Passer la commande</button>
        </div>
    </div>
    
    <!-- Profile/Auth Modal -->
    <div id="profile-backdrop" class="modal-backdrop"></div>
    <div id="profile-modal" class="profile-modal glass-panel">
        <button id="close-profile" class="icon-btn close-modal">✕</button>
        <div class="modal-tabs">
            <button class="tab-btn active" data-tab="login">Connexion</button>
            <button class="tab-btn" data-tab="register">Inscription</button>
        </div>
        
        <!-- Login Form -->
        <form id="login-form" class="auth-form active">
            <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" required>
            </div>
            <div class="form-group">
                <label for="login-pass">Mot de passe</label>
                <input type="password" id="login-pass" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Se connecter</button>
        </form>
        
        <!-- Register Form -->
        <form id="register-form" class="auth-form" style="display: none;">
            <div class="form-group">
                <label for="reg-name">Nom complet</label>
                <input type="text" id="reg-name" required>
            </div>
            <div class="form-group">
                <label for="reg-email">Email</label>
                <input type="email" id="reg-email" required>
            </div>
            <div class="form-group">
                <label for="reg-pass">Mot de passe</label>
                <input type="password" id="reg-pass" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Créer un compte</button>
        </form>

        <div id="logged-in-view" style="display: none; text-align: center; padding: 2rem 0;">
            <div id="user-avatar-large" style="width: 60px; height: 60px; border-radius: 50%; background: #007aff; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin: 0 auto 1rem;">M</div>
            <h3 id="user-greeting" style="margin-bottom: 2rem;">Bonjour!</h3>
            <button id="logout-btn" class="btn btn-outline" style="width: 100%; border-color: #ff3b30; color: #ff3b30;">Déconnexion</button>
        </div>
    </div>
"""

img_map = {
    "17 Pro Max": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-max-1.jpg",
    "16 Pro": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg",
    "16": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
    "15 Pro Max": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
    "15 Pro": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
    "15": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
    "14 Pro": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg",
    "14": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg",
    "13 Pro": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-1.jpg",
    "13": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-1.jpg",
    # If 12 Pro exists fallback to 12 since I don't have explicit gsma 12 pro link
    "12 Pro": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-r1.jpg", # taking a guess, or just fallback
    "12": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-1.jpg",
    "11": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg",
}

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace nav-icons
    content = re.sub(r'<div class="nav-icons text-muted">[\s\S]*?</nav>', f'{nav_icons_html}\n    </nav>', content)

    # 2. Inject Overlays before </body>
    if "<!-- Overlays -->" not in content:
        content = content.replace("</body>", f"{overlays_html}\n</body>")

    # 3. Replace all product images
    # Regex expects: <img src="..." alt="iPhone 14 Pro" ...>
    def img_replacer(match):
        model = match.group(1)
        url = img_map.get(model, f"https://placehold.co/300x500/111/fff?text=iPhone+{model.replace(' ', '+')}")
        fallback = f"this.onerror=null; this.src='https://placehold.co/300x500/111/fff?text=iPhone+{model.replace(' ', '+')}';"
        # build replacement
        return f'<img src="{url}" alt="iPhone {model}" class="product-image" loading="lazy" style="width: 100%; height: 220px; object-fit: contain; background: transparent;" onerror="{fallback}">'

    content = re.sub(r'<img[^>]+alt="iPhone\s([^"]+)"[^>]*>', img_replacer, content)

    # Make "Découvrir" and "Voir détails" buttons act nicely for Cart
    def btn_replacer(match):
        btn_html = match.group(0)
        # Assuming inside .product-card we can parse the name and price later, or we add a class
        if 'add-to-cart-btn' not in btn_html:
            btn_html = btn_html.replace('class="btn btn-primary"', 'class="btn btn-primary add-to-cart-btn"')
        return btn_html

    content = re.sub(r'<a[^>]*class="btn btn-primary"[^>]*>Découvrir</a>', r'<button class="btn btn-primary add-to-cart-btn">Découvrir</button>', content)
    content = re.sub(r'<a[^>]*class="btn btn-primary"[^>]*>Voir détails</a>', r'<button class="btn btn-primary add-to-cart-btn">Voir détails</button>', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {file}")
