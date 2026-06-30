// lib/product-images.ts
/** Product image URLs matched to 30 laptop models */
export const PRODUCT_IMAGES = {
  macbookPro14: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&h=800&q=80",
  macbookAir15: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&h=800&q=80",
  macbookAir13: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&h=800&q=80",
  dellXps15: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&h=800&q=80",
  dellXps13Plus: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&h=800&q=80",
  dellInspiron16: "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=1200&h=800&q=80",
  hpSpectreX360: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&h=800&q=80",
  hpVictus16: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&h=800&q=80",
  hpEnvyx36015: "https://images.unsplash.com/photo-1527446200846-5a97b2560a3b?auto=format&fit=crop&w=1200&h=800&q=80",
  lenovoThinkPadX1: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&h=800&q=80",
  lenovoLegionPro5: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&h=800&q=80",
  lenovoYogaSlim7: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&h=800&q=80",
  lenovoIdeaPadSlim5: "https://images.unsplash.com/photo-1517433456455-f3d0a7f1f3bd?auto=format&fit=crop&w=1200&h=800&q=80",
  asusRogZephyrusG14: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&h=800&q=80",
  asusZenbook14: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1200&h=800&q=80",
  asusTufGamingA15: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=800&q=80",
  msiStealth16: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80",
  msiModern14: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=800&q=80",
  msiCreatorZ16: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=800&q=80",
  acerSwiftGo14: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&h=800&q=80",
  acerPredatorNeo16: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&h=800&q=80",
  acerAspire7: "https://images.unsplash.com/photo-1517957372054-5d572c5aae3f?auto=format&fit=crop&w=1200&h=800&q=80",
  samsungGalaxyBook4: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1200&h=800&q=80",
  surfaceLaptop5: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1200&h=800&q=80",
  razerBlade14: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=800&q=80",
  pixelbookGo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=800&q=80",
  lgGram16: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&h=800&q=80",
  alienwareM16: "https://images.unsplash.com/photo-1510414696678-2415ad8474aa?auto=format&fit=crop&w=1200&h=800&q=80",
  huaweiMateBookXPro: "https://images.unsplash.com/photo-1519708227418-c8fd9a5eaf16?auto=format&fit=crop&w=1200&h=800&q=80",
  gigabyteAero16: "https://images.unsplash.com/photo-1517705008128-8bfba2452f0d?auto=format&fit=crop&w=1200&h=800&q=80",
} as const;

/** Hero carousel — real model names + matching images for the home page */
export const HERO_LAPTOPS = [
  {
    name: 'MacBook Pro 14"',
    tagline: "M3 Pro · Liquid Retina XDR",
    image: PRODUCT_IMAGES.macbookPro14,
  },
  {
    name: "Dell XPS 15",
    tagline: "3.5K OLED · Intel Core i7",
    image: PRODUCT_IMAGES.dellXps15,
  },
  {
    name: "ROG Zephyrus G14",
    tagline: "Ryzen 9 · RTX Gaming",
    image: PRODUCT_IMAGES.asusRogZephyrusG14,
  },
  {
    name: "ThinkPad X1 Carbon",
    tagline: "Business · Ultra-light",
    image: PRODUCT_IMAGES.lenovoThinkPadX1,
  },
] as const;

export const PROMO_IMAGES = {
  ultrabook: PRODUCT_IMAGES.macbookAir15,
  gaming: PRODUCT_IMAGES.asusRogZephyrusG14,
} as const;

export const BRANDS = [
  { name: "Apple", slug: "Apple", color: "from-gray-900 to-gray-700" },
  { name: "Dell", slug: "Dell", color: "from-blue-900 to-blue-700" },
  { name: "HP", slug: "HP", color: "from-indigo-900 to-indigo-700" },
  { name: "Lenovo", slug: "Lenovo", color: "from-red-900 to-red-700" },
  { name: "ASUS", slug: "ASUS", color: "from-purple-900 to-purple-700" },
  { name: "MSI", slug: "MSI", color: "from-orange-900 to-orange-700" },
  { name: "Acer", slug: "Acer", color: "from-green-900 to-green-700" },
  { name: "Samsung", slug: "Samsung", color: "from-cyan-900 to-cyan-700" },
] as const;
