# DESIGN.md

Visual language of antares-sql.app and the rules to keep it consistent. Read it before any UI change.
The site presents a desktop app: the app itself (videos, icons, theme editor) is the hero, the site frames it.
For the app's own design system see `DESIGN.md` in the antares repo.

## Principles

- **Show the real app.** Videos and icons come from the current app, never mockups or stock images; when the app changes, the media follow.
- **Dark, warm, calm.** A dark page with orange accents and one animated gradient that frames the product.
- **Few components, reused.** New sections are built from the `Base*` components; a new pattern becomes a component when it is used twice.
- **Honest copy.** Every claim matches the app README/CHANGELOG (see AGENTS.md).

## Foundations

### Color

The site is **dark only**: `app.vue` puts the `dark` class on the root, `light` variants are not maintained.
The roles have names in [tailwind.config.js](tailwind.config.js): use them instead of raw palette shades.

| Role | Classes |
|---|---|
| Page background | `bg-page` (gray-900) |
| Surface (cards, blocks, header, footer) | `bg-surface` (slate-800), `ring-1 ring-white/5` as edge |
| Raised surface (the visitor's OS column, secondary buttons) | `bg-surface-raised` (slate-700) |
| Text | `text-gray-50` (primary), `text-gray-200` (leads), `text-gray-300` (body), `text-gray-400` (labels) |
| Borders and dividers | `border-line`, `divide-white/5` |
| Accent text and links | `text-accent-500` (orange) |
| Accent fills (download buttons, completed steps) | `bg-accent-600`, hover `bg-accent-500` |
| Nightly builds | `purple-300`/`purple-500` tints, next to the orange of beta |
| Focus ring | `focus-visible:ring-2 focus-visible:ring-blue-400` |

**Signature gradient**: `bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500` with the `gradient-animate` class
([main.scss](assets/scss/main.scss), 5 s loop). It frames the product only: the hero, the media side of the feature cards and the 1 px border of the closing call to action.
Don't use it for text, buttons or backgrounds of whole sections. It stops with `prefers-reduced-motion`.

### Typography

Ubuntu (400, 500 and 700, Google Fonts) for everything; the system monospace for versions and code.

| Use | Classes |
|---|---|
| Page title (h1) | `text-4xl sm:text-5xl font-bold` |
| Section title (h2) | `text-4xl`–`text-5xl font-bold` |
| Eyebrow (small label above a title) | `text-sm font-bold uppercase tracking-widest text-accent-500` |
| Card title | `text-3xl font-bold` |
| Lead / subtitle | `text-2xl` (sections), `text-xl` (cards) |
| Body | `text-lg` |
| Group labels (download lists) | `text-sm font-bold uppercase tracking-widest text-gray-400` |

Line breaks in titles are for desktop only (`<br class="hidden lg:inline">`): on phones the text wraps by itself,
a forced break there leaves single words on a line.

### Shape and spacing

- Radius: `rounded-3xl` for sections and cards, `rounded-2xl`/`rounded-xl` for buttons, `rounded-lg` for small controls.
- Content width: `max-w-screen-xl px-4`, given by `BasePageContent`.
- Vertical rhythm between home sections: `py-20 lg:py-28` (`space-y-16 lg:space-y-24` in lists of cards); inner padding of cards `p-6` to `p-12`.
- The header is sticky: anchors get `scroll-padding-top` from main.scss.
- Mobile first: one column, `lg:` switches to the desktop layout.

### Iconography

- **Antares icons** ([AntaresIcon.vue](components/theme-editor/AntaresIcon.vue), generated set) for anything that is part of the product:
  database engines (`brand:*`), app objects and actions. They follow `currentColor` and have their own duotone style.
- **Tabler icons** (`vue-tabler-icons`) for generic site UI: download, external link, brand of social networks, value blocks.
- No raw SVG or PNG files for icons that exist in either set. Sizes: 24 in buttons, 44–64 for section icons.

### Motion

- Sections fade in once with AOS: `data-aos="fade-in" data-aos-duration="1500"`, staggered with `data-aos-delay` in steps of 200 ms.
- Videos play only while visible (`AppFrame`), muted and looped.
- Hover feedback is small: `transition`, a lift of `hover:-translate-y-1` or a ring tinted with the accent.
- The gradient animation is the only continuous motion. With `prefers-reduced-motion` AOS is off, the gradient stops
  and videos don't play (their poster stays).

## Components

| Component | Use |
|---|---|
| `BasePageContainer` | Shell with header and footer (applied by `app.vue`) |
| `BasePageContent` | Width-limited content area of every page |
| `BaseButton` | Every button and button-like link (`to`: internal path or external URL). Variants `primary` (orange gradient), `light` (white, on the hero gradient), `secondary` (raised surface), `ghost` (outlined, on gradients); sizes `sm`/`md`/`lg` |
| `AppFrame` | Frame of app media: a video with poster (plays while visible) or a still image, with window shadow and ring; `rounded` takes the corner classes so it can bleed off an edge |
| `BaseCard` | Feature card: eyebrow, title, subtitle and content on one side, the `AppFrame` over the gradient on the other (`mediaPosition` alternates right/left) |
| `BaseGrid` | Row of value blocks (Tabler icon in accent, title, text) |
| `BaseStepper` | Supported databases timeline: `complete` steps are orange, coming ones gray |
| `DownloadPlatform` | Download column of an OS: groups (Stable with its version, Pre-release with beta/nightly badges), rows with a download icon button, a slot for store badges; `current` highlights the visitor's OS (first on phones) |
| `NotFound` | 404 content |

Download buttons are 36 px orange icon buttons with a `title` and screen reader text that name the file.
Store badges (Microsoft Store, Flathub, Snap, AUR) use the official badge images, 48 px high (`h-12`).

## Media

- **Videos**: recorded with `scripts/videos/` (see AGENTS.md). WebM VP8, 30 fps, default app theme, window 1280×800.
  The hero shows the whole window; cards show a crop of the area where the action happens (about 930×680), so text stays
  readable at half the page width. 12–22 s, under 2 MB, no audio, a fake cursor with a click ripple, keycap badges for shortcuts.
- Data on screen: the sample databases (sakila, pagila, chinook...), neutral connection names, no personal paths or hosts.
- Every video has a **poster** in `public/images/posters/` (WebP, a meaningful frame: results on screen, a finished dialog).
  It shows before the video loads (`preload="none"`, `metadata` for the hero), on phones instead of the hero video and with reduced motion.
- Theme previews in `public/images/themes/` are the `preview.png` of the gallery (antares-sql/themes), converted to WebP.
- `public/images/og.png` (1200×630) is the link preview image: logo, tagline and the hero poster over the gradient.
- Images get a meaningful `alt`; decorative ones `alt=""`.

## Theme editor

`/theme-editor` is a tool, not a marketing page: it has its own compact look that mirrors the app (scoped `.te-*` styles,
`slate` palette, Antares icons) and no header/footer. Don't apply the site's large type, gradients or AOS there.

## Accessibility

- Every interactive element is reachable with the keyboard and shows the focus ring.
- Icon-only links and buttons have a `title` (and, when the icon carries meaning, an accessible name).
- Keep text contrast at least WCAG AA on the dark surfaces (`text-gray-300` is the dimmest text for body copy).
- External links: `target="_blank"` with `rel="nofollow"` (or `noopener`).

## Writing

- English, direct, short sentences. "Antares SQL" (or "Antares"), "macOS", "MySQL/MariaDB", "Firebird SQL".
- Feature claims match the app README/CHANGELOG; supported and coming databases match the app README.

## Checklist for UI changes

1. Colors (named roles), type and radius from the tables above; no new palette without updating this file.
2. Reuse a component (`BaseButton`, `AppFrame`, `BaseCard`...) or extract one if the pattern repeats.
3. Product visuals (icons, screenshots, videos) come from the current app.
4. Check desktop and phone width (390 px), keyboard focus, reduced motion and the visitor-OS highlight on the downloads page.
5. `npm run lint`.
