# Redesign Instructions: Links Page

Use this document to restyle the **Links** project (a link-in-bio page for all social profiles) so it matches the design language of the main portfolio. It is written for a developer or an AI coding agent. Follow it as a spec.

## 1. Goal

Turn the Links page into a calm, minimal, single-purpose page that feels like part of the same brand as the portfolio:

- One centered column, no clutter.
- Navy and white palette, Inter typeface, subtle borders, soft shadows.
- Light and dark themes.
- Fast, accessible, no framework, no build step.

Do not add features beyond this document. Keep the existing links and content, and change presentation and behavior only.

## 2. Tech Constraints

- Plain HTML, Tailwind CSS via CDN, vanilla JavaScript (ES modules).
- Font Awesome 6 for icons (brand icons for social platforms).
- Inter, weights 300 to 700, from Google Fonts.
- Tailwind config sets `darkMode: 'class'`, the `Inter` font family, and the `navy` color scale.
- All links live in a data file (`src/data/links.js`) and are rendered by JavaScript. Do not hardcode links in HTML.

## 3. Design Tokens

### Colors (light)

| Role | Value | Tailwind |
| --- | --- | --- |
| Page background | `#F8FAFC` | custom |
| Card surface | `#FFFFFF` | `bg-white` |
| Primary text | `#0F172A` | `text-slate-900` |
| Body text | | `text-slate-600` |
| Muted text | | `text-slate-500` (never lighter, for contrast) |
| Border | | `border-slate-200` |
| Divider | | `border-slate-100` |
| Primary button | `#0F172A` | `bg-slate-900 text-white hover:bg-slate-800` |

### Colors (dark)

Same slate family, inverted. Apply through a `.dark` class on `<html>`.

| Role | Value |
| --- | --- |
| Page background | `#0B1220` |
| Card surface | `#111C33` |
| Soft surface (hover, chips) | `#16213A` |
| Borders | `#26334f` (default), `#1b2740` (divider), `#334155` (strong) |
| Primary text | `#f1f5f9` |
| Body text | `#a8b3c7` |
| Muted text | `#94a3b8` |
| Primary button | background `#f1f5f9`, text `#0F172A` |

### Typography

- Family: Inter, fallback `system-ui, sans-serif`.
- Name: `text-xl font-bold tracking-tight`.
- Role or tagline: `text-sm font-medium text-slate-600`.
- Link title: `text-sm font-semibold text-slate-900`.
- Link description: `text-xs text-slate-500`.
- Minimum text size is 12px.
- Use `text-wrap: balance` on headings.

### Shape and spacing

- Cards: `rounded-xl border border-slate-200 shadow-sm`.
- Buttons and inputs: `rounded-lg`.
- Avatar: circular, `border-4 border-white`, `shadow-sm`.
- Page width: `max-w-md` (about 448px), centered, `px-4`, top padding `pt-12`, bottom `pb-16`.
- Vertical rhythm between link cards: `gap-3`.

## 4. Page Structure

```text
<body>
  Skip link
  Header (fixed, blurred)
    Logo (left) · Theme toggle (right)
    Scroll progress bar (optional, 2px)
  <main id="main-content">
    Profile block
      Avatar (clickable, opens full-size viewer)
      "Open to work" pill (optional)
      Name
      Role
      One-line tagline
    Social icon row (circular icon buttons)
    Links list (cards)
    Optional: "Visit portfolio" primary button
  </main>
  Footer (copyright, last updated)
  Toast
  Photo viewer dialog
</body>
```

## 5. Components

### 5.1 Header

- Fixed, `h-16`, `bg-white/90 backdrop-blur-md border-b border-slate-200`.
- Logo on the left, linked to the top of the page.
- Theme toggle on the right (moon in light mode, sun in dark mode), 36px square, `aria-pressed` and a clear `aria-label`.
- Use two logo images: `logo.png` with `dark:hidden` and `logo-white.png` with `hidden dark:block`. Mark the second `aria-hidden="true"` with empty `alt`.

### 5.2 Profile block

- Avatar is 128px, `object-cover`, with a subtle `hover:scale-105` transition.
- The avatar is a `<button>` that opens a full-size photo dialog (see 5.6).
- Optional status pill below the avatar: `inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium` with a small green dot that has a CSS `ping` animation. Text: "Open to work".
- Name, role, and a short tagline, all centered.

### 5.3 Link card

Each link is one full-width anchor styled as a card.

```text
[ icon tile ]  Title                    [ arrow ]
               Short description
```

- Layout: `flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4`.
- Icon tile: `w-10 h-10 rounded-lg bg-slate-100 text-slate-700`, centered Font Awesome icon.
- Arrow: `fa-arrow-up-right-from-square`, `text-xs text-slate-400`.
- Hover: `hover:border-slate-400 hover:bg-slate-50`, arrow turns `text-slate-700`, card lifts with `-translate-y-0.5` and a transition of 200ms.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Whole card is the focus target, with a visible focus ring (see 7).
- Never use platform brand colors for the cards. Keep everything navy and slate. Brand color, if any, is limited to the icon glyph.

