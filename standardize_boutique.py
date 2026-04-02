import re
import os

path = r'c:\Users\hp\.agent\elias-phone-website\boutique.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the current product-card-actions structure
# Groups:
# 1: model parameter
# 2: product name
# 3: price
pattern = re.compile(
    r'<div class="product-card-actions">\s*'
    r'<a href="product_detail\.html\?model=([^"]+)" class="btn btn-outline">Voir détails</a>\s*'
    r'<button class="add-to-cart-btn" data-name="([^"]+)" data-price="([^"]+)" aria-label="Ajouter au panier">.*?'
    r'</button>\s*'
    r'</div>',
    re.DOTALL
)

def replacement(match):
    model = match.group(1)
    name = match.group(2)
    price = match.group(3)
    return f'''<div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button class="btn btn-blue add-to-cart-btn" data-name="{name}" data-price="{price}" style="flex: 1; border-radius: 12px; font-size: 0.9rem; padding: 0.8rem;">Ajouter</button>
                    <a href="product_detail.html?model={model}" class="btn btn-outline" style="flex: 1; border-radius: 12px; font-size: 0.9rem; padding: 0.8rem; text-align: center;">Détails</a>
                </div>'''

new_content = pattern.sub(replacement, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Standardized 12 product cards in boutique.html")
