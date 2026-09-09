# MicroPlugins — Official Website

> **High-Performance WordPress Plugins — From Flagship Powerhouses to Surgical Micro-Tools.**

This is the static business website for **MicroPlugins**, built according to the specifications in [`microplugins-website-brief.md`](microplugins-website-brief.md) and tailored for our current active flagship plugins and micro-utilities.

---

## 🚀 Key Features & Architectural Highlights

- **Active Flagship Suites**:
  - **Ultimate Media Player and Playlist**: Next-generation audio/video player with anti-piracy dynamic watermarks, Bunny.net adaptive HLS streaming, in-video lead gates, and cookieless analytics.
  - **Ultimate Popup Maker**: Enterprise-grade multi-layer visual canvas popup builder with sequenced 60fps animations, integrated leads CRM, and zero jQuery (<20KB Vanilla JS runtime).
- **100% Static HTML Output**: Real semantic HTML in every response. No client-side-only rendering shells. Fully crawlable and indexable by search engine bots.
- **Zero Heavy Frameworks**: Vanilla HTML5, modern modular CSS (design tokens, flexbox, CSS grid), and lightweight zero-dependency JavaScript.
- **Modern Minimalist Slate Aesthetic**: Restrained dark-slate theme (`#090D16`, `#131B2E`) with Electric Indigo (`#3B82F6`) and Emerald (`#10B981`) accents.
- **Fully Responsive**: Mobile-first responsive navigation drawer, flexible multi-column cards, adaptive comparison tables, and touch-friendly controls.
- **SEO & Structured Data (JSON-LD)**:
  - `Organization` & `WebSite` on `index.html`
  - `SoftwareApplication` & `Product` on all plugin detail pages
  - `Article` on all technical blog posts
  - `FAQPage` on `faq.html`
  - Valid `sitemap.xml` and `robots.txt`
- **Accessible (WCAG AA)**: Skip links, keyboard-visible focus rings, aria expanded/controls states, high-contrast typography, and semantic HTML5 tags.

---

## 📁 Directory Structure

```text
microplugins/
├── index.html                   # Home page (Hero, metrics, comparison, testimonials)
├── about.html                   # About & engineering philosophy for WordPress
├── plugins.html                 # Plugins directory with live search & category filters
├── docs.html                    # Documentation Directory & Hub
├── docs/                        # Dedicated single documentation files per plugin
│   ├── ultimate-media-player-and-playlist.html  # Media Player docs & shortcode reference
│   └── ultimate-popup-maker.html                # Popup Maker docs & animation pipeline
├── blog.html                    # Blog and technical resource articles index
├── faq.html                     # Categorized FAQ with interactive accordions
├── contact.html                 # Lead capture & support inquiry form
├── privacy.html                 # Privacy Policy (draft for legal review)
├── terms.html                   # Terms of Service (draft for legal review)
├── refund-policy.html           # Refund Policy (14-day guarantee & terms)
├── 404.html                     # Custom 404 error page
├── sitemap.xml                  # XML sitemap with priorities & changefreq
├── robots.txt                   # Search crawler directives
├── assets/
│   ├── css/
│   │   └── main.css             # Unified modern CSS design system
│   ├── js/
│   │   └── main.js              # Vanilla JS (nav drawer, filters, accordions, copy)
│   └── images/
│       ├── logo-256.png # Official MicroPlugins brand logo
│       ├── favicon-64.png             # Site favicon (64x64)
│       ├── favicon-128.png            # Site favicon (128x128)
│       ├── favicon-256.png            # Site favicon (256x256)
│       └── favicon.ico                # Root & assets favicon ICO
├── plugins/
│   ├── ultimate-media-player-and-playlist.html  # Ultimate Media Player detail page
│   └── ultimate-popup-maker.html                # Ultimate Popup Maker detail page
└── blog/
    ├── why-micro-plugins-beat-all-in-one-suites.html
    ├── optimizing-wordpress-asset-loading.html
    └── auditing-database-bloat-in-wordpress.html
```

---

## 💻 Local Development & Preview

Because this site is built with pure static standards, you can preview it immediately without installing any build tools or dependencies:

### Option 1: Python Built-in Server
```bash
# In the project root directory
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code / IDE Live Server
Right click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages
1. Push this repository to GitHub on branch `main`.
2. In your repository settings, go to **Settings &rarr; Pages**.
3. Under **Build and deployment &rarr; Source**, choose **Deploy from a branch**.
4. Set the branch to `main` and folder to `/(root)`.
5. Click **Save**. Your site will be live within seconds at `https://<username>.github.io/<repo>/`.

### Deploy to Netlify
- Drag and drop the `microplugins` folder directly into [Netlify Drop](https://app.netlify.com/drop), or connect your GitHub repository with build command left blank and publish directory set to `.`.

### Deploy to Vercel
- Import the git repository and deploy with framework preset set to **Other** (Static).

### Traditional Web Hosting (cPanel / Apache / Nginx)
- Simply upload the contents of this folder to your web root (e.g. `public_html/` or `/var/www/html/`).

---

## ✏️ Customization & Next Steps

When ready to tailor the placeholder links for production:
- **Plugin Distribution & Update Server**: Connect your payment and license delivery gateway (e.g., Freemius, Lemon Squeezy, or custom license server) for automated ZIP delivery and 1-click dashboard updates.
- **Pricing & Checkout Links**: Link the pricing CTA buttons to your payment processor.
- **Legal Review**: Have legal counsel review the standard drafts in `privacy.html`, `terms.html`, and `refund-policy.html`.
