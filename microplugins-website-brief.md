# Website Build Prompt — MicroPlugins

Use this prompt as-is with an AI coding tool (e.g. Claude Code) or hand it to a developer/designer as a project brief.

---

## Prompt

Build a modern, fully **static** business website for a company called **MicroPlugins**. The site must be crawlable and indexable by search engines — no client-side-only rendering of core content (no SPA that loads text via JavaScript after the fact). Use static HTML generated at build time (plain HTML/CSS/JS, or a static-site generator such as Astro, Eleventy, Hugo, or Next.js with static export). Every page must have real HTML content in the initial server response.

### 1. Brand & Positioning
- **Company name:** MicroPlugins
- **What we do:** Develop WordPress plugins
- **Target audience:** WordPress site owners, developers, and agencies
- **Tone:** professional, clean, approachable — not corporate/stiff, not overly playful
- **Tagline:** [Fill in, or ask for 3 tagline options]

### 2. Design Direction
- Modern, minimal aesthetic: generous whitespace, clear visual hierarchy, restrained color palette (1 primary + 1 accent + neutrals)
- Distinctive typography — avoid default system-font look; pair a strong display/heading font with a readable body font
- Fully responsive (mobile, tablet, desktop) with a mobile-first layout
- Consistent, reusable components: header/nav, footer, buttons, cards, section dividers
- Subtle motion only (hover states, fade-ins) — nothing that delays content rendering or hurts performance
- Accessible: semantic HTML5, sufficient color contrast (WCAG AA), keyboard-navigable, alt text on all images

### 3. Required Pages

| Page | Purpose | Key content |
|---|---|---|
| **Home** | First impression, value prop | Hero with headline + CTA, key benefits/features, product/plugin highlights, social proof (logos/testimonials), secondary CTA |
| **About** | Build trust | Company story, mission, team (optional), why "micro" plugins / philosophy |
| **Products / Plugins** | Core offering | Overview grid of plugins, each with its own detail page: description, features, screenshots, WordPress version/PHP compatibility, changelog, install instructions (WP admin search vs. manual upload), and a link to the WordPress.org listing if free/freemium |
| **Pricing** | Conversion | Plan tiers (e.g. free / single-site / multi-site or agency license), feature comparison table, renewal/support terms, FAQ snippet, CTA |
| **Blog / Resources** | SEO + authority | List of articles with clean URLs, publish dates, categories/tags (e.g. WordPress tips, plugin tutorials, changelogs); individual post template |
| **Documentation / Support** | Reduce friction post-purchase | Getting-started/installation guide, per-plugin setup docs, FAQs, support ticket/contact options, links to WordPress.org support forum if applicable |
| **FAQ** | Pre-sale objection handling | Common questions on WordPress/PHP compatibility, licensing (single vs. multi-site), updates, support, refunds |
| **Contact** | Lead capture | Contact form, email, (optional) address/social links |
| **Privacy Policy** | Legal/trust | Standard privacy policy (placeholder text, mark as "to be reviewed by legal") |
| **Terms of Service** | Legal | Standard terms (placeholder text, mark as "to be reviewed by legal") |
| **404 Page** | UX | On-brand "page not found" with nav back to Home/Products |

### 4. SEO & Technical Requirements
- Fully static HTML output — view-source must show real page content, not an empty shell
- Unique, descriptive `<title>` and `<meta name="description">` per page
- Proper heading hierarchy (one `<h1>` per page, logical `<h2>`/`<h3>` nesting)
- Open Graph + Twitter Card meta tags for social sharing previews
- Structured data (JSON-LD) for Organization on the homepage, and Product/SoftwareApplication schema on plugin pages
- `sitemap.xml` and `robots.txt` generated automatically
- Clean, human-readable URLs (e.g. `/plugins/plugin-name`, not query strings)
- Fast load performance: optimized/compressed images with modern formats (WebP/AVIF), minimal render-blocking JS/CSS, lazy-load below-the-fold images
- HTTPS-ready, favicon set, and a proper 404 status for the not-found page
- Internal linking between related pages (e.g. plugin pages → docs, blog posts → products)
- Fully responsive meta viewport tag

### 5. Content Guidelines
- Write real, benefit-focused copy for every page (not lorem ipsum) — flag any section where you need more input from me (e.g. actual plugin names/features, pricing numbers, team bios)
- Keep paragraphs short and scannable; use bullet points for feature lists
- Every CTA should be specific ("Get Started Free", "See Plans") rather than generic ("Click Here")

### 6. Deliverables
- Full static site source (pages, components/partials, styles, assets)
- Generated `sitemap.xml` and `robots.txt`
- Brief README on how to build/deploy the static output

---

### Notes for you before sending this
Still worth filling in: your actual plugin names/features, tagline, and pricing model (free/freemium/paid tiers, single-site vs. multi-site licensing) — the more specific you are, the less generic the output will be. If you'd like, I can also draft the actual page copy or generate the site itself right here.
