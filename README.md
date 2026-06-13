# Portfolio — Cyber / Endfield Theme

Portfolio pribadi bertema cyber / Endfield. Full custom brutalist design dengan animasi scroll-driven, hex-grid canvas, text scramble effects, dan holographic card interactions.

**Live site:** [malikfajar.me](https://malikfajar.me)

## Fitur

- Preloader dengan glitch progress bar & reveal animation
- Hex-grid canvas interaktif (mengikuti pergerakan mouse)
- Text scramble / decode effect pada navigasi dan heading
- Holographic project cards dengan 3D tilt
- Skills terminal dengan hex-cluster chart
- Smooth scroll (Lenis) + GSAP ScrollTrigger animations
- Custom cursor & scan lines overlay
- Terminal-style contact section

## Credits

Proyek ini dikembangkan bersama:

| Kontributor | Peran |
|-------------|--------|
| **Muhammad Malik Fajar El-Syarif** | Pemilik portfolio, konten, dan data profil |
| **Kimi AI** | Desain awal, spesifikasi teknis, dan scaffolding proyek |
| **Cursor AI** | Implementasi, integrasi data, dan penyempurnaan build |

## Struktur

```
├── README.md              # Dokumen ini
├── tech-spec.md           # Spesifikasi desain & animasi
└── app/                   # Aplikasi React (Vite)
    ├── src/
    │   ├── components/    # Komponen UI & layout
    │   ├── sections/      # Hero, Skills, Projects, Contact
    │   ├── hooks/         # Custom hooks (scramble, cursor, dll)
    │   └── App.tsx
    ├── public/
    ├── tailwind.config.js
    ├── vite.config.ts
    └── package.json
```

## Menjalankan secara lokal

```bash
cd app
npm install
npm run dev
```

Lint:

```bash
cd app
npm run lint
```

Build produksi:

```bash
cd app
npm run build
npm run preview
```

## Tech stack

- **React 19** + TypeScript
- **Vite 7**
- **Tailwind CSS 3**
- **GSAP 3** (ScrollTrigger) — animasi utama
- **Lenis** — smooth scroll
- **Radix UI** — primitive components
- **Lucide React** — ikon navigasi
- **shadcn/ui** — komponen UI berbasis Radix

## Dokumentasi tambahan

Lihat [tech-spec.md](./tech-spec.md) untuk detail implementasi animasi, daftar komponen, dan keputusan teknis.

## Lisensi

© Muhammad Malik Fajar El-Syarif. Kode dapat digunakan sebagai referensi; mohon cantumkan kredit jika di-fork.
