// app/image-urls/page.tsx
"use client";

import { useState } from "react";

const TEMPLATE = `// lib/product-images.ts
export const PRODUCT_IMAGES = {
  macbookPro14: "https://YOUR_URL_HERE",
  macbookAir15: "https://YOUR_URL_HERE",
  macbookAir13: "https://YOUR_URL_HERE",
  dellXps15: "https://YOUR_URL_HERE",
  dellXps13Plus: "https://YOUR_URL_HERE",
  dellInspiron16: "https://YOUR_URL_HERE",
  hpSpectreX360: "https://YOUR_URL_HERE",
  hpVictus16: "https://YOUR_URL_HERE",
  hpEnvyx36015: "https://YOUR_URL_HERE",
  lenovoThinkPadX1: "https://YOUR_URL_HERE",
  lenovoLegionPro5: "https://YOUR_URL_HERE",
  lenovoYogaSlim7: "https://YOUR_URL_HERE",
  lenovoIdeaPadSlim5: "https://YOUR_URL_HERE",
  asusRogZephyrusG14: "https://YOUR_URL_HERE",
  asusZenbook14: "https://YOUR_URL_HERE",
  asusTufGamingA15: "https://YOUR_URL_HERE",
  msiStealth16: "https://YOUR_URL_HERE",
  msiModern14: "https://YOUR_URL_HERE",
  msiCreatorZ16: "https://YOUR_URL_HERE",
  acerSwiftGo14: "https://YOUR_URL_HERE",
  acerPredatorNeo16: "https://YOUR_URL_HERE",
  acerAspire7: "https://YOUR_URL_HERE",
  samsungGalaxyBook4: "https://YOUR_URL_HERE",
  surfaceLaptop5: "https://YOUR_URL_HERE",
  razerBlade14: "https://YOUR_URL_HERE",
  pixelbookGo: "https://YOUR_URL_HERE",
  lgGram16: "https://YOUR_URL_HERE",
  alienwareM16: "https://YOUR_URL_HERE",
  huaweiMateBookXPro: "https://YOUR_URL_HERE",
  gigabyteAero16: "https://YOUR_URL_HERE",
} as const;
`;

export default function ImageUrlsPage() {
  const [code] = useState(TEMPLATE);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-black/40">
        <h1 className="text-4xl font-semibold text-white">Product Image URL Mapping</h1>
        <p className="mt-3 text-slate-400">
          Paste your own image URLs into this template and then copy the result into <code className="rounded bg-slate-800 px-1 py-0.5">lib/product-images.ts</code>.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-950 p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-500">Code Template</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(code)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
            >
              Copy Template
            </button>
          </div>
          <pre className="max-h-[60vh] overflow-auto rounded-3xl bg-slate-950 p-4 text-sm text-slate-100">
            <code>{code}</code>
          </pre>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-950 p-6">
          <h2 className="text-2xl font-semibold text-white">How to use</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-400">
            <li>Open <code className="rounded bg-slate-800 px-1 py-0.5">lib/product-images.ts</code> in your editor.</li>
            <li>Replace each <code className="rounded bg-slate-800 px-1 py-0.5">https://YOUR_URL_HERE</code> with your actual image URL.</li>
            <li>Save the file and refresh the page to see updated product images.</li>
            <li>If a URL is broken, the product card will fall back to the placeholder image.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
