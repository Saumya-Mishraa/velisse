import still from "@/assets/lipstick_rose_still.png";
import lineup from "@/assets/shade_lineup.jpg";
import gloss from "@/assets/gloss_silk.jpg";
import swatch from "@/assets/texture_swatch.jpg";
import muse from "@/assets/muse_portrait.png";

export const images = { still, lineup, gloss, swatch, muse };

export type Category = "Lipstick" | "Lip Gloss" | "Complexion" | "Sets";
export type Shade = { name: string; color: string };
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  collection: "Rouge Absolu" | "Velours Nude" | "Soie Lumière";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  shades: Shade[];
  finish: string;
  description: string;
  notes: string[];
};

export const products: Product[] = [
  {
    id: "rouge-absolu-satin",
    name: "Rouge Absolu",
    subtitle: "Satin Lipstick",
    category: "Lipstick",
    collection: "Rouge Absolu",
    price: 2450,
    rating: 4.9,
    reviews: 1284,
    image: images.still,
    gallery: [images.still, images.swatch, images.muse],
    shades: [
      { name: "Bordeaux Night", color: "#6b1020" },
      { name: "Scarlet Rose", color: "#a3122a" },
      { name: "Black Cherry", color: "#4a0d18" },
    ],
    finish: "Satin",
    description:
      "Our signature bullet. Saturated wine pigment cushioned in rosehip oil for colour that stays vivid and lips that stay soft for up to twelve hours.",
    notes: ["Rosehip & camellia oil", "12-hour wear", "Refillable gold case"],
  },
  {
    id: "velours-nude-matte",
    name: "Velours Nude",
    subtitle: "Soft Matte Lipstick",
    category: "Lipstick",
    collection: "Velours Nude",
    price: 2250,
    rating: 4.8,
    reviews: 942,
    image: images.lineup,
    gallery: [images.lineup, images.swatch],
    shades: [
      { name: "Petal", color: "#c58f8a" },
      { name: "Rosewood", color: "#b2606f" },
      { name: "Plum", color: "#5e2a3e" },
    ],
    finish: "Soft matte",
    description:
      "A blurred, velvet matte that never dries. Weightless powders melt into a second-skin finish in five wearable shades of nude to plum.",
    notes: ["Hyaluronic spheres", "Transfer-resistant", "Vegan formula"],
  },
  {
    id: "soie-lumiere-gloss",
    name: "Soie Lumière",
    subtitle: "Lacquer Lip Gloss",
    category: "Lip Gloss",
    collection: "Soie Lumière",
    price: 1950,
    rating: 4.7,
    reviews: 611,
    image: images.gloss,
    gallery: [images.gloss, images.swatch],
    shades: [
      { name: "Iced Wine", color: "#7a1626" },
      { name: "Honey Rose", color: "#c46b72" },
    ],
    finish: "Mirror shine",
    description:
      "A glass-like lacquer with the cushion of a balm. Non-sticky, plumping and luminous, layered alone or over Rouge Absolu.",
    notes: ["Squalane & peptides", "Non-sticky", "Cooling applicator"],
  },
  {
    id: "voile-poudre-compact",
    name: "Powder Veil",
    subtitle: "Pressed Setting Powder",
    category: "Complexion",
    collection: "Soie Lumière",
    price: 2850,
    rating: 4.8,
    reviews: 388,
    image: images.gloss,
    gallery: [images.gloss],
    shades: [
      { name: "Ivory", color: "#ead2bb" },
      { name: "Sand", color: "#cfa883" },
      { name: "Amber", color: "#9c6c48" },
    ],
    finish: "Soft focus",
    description:
      "A silk-milled veil that blurs and sets without flattening. Housed in a mirrored gold compact made to be refilled.",
    notes: ["Silk powder", "Blurs texture", "Refillable compact"],
  },
  {
    id: "cerise-noire-satin",
    name: "Black Cherry",
    subtitle: "Satin Lipstick · Limited",
    category: "Lipstick",
    collection: "Rouge Absolu",
    price: 2650,
    rating: 5.0,
    reviews: 207,
    image: images.still,
    gallery: [images.still, images.muse],
    shades: [{ name: "Black Cherry", color: "#3f0a15" }],
    finish: "Satin",
    description:
      "The deepest shade in our Rouge Absolu family, a black-cherry wine with a whisper of gold pearl. Limited edition.",
    notes: ["Gold pearl reflect", "12-hour wear", "Limited edition"],
  },
  {
    id: "atelier-trio-set",
    name: "The Lip Wardrobe",
    subtitle: "Lip Wardrobe Gift Set",
    category: "Sets",
    collection: "Velours Nude",
    price: 5990,
    rating: 4.9,
    reviews: 154,
    image: images.lineup,
    gallery: [images.lineup, images.still, images.gloss],
    shades: [{ name: "Day to Night", color: "#8e2a3b" }],
    finish: "Mixed",
    description:
      "Three full-size icons: Velours Nude in Petal, Rouge Absolu in Bordeaux Night and Soie Lumière in Iced Wine, in a keepsake case.",
    notes: ["3 full sizes", "Keepsake case", "Save 15% on the trio"],
  },
  {
    id: "baume-rose-balm",
    name: "Rose Balm",
    subtitle: "Tinted Lip Treatment",
    category: "Lipstick",
    collection: "Velours Nude",
    price: 1650,
    rating: 4.6,
    reviews: 503,
    image: images.swatch,
    gallery: [images.swatch, images.lineup],
    shades: [
      { name: "Rosé", color: "#c9787d" },
      { name: "Garnet", color: "#7e2232" },
    ],
    finish: "Sheer balm",
    description:
      "An overnight-worthy balm with a sheer wash of rose. Repairs, cushions and gives lips their own colour, only better.",
    notes: ["Shea & rose wax", "Sheer tint", "Overnight repair"],
  },
  {
    id: "vin-glace-gloss",
    name: "Iced Wine",
    subtitle: "Lacquer Lip Gloss",
    category: "Lip Gloss",
    collection: "Soie Lumière",
    price: 1950,
    rating: 4.8,
    reviews: 296,
    image: images.gloss,
    gallery: [images.gloss, images.swatch],
    shades: [{ name: "Iced Wine", color: "#6e1322" }],
    finish: "Mirror shine",
    description:
      "Soie Lumière in its most wanted shade, a frozen-wine lacquer that catches light like candlelight on crystal.",
    notes: ["Squalane & peptides", "High shine", "Cooling applicator"],
  },
];

export const categories: Category[] = ["Lipstick", "Lip Gloss", "Complexion", "Sets"];
export const getProduct = (id: string) => products.find((p) => p.id === id);
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (n: number) => inr.format(n);
/** Complimentary shipping threshold and standard fee, in rupees. */
export const FREE_SHIPPING_MIN = 2000;
export const SHIPPING_FEE = 99;
export const shippingFor = (subtotal: number) => (subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE);
