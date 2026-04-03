/**
 * ELIAS PHONE
 * Main JavaScript file handling Animations, Nav, Filters, Countdown, Forms, Cart, and Product Details
 */

// Global state and constants
const WHATSAPP_NUMBER = "212600000000";
let cart = JSON.parse(localStorage.getItem('elias_cart')) || [];

// Shared functions
const saveCart = () => {
    localStorage.setItem('elias_cart', JSON.stringify(cart));
    renderCart();
};

const toggleCart = () => {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-backdrop');
    if (cartDrawer) cartDrawer.classList.toggle('active');
    if (cartBackdrop) cartBackdrop.classList.toggle('active');
};

const renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartBadge = document.getElementById('cart-badge');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const numericPrice = parseInt(item.price.replace(/\D/g, '')) || 0;
        total += numericPrice;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price}</div>
            </div>
            <button class="cart-item-remove" data-index="${index}">✕</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    if (cartTotalPrice) {
        cartTotalPrice.textContent = total.toLocaleString('fr-FR') + ' MAD';
    }

    if (cart.length > 0) {
        if (cartBadge) {
            cartBadge.textContent = cart.length;
            cartBadge.style.display = 'flex';
        }
    } else {
        if (cartBadge) cartBadge.style.display = 'none';
        cartItemsContainer.innerHTML = '<p class="text-muted" style="text-align:center;">Votre panier est vide.</p>';
    }

    // Remove item event listeners
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-index');
            cart.splice(idx, 1);
            saveCart();
        };
    });
};

/* --- Product Detail Rendering --- */
window.selectProduct = (product) => {
    localStorage.setItem('elias_selected_product', JSON.stringify(product));
    window.location.href = 'product_detail.html';
};

function initProductDetail() {
    const detailContainer = document.getElementById('product-detail');
    if (!detailContainer) return;

    // First try localStorage
    const product = JSON.parse(localStorage.getItem('elias_selected_product'));
    
    if (product) {
        detailContainer.innerHTML = `
            <div class="detail-image-box scroll-reveal">
                <img id="product-image" src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x500?text=${product.name}'">
            </div>
            <div class="detail-info">
                <div style="display: inline-block; padding: 0.3rem 0.8rem; border-radius: 999px; background: rgba(0, 122, 255, 0.1); color: var(--accent-blue); font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem;">AUTHENTIQUE & GARANTI</div>
                <h1 id="product-name" class="scroll-reveal">${product.name}</h1>
                <div id="product-price" class="detail-price tabular-nums scroll-reveal" style="transition-delay: 0.1s">${product.price.toLocaleString()} MAD</div>
                <p class="detail-description scroll-reveal" style="transition-delay: 0.2s">${product.etat || 'Découvrez les performances exceptionnelles de cet iPhone.'}</p>
                
                <h3 class="scroll-reveal" style="transition-delay: 0.3s">Spécifications Techniques.</h3>
                <div class="specs-grid scroll-reveal" style="transition-delay: 0.4s">
                    <div class="spec-item">
                        <div class="spec-label">Stockage</div>
                        <div id="product-storage" class="spec-value">${product.storage}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">État</div>
                        <div id="product-etat" class="spec-value">${product.etat}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Batterie</div>
                        <div id="product-battery" class="spec-value">${product.battery}%</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Puce</div>
                        <div id="product-processor" class="spec-value">${product.processor}</div>
                    </div>
                    <div class="spec-item" style="grid-column: span 2;">
                        <div class="spec-label">Caméra</div>
                        <div id="product-camera" class="spec-value">${product.camera}</div>
                    </div>
                </div>

                <div class="buttons-container scroll-reveal" style="transition-delay: 0.5s;">
                    <button class="btn btn-primary add-to-cart-btn btn-cart" data-name="${product.name}" data-price="${product.price}">Ajouter au panier</button>
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour,%20je%20souhaite%20commander%20l'${product.name}%20à%20${product.price}..." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                        Acheter via WhatsApp
                    </a>
                </div>
            </div>
        `;
        initAnimations(); // Re-trigger animations for injected content
    } else {
        // Fallback or Redirect
        const urlParams = new URLSearchParams(window.location.search);
        const modelId = urlParams.get('model');
        
        if (modelId && typeof allProducts !== 'undefined' && allProducts[modelId]) {
            const p = allProducts[modelId];
            // If we have a URL param but no localStorage, set it up
            window.selectProduct({
                name: p.name,
                storage: p.specs.storage,
                color: p.specs.color,
                price: parseInt(p.price.replace(/\D/g, '')) || 0,
                etat: p.specs.condition,
                image: p.image,
                battery: 100,
                processor: p.specs.chip,
                camera: p.specs.camera
            });
        } else {
            detailContainer.innerHTML = `
                <div style="padding: 10rem 0; text-align: center; grid-column: span 2;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Produit non trouvé.</h2>
                    <a href="boutique.html" class="btn btn-outline">Retour à la boutique</a>
                </div>
            `;
            // Optional: window.location.href = 'boutique.html';
        }
    }
}

