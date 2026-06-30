// scripts/seed.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { PRODUCT_IMAGES } from "../lib/product-images";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String,
  processor: String,
  ram: String,
  storage: String,
  display: String,
  description: String,
  stock: Number,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const sampleProducts = [
  {
    name: "MacBook Pro 14\"",
    brand: "Apple",
    price: 1999,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg",
    processor: "Apple M3 Pro",
    ram: "18GB Unified",
    storage: "512GB SSD",
    display: "14.2\" Liquid Retina XDR",
    description: "The most advanced Mac laptops for demanding workflows. Stunning display, incredible performance, all-day battery.",
    stock: 25,
  },
  {
    name: "MacBook Air 15\"",
    brand: "Apple",
    price: 1299,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg",
    processor: "Apple M3",
    ram: "8GB Unified",
    storage: "256GB SSD",
    display: "15.3\" Liquid Retina",
    description: "Remarkably thin and light with the power of M3. Perfect for everyday productivity and creativity.",
    stock: 40,
  },
  {
    name: "XPS 15",
    brand: "Dell",
    price: 1649,
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/notebook-xps-15-9530-nt-blue-gallery-1.psd",
    processor: "Intel Core i7-13700H",
    ram: "16GB DDR5",
    storage: "512GB SSD",
    display: "15.6\" 3.5K OLED",
    description: "Premium Windows laptop with stunning OLED display and professional-grade performance.",
    stock: 18,
  },
  {
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1549,
    image: "https://p1-ofp.static.pub/ShareResource/na/sub-series/hero/lenovo-laptop-thinkpad-x1-carbon-gen-11-14-intel-hero.png",
    processor: "Intel Core i7-1355U",
    ram: "16GB LPDDR5",
    storage: "512GB SSD",
    display: "14\" 2.8K OLED",
    description: "The ultimate business laptop. Legendary keyboard, military-grade durability, ultra-light design.",
    stock: 30,
  },
  {
    name: "Spectre x360 14",
    brand: "HP",
    price: 1399,
    image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08944367.png",
    processor: "Intel Core Ultra 7",
    ram: "16GB",
    storage: "1TB SSD",
    display: "14\" 2.8K OLED Touch",
    description: "Versatile 2-in-1 convertible with gorgeous OLED touchscreen and premium build quality.",
    stock: 22,
  },
  {
    name: "ROG Zephyrus G14",
    brand: "ASUS",
    price: 1799,
    image: "https://dlcdnwebimgs.asus.com/gain/5A5E5E5E-5E5E-5E5E-5E5E-5E5E5E5E5E5E/w190",
    processor: "AMD Ryzen 9 8945HS",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    display: "14\" 165Hz QHD",
    description: "Compact gaming powerhouse with RTX graphics. Performance meets portability.",
    stock: 15,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log(`Seeded ${sampleProducts.length} products`);

  const adminEmail = "admin@laptopstore.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Created admin user: admin@laptopstore.com / admin123");
  } else {
    console.log("Admin user already exists");
  }

  const demoEmail = "demo@laptopstore.com";
  const existingDemo = await User.findOne({ email: demoEmail });

  if (!existingDemo) {
    const hashedPassword = await bcrypt.hash("demo123", 12);
    await User.create({
      name: "Demo User",
      email: demoEmail,
      password: hashedPassword,
      role: "user",
    });
    console.log("Created demo user: demo@laptopstore.com / demo123");
  } else {
    console.log("Demo user already exists");
  }

  await mongoose.disconnect();
  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