Link data shape:

```js
export const links = [
  {
    title: "Portfolio",
    description: "Experience, projects, and CV",
    url: "https://example.com",
    icon: "fa-solid fa-briefcase",
    group: "Featured"      // optional, used for section labels
  }
];
```

### 5.4 Grouping (optional)

If there are more than about 6 links, group them with small uppercase labels:

- Label style: `text-xs font-bold uppercase tracking-wider text-slate-500`, with `mb-3` and `mt-8` between groups.
- Suggested groups: Featured, Social, Contact.

### 5.5 Social icon row

- Circular buttons, 36px: `rounded-full bg-slate-50 border border-slate-200 text-slate-600`.
- Hover: `bg-slate-900 text-white border-slate-900` (inverted in dark mode).
- Each has an `aria-label`. Include LinkedIn, GitHub, email, and Google Scholar where relevant.
- The email button copies the address to the clipboard and shows a toast (5.7). It swaps the icon to a check for 2 seconds.

### 5.6 Photo viewer

- Full-screen overlay: `fixed inset-0`, `bg-slate-900/80 backdrop-blur-sm`.
- Image centered, `max-h-[88vh]`, `object-contain`, `rounded-xl`.
- Close with the X button, a click on the backdrop, or `Esc`.
- On open, move focus to the close button. On close, return focus to the avatar.

### 5.7 Toast

- Fixed bottom right, `bg-slate-900 text-white rounded-lg px-4 py-3`.
- `role="status"` and `aria-live="polite"`.
- Slides up and fades in, auto-hides after 2 seconds. Clear the previous timer before showing a new toast.

### 5.8 Footer

- Centered, `text-xs text-slate-500`.
- Copyright with a dynamic year.
- Optional "Last updated" text.

## 6. Behavior

1. **Theme.** Add an inline script in `<head>` that reads `localStorage.theme`, falls back to `prefers-color-scheme`, and adds `dark` to `<html>` before first paint. The toggle saves the choice. Guard `localStorage` with `try/catch`.
2. **Reveal on scroll.** Cards fade in and rise 12px once, using `IntersectionObserver`, with a small stagger (about 50ms per card). Only enable it when JavaScript is available (add a `js` class to `<html>` in the head script).
3. **Render from data.** Build link cards and the social row from `links.js`. Escape all text before inserting it into `innerHTML`.
4. **Keyboard.** Everything is reachable by `Tab`. `Esc` closes any dialog.
5. **Optional command palette.** Only add it if the page has many links. Open with `⌘K`, `Ctrl K`, or `/`. List every link, filter as the user types, and open the selected one with `Enter`. Reuse the same dialog pattern as the photo viewer.

## 7. Accessibility

- Add a "Skip to content" link as the first focusable element.
- Visible focus: `outline: 2px solid #475569; outline-offset: 2px` on `a`, `button`, and `input` using `:focus-visible`. Use a light outline in dark mode.
- Contrast: informative text must be `slate-500` or darker in light mode.
- Dialogs use `role="dialog"`, `aria-modal="true"`, and a label.
- Icon-only buttons need an `aria-label`. Decorative icons use `aria-hidden="true"`.
- Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## 8. SEO and Sharing

- `<title>`: `Dani Harmade | Links`.
- Meta description of one sentence.
- `theme-color` set to `#0F172A`.
- Open Graph tags: `og:title`, `og:description`, `og:type`, and `og:image` (1200×630, navy background, name and role).
- Favicons and a web manifest.
- JSON-LD `Person` with `sameAs` listing every social profile.

## 9. Performance

- No framework and no build step.
- Lazy-load images below the fold. Give the avatar explicit `width` and `height`.
- Use a WebP avatar around 256px for the page, and the larger original only in the viewer.
- Load Font Awesome from a CDN, or replace it with inline SVG icons for production.

## 10. File Layout

```text
.
├── index.html
└── src/
    ├── css/style.css          # Custom styles, dark mode overrides
    ├── data/links.js          # All links and profile info
    ├── img/                   # Avatar, logos, OG image
    └── js/
        ├── index.js           # Theme, dialogs, toast, reveal
        ├── render.js          # Renders links.js into the page
        └── tailwind-config.js
```

## 11. Acceptance Checklist

- [ ] Layout is a single centered column that looks right from 320px to desktop.
- [ ] Colors, radii, borders, and typography match section 3.
- [ ] Light and dark themes both work, the choice persists, and there is no flash on load.
- [ ] Logo swaps correctly between themes.
- [ ] Every link comes from `links.js` and opens in a new tab safely.
- [ ] Avatar opens a full-size viewer that closes with X, backdrop, and `Esc`.
- [ ] Email button copies the address and shows a toast.
- [ ] Everything works with keyboard only, and focus is always visible.
- [ ] Reduced-motion users see no animation.
- [ ] Lighthouse accessibility and SEO scores are 95 or higher.