/* --- Scroll Animations --- */
function initAnimations() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Boutique Filters --- */
function initBoutiqueFilters() {
  const productGrid = document.getElementById('product-grid');
  const filterPills = document.querySelector('.filter-pills');
  if (!productGrid || !filterPills) return;

  const products = document.querySelectorAll('.product-item');
  const pills = filterPills.querySelectorAll('.filter-pill');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      products.forEach(product => {
        const pModel = product.getAttribute('data-model');
        // Simple model filtering for premium UX
        if (filterValue === 'all' || pModel === filterValue) {
          product.style.display = 'flex';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

/* --- Promotions Countdown Timer --- */
function initCountdown() {
  const timerElement = document.getElementById('countdown-timer');
  if (!timerElement) return;

  const DURATION = 48 * 60 * 60 * 1000;
  let endTime = localStorage.getItem('elias_promo_end');
  const now = new Date().getTime();

  if (!endTime || now > endTime) {
    endTime = now + DURATION;
    localStorage.setItem('elias_promo_end', endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  const formatter = new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 });

  const updateTimer = () => {
    const currentTime = new Date().getTime();
    let diff = endTime - currentTime;

    if (diff <= 0) {
      timerElement.textContent = "00 : 00 : 00";
      clearInterval(interval);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    timerElement.textContent = `${formatter.format(hours)} : ${formatter.format(minutes)} : ${formatter.format(seconds)}`;
  };

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      input.classList.add('interacted');
      const errorMsg = input.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains('error-msg')) {
        if (!input.validity.valid) {
          if (input.validity.valueMissing) errorMsg.textContent = 'Ce champ est requis.';
          else if (input.validity.patternMismatch) errorMsg.textContent = 'Le format est incorrect.';
          else if (input.validity.typeMismatch) errorMsg.textContent = "L'entrée n'est pas valide.";
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (form.checkValidity()) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

      setTimeout(() => {
        submitBtn.textContent = 'Message Envoyé ✓';
        submitBtn.style.backgroundColor = '#25D366';
        form.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer le message';
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    } else {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
}

// --- Main Init Logic ---
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initBoutiqueFilters();
    initCountdown();
    initContactForm();
    initProductDetail();
    renderCart();

    // --- SEARCH LOGIC ---
    const searchBtn = document.getElementById('search-btn');
    const closeSearch = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.product-card');

    if (searchBtn && searchOverlay) {
        searchBtn.onclick = () => {
            searchOverlay.classList.add('active');
            if(searchInput) searchInput.focus();
        };
        
        if (closeSearch) {
            closeSearch.onclick = () => {
                searchOverlay.classList.remove('active');
                if(searchInput) searchInput.value = '';
                productCards.forEach(card => card.style.display = 'flex');
            };
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                if (closeSearch) closeSearch.click();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                productCards.forEach(card => {
                    const titleMatch = card.querySelector('h2, h3');
                    if (titleMatch) {
                        const title = titleMatch.textContent.toLowerCase();
                        card.style.display = title.includes(term) ? 'flex' : 'none';
                    }
                });
            });
        }
    }

    // --- CART TOGGLES ---
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartBackdrop = document.getElementById('cart-backdrop');
    
    if (cartBtn) cartBtn.onclick = toggleCart;
    if (closeCartBtn) closeCartBtn.onclick = toggleCart;
    if (cartBackdrop) cartBackdrop.onclick = () => {
        const drawer = document.getElementById('cart-drawer');
        const backdrop = document.getElementById('cart-backdrop');
        if (drawer) drawer.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    };

    // --- CHECKOUT LOGIC ---
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (cart.length === 0) {
                alert("Votre panier est vide !");
                return;
            }

            let message = "Bonjour ELIAS PHONE, je souhaite commander :\n\n";
            let total = 0;
            cart.forEach(item => {
                message += `- ${item.name} (${item.price})\n`;
                total += parseInt(item.price.replace(/\D/g, '')) || 0;
            });
            message += `\n*Total : ${total.toLocaleString('fr-FR')} MAD*`;
            
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
        };
    }

    // --- EVENT DELEGATION FOR ADD TO CART ---
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            e.preventDefault();
            const name = addBtn.getAttribute('data-name');
            const price = addBtn.getAttribute('data-price');
            
            if (name && price) {
                cart.push({ name, price });
                saveCart();
                
                const cartBtnNode = document.getElementById('cart-btn');
                if (cartBtnNode) {
                    cartBtnNode.style.transform = 'scale(1.2)';
                    setTimeout(() => cartBtnNode.style.transform = '', 200);
                }
                toggleCart();
            }
        }
    });

    // --- PROFILE/AUTH LOGIC ---
    const profileBtn = document.getElementById('profile-btn');
    const closeProfileBtn = document.getElementById('close-profile');
    const profileModal = document.getElementById('profile-modal');
    const profileBackdrop = document.getElementById('profile-backdrop');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loggedInView = document.getElementById('logged-in-view');
    const modalTabsContainer = document.querySelector('.modal-tabs');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const profileSvg = document.getElementById('profile-svg');
    const profileInitial = document.getElementById('profile-initial');
    const userAvatarLarge = document.getElementById('user-avatar-large');
    const userGreeting = document.getElementById('user-greeting');
    const logoutBtn = document.getElementById('logout-btn');

    const updateProfileUI = () => {
        const session = JSON.parse(localStorage.getItem('ep_session'));
        if (session) {
            let initial = session.name ? session.name.charAt(0).toUpperCase() : 'U';
            if (profileSvg) profileSvg.style.display = 'none';
            if (profileInitial) {
                profileInitial.textContent = initial;
                profileInitial.style.display = 'flex';
            }
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'none';
            if (modalTabsContainer) modalTabsContainer.style.display = 'none';
            if (loggedInView) {
                loggedInView.style.display = 'block';
                if(userGreeting) userGreeting.textContent = `Bonjour, ${session.name}!`;
                if(userAvatarLarge) userAvatarLarge.textContent = initial;
            }
        } else {
            if (profileSvg) profileSvg.style.display = 'block';
            if (profileInitial) profileInitial.style.display = 'none';
            if (modalTabsContainer) modalTabsContainer.style.display = 'flex';
            if (loggedInView) loggedInView.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
            tabBtns.forEach((b, i) => b.classList.toggle('active', i === 0));
        }
    };

    if (profileBtn) profileBtn.onclick = () => {
        if (profileModal) profileModal.classList.add('active');
        if (profileBackdrop) profileBackdrop.classList.add('active');
    };
    if (closeProfileBtn) closeProfileBtn.onclick = () => {
        if (profileModal) profileModal.classList.remove('active');
        if (profileBackdrop) profileBackdrop.classList.remove('active');
    };
    if (profileBackdrop) profileBackdrop.onclick = () => {
        if (profileModal) profileModal.classList.remove('active');
        if (profileBackdrop) profileBackdrop.classList.remove('active');
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const isLogin = btn.getAttribute('data-tab') === 'login';
            if (loginForm) loginForm.style.display = isLogin ? 'block' : 'none';
            if (registerForm) registerForm.style.display = isLogin ? 'none' : 'block';
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email')?.value;
            localStorage.setItem('ep_session', JSON.stringify({ name: email.split('@')[0], email }));
            updateProfileUI();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name')?.value;
            const email = document.getElementById('reg-email')?.value;
            localStorage.setItem('ep_session', JSON.stringify({ name, email }));
            updateProfileUI();
        });
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('ep_session');
            updateProfileUI();
        };
    }

    updateProfileUI();
});

