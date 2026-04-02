/**
 * ELIAS PHONE - Product Data
 * Centralized repository for all iPhone models and their specifications.
 */

const productData = {
    "17promax": {
        name: "iPhone 17 Pro Max",
        price: "15 999 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-max-1.jpg",
        description: "Le futur de la performance. L'iPhone 17 Pro Max repousse les limites avec son nouveau processeur et son écran révolutionnaire.",
        specs: {
            storage: "1TB",
            condition: "Neuf",
            color: "Titanium",
            battery: "Jusqu'à 35h de lecture vidéo",
            chip: "A19 Pro de pointe",
            camera: "Nouveau capteur 60MP avec zoom optique x10"
        }
    },
    "16pro": {
        name: "iPhone 16 Pro",
        price: "13 500 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg",
        description: "Un chef-d'œuvre de titane. Conçu pour le futur du multimédia et du gaming.",
        specs: {
            storage: "256GB",
            condition: "Neuf",
            color: "Titane Blanc",
            battery: "Jusqu'à 30h de lecture vidéo",
            chip: "A18 Pro",
            camera: "48MP Ultra Grand Angle"
        }
    },
    "16": {
        name: "iPhone 16",
        price: "10 000 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
        description: "L'iPhone par excellence. Équilibre parfait entre puissance et élégance.",
        specs: {
            storage: "128GB",
            condition: "Occasion — Très bon état",
            color: "Noir",
            battery: "Jusqu'à 27h de lecture vidéo",
            chip: "A18",
            camera: "Système photo 48MP"
        }
    },
    "15promax": {
        name: "iPhone 15 Pro Max",
        price: "11 800 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
        description: "Forger en titane. Le premier iPhone avec un design de classe aérospatiale.",
        specs: {
            storage: "512GB",
            condition: "Occasion — Très bon état",
            color: "Titane Naturel",
            battery: "Jusqu'à 29h de lecture vidéo",
            chip: "A17 Pro",
            camera: "Zoom optique x5"
        }
    },
    "15": {
        name: "iPhone 15",
        price: "8 900 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
        description: "Dynamic Island et appareil photo 48MP. Un grand bond en avant pour l'iPhone.",
        specs: {
            storage: "128GB",
            condition: "Neuf",
            color: "Bleu",
            battery: "Jusqu'à 26h de lecture vidéo",
            chip: "A16 Bionic",
            camera: "Principal 48MP"
        }
    },
    "14pro": {
        name: "iPhone 14 Pro",
        price: "9 200 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg",
        description: "L'arrivée de Dynamic Island. Une nouvelle façon magique d'interagir avec l'iPhone.",
        specs: {
            storage: "256GB",
            condition: "Occasion — Très bon état",
            color: "Violet Intense",
            battery: "Jusqu'à 23h de lecture vidéo",
            chip: "A16 Bionic",
            camera: "Principal 48MP"
        }
    },
    "13": {
        name: "iPhone 13",
        price: "6 900 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-1.jpg",
        description: "Votre nouveau superpouvoir. Un système photo plus avancé que jamais.",
        specs: {
            storage: "128GB",
            condition: "Neuf",
            color: "(PRODUCT)RED",
            battery: "Jusqu'à 19h de lecture vidéo",
            chip: "A15 Bionic",
            camera: "Double appareil photo 12MP"
        }
    },
    "12pro": {
        name: "iPhone 12 Pro",
        price: "5 900 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-r1.jpg",
        description: "Le retour du design bord plat. Un saut générationnel en termes de puissance et de photo.",
        specs: {
            storage: "128GB",
            condition: "Occasion — Bon état",
            color: "Bleu Pacifique",
            battery: "Jusqu'à 17h de lecture vidéo",
            chip: "A14 Bionic",
            camera: "Système Pro 12MP"
        }
    },
    "11": {
        name: "iPhone 11",
        price: "3 500 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg",
        description: "Juste ce qu'il faut de tout. L'essentiel de l'expérience iPhone à un prix incroyable.",
        specs: {
            storage: "64GB",
            condition: "Occasion — Bon état",
            color: "Noir",
            battery: "Jusqu'à 17h de lecture vidéo",
            chip: "A13 Bionic",
            camera: "Double appareil photo 12MP"
        }
    }
};

// Also define promotions separately if needed
const promoData = {
    "15pro_promo": {
        name: "iPhone 15 Pro",
        price: "10 800 MAD",
        oldPrice: "11 500 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
        description: "Offre exceptionnelle sur le 15 Pro en excellent état. Quantités limitées.",
        specs: {
            storage: "128GB",
            condition: "Occasion — Très bon état",
            color: "Titane Naturel",
            battery: "Jusqu'à 23h de lecture vidéo",
            chip: "A17 Pro",
            camera: "Zoom optique x3"
        }
    },
    "14pro_promo": {
        name: "iPhone 14 Pro",
        price: "8 600 MAD",
        oldPrice: "9 200 MAD",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg",
        description: "Prix cassé sur l'iPhone 14 Pro. Expérience fluide et photo exceptionnelle.",
        specs: {
            storage: "256GB",
            condition: "Occasion — Très bon état",
            color: "Noir Sidéral",
            battery: "Jusqu'à 23h de lecture vidéo",
            chip: "A16 Bionic",
            camera: "Principal 48MP"
        }
    }
};

// Combine for easy access
const allProducts = { ...productData, ...promoData };
