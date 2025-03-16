import { ProductSchema } from "@/types";

export const categories = [
  { id: 1, name: "Cars", image: "/assets/images/cars.jpg" },
  { id: 2, name: "Suits", image: "/assets/images/suits.jpg" },
  { id: 3, name: "Real Estate", image: "/assets/images/real-estate.jpeg" },
  // { id: 4, name: "Electronics", image: "/assets/images/electronics.jpg" },
  // { id: 5, name: "Furniture", image: "/assets/images/furniture.jpg" },
];

export const products: ProductSchema[] = [
  {
    "id": "1",
    "name": "Luxury Penthouse in Manhattan",
    "price": 25000000,
    "image": "/assets/images/real_estate/manhattan_penthouse.jpeg",
    "category": "Real Estate",
    "desc": "A stunning penthouse with panoramic views of the New York City skyline."
  },
  {
    "id": "2",
    "name": "Mercedes-AMG GT 63 S E PERFORMANCE",
    "price": 200000,
    "image": "/assets/images/cars/mercedes_amg_gt63.jpg",
    "category": "Cars",
    "desc": "A high-performance hybrid with breathtaking power and cutting-edge technology."
  },
  {
    "id": "3",
    "name": "Bespoke Italian Wool Suit",
    "price": 5000,
    "image": "/assets/images/suits/italian_wool_suit.jpeg",
    "category": "Suits",
    "desc": "Handcrafted from the finest Italian wool, tailored to your precise measurements."
  },
  {
    "id": "4",
    "name": "Porsche 911 Turbo S",
    "price": 250000,
    "image": "/assets/images/cars/porsche_911_turbo_s.jpg",
    "category": "Cars",
    "desc": "The pinnacle of sports car engineering, delivering exhilarating speed and precision handling."
  },
  {
    "id": "5",
    "name": "Mediterranean Villa in Cannes",
    "price": 15000000,
    "image": "/assets/images/real_estate/cannes_villa.jpeg",
    "category": "Real Estate",
    "desc": "A luxurious villa with a private pool and breathtaking views of the Mediterranean Sea."
  },
  {
    "id": "6",
    "name": "Savile Row Custom Suit",
    "price": 8000,
    "image": "/assets/images/suits/savile_row_suit.jpeg",
    "category": "Suits",
    "desc": "A masterpiece of tailoring, crafted by master artisans on London's Savile Row."
  },
  {
    "id": "7",
    "name": "Rolls-Royce Phantom",
    "price": 450000,
    "image": "/assets/images/cars/rolls_royce_phantom.jpg",
    "category": "Cars",
    "desc": "Unparalleled luxury and comfort, a symbol of ultimate refinement and prestige."
  },
  {
    "id": "8",
    "name": "Private Island in the Bahamas",
    "price": 50000000,
    "image": "/assets/images/real_estate/bahamas_island.jpeg",
    "category": "Real Estate",
    "desc": "An exclusive private island with pristine beaches and crystal-clear waters."
  },
  {
    "id": "9",
    "name": "Limited Edition Silk Suit",
    "price": 12000,
    "image": "/assets/images/suits/silk_suit.jpeg",
    "category": "Suits",
    "desc": "An exclusive suit made from the rarest silk, a true statement of luxury."
  },
  {
    "id": "10",
    "name": "Lamborghini Aventador SVJ",
    "price": 550000,
    "image": "/assets/images/cars/lamborghini_aventador_svj.jpg",
    "category": "Cars",
    "desc": "A track-focused supercar with breathtaking performance and a striking design."
  },
  {
    "id": "11",
    "name": "Historic Estate in Tuscany",
    "price": 18000000,
    "image": "/assets/images/real_estate/tuscany_estate.jpeg",
    "category": "Real Estate",
    "desc": "A beautifully restored historic estate in the heart of Tuscany."
  },
  {
    "id": "12",
    "name": "Cashmere Blend Suit",
    "price": 6500,
    "image": "/assets/images/suits/cashmere_suit.jpeg",
    "category": "Suits",
    "desc": "A luxurious and comfortable suit, perfect for any occasion."
  },
  {
    "id": "13",
    "name": "Ferrari SF90 Stradale",
    "price": 600000,
    "image": "/assets/images/cars/ferrari_sf90_stradale.jpg",
    "category": "Cars",
    "desc": "A plug-in hybrid supercar with groundbreaking technology and electrifying performance."
  },
  {
    "id": "14",
    "name": "Modern Villa in Dubai",
    "price": 20000000,
    "image": "/assets/images/real_estate/dubai_villa.jpeg",
    "category": "Real Estate",
    "desc": "A contemporary villa with a private infinity pool and stunning views of the Dubai skyline."
  },
  {
    "id": "15",
    "name": "Loro Piana Wool Suit",
    "price": 7500,
    "image": "/assets/images/suits/loro_piana_suit.jpeg",
    "category": "Suits",
    "desc": "A suit crafted from the finest Loro Piana wool, known for its exceptional quality and softness."
  },
  {
    "id": "16",
    "name": "Bentley Continental GT",
    "price": 220000,
    "image": "/assets/images/cars/bentley_continental_gt.jpg",
    "category": "Cars",
    "desc": "A grand tourer that blends luxurious comfort with powerful performance."
  },
  {
    "id": "17",
    "name": "Brioni Bespoke Suit",
    "price": 9500,
    "image": "/assets/images/suits/brioni_suit.jpeg",
    "category": "Suits",
    "desc": "An impeccably tailored suit from the renowned Italian fashion house, Brioni."
  },
  {
    "id": "18",
    "name": "Aston Martin DBS Superleggera",
    "price": 330000,
    "image": "/assets/images/cars/aston_martin_dbs.jpg",
    "category": "Cars",
    "desc": "A powerful and elegant grand tourer with a handcrafted interior."
  },
  {
    "id": "19",
    "name": "Ermenegildo Zegna Couture Suit",
    "price": 8800,
    "image": "/assets/images/suits/zegna_suit.jpeg",
    "category": "Suits",
    "desc": "A sophisticated and luxurious suit from Ermenegildo Zegna's exclusive Couture line."
  },
  {
    "id": "20",
    "name": "Audi R8",
    "price": 180000,
    "image": "/assets/images/cars/audi_r8.jpg",
    "category": "Cars",
    "desc": "A mid-engine sports car with a naturally aspirated V10 engine and quattro all-wheel drive."
  },
  {
    "id": "21",
    "name": "Tom Ford Shelton Suit",
    "price": 7200,
    "image": "/assets/images/suits/tom_ford_suit.jpeg",
    "category": "Suits",
    "desc": "A stylish and modern suit with Tom Ford's signature sharp tailoring."
  },
  {
    "id": "22",
    "name": "Maserati MC20",
    "price": 230000,
    "image": "/assets/images/cars/maserati_mc20.jpeg",
    "category": "Cars",
    "desc": "A mid-engine supercar with a powerful V6 engine and a lightweight carbon fiber chassis."
  },
  {
    "id": "23",
    "name": "Kiton K-50 Suit",
    "price": 11000,
    "image": "/assets/images/suits/kiton_suit.jpeg",
    "category": "Suits",
    "desc": "A handcrafted suit from Kiton, known for its exceptional craftsmanship and lightweight construction."
  },
  {
    "id": "24",
    "name": "McLaren 765LT",
    "price": 380000,
    "image": "/assets/images/cars/mclaren_765lt.jpeg",
    "category": "Cars",
    "desc": "A track-focused supercar with a lightweight design and extreme performance."
  },
  {
    "id": "25",
    "name": "Ralph Lauren Purple Label Suit",
    "price": 6800,
    "image": "/assets/images/suits/ralph_lauren_suit.jpeg",
    "category": "Suits",
    "desc": "A classic and elegant suit from Ralph Lauren's prestigious Purple Label."
  },
  {
    "id": "26",
    "name": "Canali Exclusive Suit",
    "price": 7900,
    "image": "/assets/images/suits/canali_suit.jpeg",
    "category": "Suits",
    "desc": "A refined and stylish suit from Canali's exclusive collection, made with the finest materials."
  },
  {
    "id": "27",
    "name": "Isaia Napoli Suit",
    "price": 8500,
    "image": "/assets/images/suits/isaia_suit.jpeg",
    "category": "Suits",
    "desc": "A Neapolitan-style suit from Isaia, known for its soft tailoring and vibrant fabrics."
  },
  {
    "id": "28",
    "name": "Corneliani ID Suit",
    "price": 7100,
    "image": "/assets/images/suits/corneliani_suit.jpeg",
    "category": "Suits",
    "desc": "A modern and versatile suit from Corneliani's ID line, perfect for the contemporary gentleman."
  },
  {
    "id": "29",
    "name": "Ozwald Boateng Bespoke Suit",
    "price": 10500,
    "image": "/assets/images/suits/ozwald_boateng_suit.jpeg",
    "category": "Suits",
    "desc": "A uniquely designed bespoke suit from the iconic British tailor, Ozwald Boateng."
  },
  {
    "id": "30",
    "name": "Dior Homme Suit",
    "price": 9200,
    "image": "/assets/images/suits/dior_homme_suit.jpeg",
    "category": "Suits",
    "desc": "A sleek and contemporary suit from Dior Homme, embodying modern elegance."
  },
  {
    "id": "31",
    "name": "Luxury Ski Chalet in Aspen",
    "price": 35000000,
    "image": "/assets/images/real_estate/aspen_chalet.jpeg",
    "category": "Real Estate",
    "desc": "A magnificent ski chalet in Aspen, Colorado, with direct ski-in/ski-out access and breathtaking mountain views."
  },
  {
    "id": "32",
    "name": "Historic Chateau in the Loire Valley",
    "price": 22000000,
    "image": "/assets/images/real_estate/loire_valley_chateau.jpeg",
    "category": "Real Estate",
    "desc": "A beautifully preserved historic chateau in the picturesque Loire Valley, France."
  },
  {
    "id": "33",
    "name": "Oceanfront Estate in Malibu",
    "price": 40000000,
    "image": "/assets/images/real_estate/malibu_estate.jpeg",
    "category": "Real Estate",
    "desc": "A stunning oceanfront estate in Malibu, California, with panoramic views of the Pacific Ocean."
  },
  {
    "id": "34",
    "name": "Vineyard Estate in Napa Valley",
    "price": 28000000,
    "image": "/assets/images/real_estate/napa_valley_vineyard.jpeg",
    "category": "Real Estate",
    "desc": "A sprawling vineyard estate in Napa Valley, California, with a private winery and luxurious residence."
  },
  {
    "id": "35",
    "name": "Mountain Retreat in the Swiss Alps",
    "price": 19000000,
    "image": "/assets/images/real_estate/swiss_alps_retreat.jpeg",
    "category": "Real Estate",
    "desc": "A secluded mountain retreat in the Swiss Alps, offering privacy, tranquility, and stunning alpine scenery."
  },
  {
    "id": "36",
    "name": "Modern Loft in Tribeca, New York",
    "price": 12000000,
    "image": "/assets/images/real_estate/tribeca_loft.jpeg",
    "category": "Real Estate",
    "desc": "A stylish and spacious modern loft in the trendy Tribeca neighborhood of New York City."
  },
  {
    "id": "37",
    "name": "Beachfront Villa in Phuket",
    "price": 16000000,
    "image": "/assets/images/real_estate/phuket_villa.jpeg",
    "category": "Real Estate",
    "desc": "A luxurious beachfront villa in Phuket, Thailand, with a private pool and direct access to the beach."
  },
  {
    "id": "38",
    "name": "Riad in Marrakech",
    "price": 8000000,
    "image": "/assets/images/real_estate/marrakech_riad.jpeg",
    "category": "Real Estate",
    "desc": "A beautifully restored traditional riad in the heart of Marrakech, Morocco."
  },
  {
    "id": "39",
    "name": "Country Estate in the Cotswolds",
    "price": 14000000,
    "image": "/assets/images/real_estate/cotswolds_estate.jpeg",
    "category": "Real Estate",
    "desc": "A charming country estate in the picturesque Cotswolds region of England."
  },
  {
    "id": "40",
    "name": "Penthouse in Sydney Harbour",
    "price": 25000000,
    "image": "/assets/images/real_estate/sydney_harbour_penthouse.jpeg",
    "category": "Real Estate",
    "desc": "A luxurious penthouse with breathtaking views of Sydney Harbour and the iconic Opera House."
  }
]