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
Use Tailwind's palettes with these roles:

| Role | Classes |
|---|---|
| Page background | `bg-gray-900` |
| Surface (cards, blocks, header, footer) | `bg-slate-800` |
| Highlighted surface (e.g. the visitor's OS column) | `bg-slate-600` |
| Text | `text-gray-50` (primary), `text-gray-300`/`text-slate-400` (secondary) |
| Borders | `border-slate-700` |
| Accent text and links | `text-orange-500` |
| Accent fills (download buttons, completed steps) | `bg-orange-600` |
| Primary call to action | white on dark: `bg-gray-50 text-gray-900` (hero), or gradient `from-orange-600 to-orange-500` |
| Focus ring | `focus:ring-2 focus:ring-blue-400` |

**Signature gradient**: `bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500` with the `gradient-animate` class
([main.scss](assets/scss/main.scss), 5 s loop). It frames the product only: the hero and the media side of the feature cards.
Don't use it for text, buttons or backgrounds of whole sections.

### Typography

Ubuntu (400 and 700, Google Fonts) for everything.

| Use | Classes |
|---|---|
| Page title (h1) | `text-5xl font-bold` |
| Section title (h2) | `text-4xl`–`text-5xl font-bold`, centered |
| Card title | `text-3xl font-bold` |
| Lead / subtitle | `text-2xl` (sections), `text-xl` (cards) |
| Body | `text-lg` |
| Labels (table headers) | `uppercase`, default size |

Line breaks (`<br>`) in titles and subtitles are deliberate: keep them balanced at desktop width.

### Shape and spacing

- Radius: `rounded-3xl` for sections and cards, `rounded-2xl`/`rounded-xl` for buttons, `rounded-lg` for small controls.
- Content width: `max-w-screen-xl px-4`, given by `BasePageContent`.
- Vertical rhythm between home sections: `mb-16 lg:mb-32`; inner padding of cards `p-6` to `p-12`.
- Mobile first: one column, `lg:` switches to the desktop layout.

### Iconography

- **Antares icons** ([AntaresIcon.vue](components/theme-editor/AntaresIcon.vue), generated set) for anything that is part of the product:
  database engines (`brand:*`), app objects and actions. They follow `currentColor` and have their own duotone style.
- **Tabler icons** (`vue-tabler-icons`) for generic site UI: download, external link, brand of social networks, value blocks.
- No raw SVG or PNG files for icons that exist in either set. Sizes: 24 in buttons, 44–64 for section icons.

### Motion

- Sections fade in with AOS: `data-aos="fade-in" data-aos-duration="1500"`, staggered with `data-aos-delay` in steps of 200 ms.
- Videos play only while visible (`useElementVisibility`), muted and looped.
- The gradient animation is the only continuous motion on the page.

## Components

| Component | Use |
|---|---|
| `BasePageContainer` | Shell with header and footer (applied by `app.vue`) |
| `BasePageContent` | Width-limited content area of every page |
| `BaseCard` | Feature card: text on one side, framed video or image on the other (`mediaPosition` alternates left/right) |
| `BaseGrid` | Row of value blocks (icon, title, text) |
| `BaseStepper` | Supported databases timeline: `complete` steps are orange, coming ones gray |
| `BaseButton` | Button with `primary`/`secondary`/`plain`/`link` styles and a loading state (not used yet: prefer it to new ad hoc buttons) |
| `NotFound` | 404 content |

Download buttons are small orange icon buttons (`bg-orange-600 rounded-2xl p-1`) with a `title` that names the file.
Store badges (Microsoft Store, Flathub, Snap, AUR) use the official badge images, 56 px high.

## Media

- **Videos**: recorded with `scripts/videos/` (see AGENTS.md). WebM VP8, 30 fps, default app theme, window 1280×800.
  The hero shows the whole window; cards show a crop of the area where the action happens (about 930×680), so text stays
  readable at half the page width. 12–22 s, under 2 MB, no audio, a fake cursor with a click ripple, keycap badges for shortcuts.
- Data on screen: the sample databases (sakila, pagila, chinook...), neutral connection names, no personal paths or hosts.
- A still frame of the hero (`public/images/main.png`) is the fallback when video is unsupported.
- Images get a meaningful `alt`; decorative ones `alt=""`.

## Theme editor

`/theme-editor` is a tool, not a marketing page: it has its own compact look that mirrors the app (scoped `.te-*` styles,
`slate` palette, Antares icons) and no header/footer. Don't apply the site's large type, gradients or AOS there.

## Accessibility

- Every interactive element is reachable with the keyboard and shows the focus ring.
- Icon-only links and buttons have a `title` (and, when the icon carries meaning, an accessible name).
- Keep text contrast at least WCAG AA on the dark surfaces (`text-gray-300` is the dimmest text for body copy).
- External links: `target="_blank"` with `rel="nofollow"` (or `noopener`).

## Known gaps

Current inconsistencies, to fix when touching these areas (and not to copy):

- The header links use `lg:hover:text-primary-700`, a class of a palette that does not exist.
- `BaseButton` is unused while the same buttons are written inline (`index.vue`, `NotFound.vue`, `downloads.vue`).
- The download tables repeat the same button markup three times.
- AOS and the gradient animation ignore `prefers-reduced-motion`.
- "MacOS" is written instead of "macOS".
- The About section of the home and the stepper header still describe the app as "in development state" and "in a beta phase".

## Checklist for UI changes

1. Colors, type and radius from the tables above; no new palette without updating this file.
2. Reuse a `Base*` component or extract one if the pattern repeats.
3. Product visuals (icons, screenshots, videos) come from the current app.
4. Check desktop and phone width, keyboard focus and the visitor-OS highlight on the downloads page.
5. `npm run lint`.
