# 12th MMRC Recap Site

A post-conference recap page for the **12th IIEE Metro Manila Regional Conference** (Brighter 2026), built for the Institute of Integrated Electrical Engineers of the Philippines, Metro Manila Region. Thanks delegates, chapters, and partners, and recaps the event's speakers, sponsors, and highlights.

Live at [iieemmr-site.vercel.app](https://iieemmr-site.vercel.app). Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Sections

The homepage (`app/page.tsx`) renders seven sections in order, one component each under `components/`:

1. **HeroRecap** — headline, thank-you subheadline, event dates/venue, and a "Watch Highlights" CTA
2. **BeforeAfterHighlight** — "Then & Now" before/after image comparison slider
3. **EventDetails** — "At a Glance" stats (speakers, exhibitors, CPD points), opening program speakers, closing ceremony chapter roll call, and hosts
4. **VideoHighlight** — carousel of the conference's highlight reels
5. **SponsorHighlight** — top-tier sponsor logo carousel, preceded by a peek-style photo carousel of exhibit hall/event photos, with a CTA to the full sponsors page
6. **MMRHistoryVideo** — embeds the "IIEE MMR Through The Lens of Time" video
7. **PhotoGallery** — lightbox photo grid

**SponsorThankYou** lives on its own route, `app/sponsors/page.tsx`, rather than the homepage — it renders the full tier-grouped sponsor grid (Jade → Ruby → Diamond → Gold → Fellowship → Lunch → Others, in that client-confirmed prestige order, with a sticky in-page tier nav) plus the special acknowledgments block, and a "Back to Home" link above the heading. `SiteNav`'s "Sponsors" item is an in-page anchor to the homepage's `SponsorHighlight` teaser (like the rest of the nav); the teaser's own "View All Sponsors →" CTA is the only link into this full page.

Shared, reusable pieces live in `components/shared/`: `BeforeAfterSlider` (compare-slider for the Then & Now section, dynamically imported client-side via `BeforeAfterSliderClient` with `ssr: false`), `VideoCarousel` (embla-carousel-powered slider over multiple `VideoEmbed`s, used by `VideoHighlight`), `VideoEmbed` (video player wrapper built on `VideoMedia`; renders a placeholder until a real video URL is supplied), `VideoMedia` (renders a YouTube iframe or `<video>` element depending on the URL, using each platform's native playback controls), `PlaceholderBox` (generic labeled placeholder for logos/photos), `LogoGrid`, `PhotoLightbox`, and `ShareButton` (native share sheet with clipboard-copy fallback).

`app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, and `app/error.tsx` provide the site's SEO and error-handling essentials; the latter two are branded and wrapped in `SiteNav`/`SiteFooter` automatically via the root layout.

`app/icon.png` and `app/apple-icon.png` are the browser tab icon and iOS home-screen icon (Next.js's file-convention icons — no code wiring needed). The full-resolution source logo lives at `public/brand/iiee-logo.png`, for any future branding use beyond the icons.

`app/opengraph-image.tsx` generates the Open Graph/Twitter share image (1200×630) at build time via `next/og`'s `ImageResponse` — the hero photo with the same navy gradient/brand-color treatment as `HeroRecap`, not a bare screenshot. Next.js wires the resulting `og:image` tag automatically; Twitter/X falls back to it since no separate `twitter-image` is defined.

## Swapping in real content

Nothing is hardcoded into the components — all copy-adjacent data lives in `data/*.ts`:

- `data/beforeAfter.ts` — before/after image pair (`beforeSrc`/`afterSrc`) for the Then & Now slider
- `data/eventDetails.ts` — "At a Glance" stats (`atAGlanceStats`), opening speakers, closing chapter reps, hosts
- `data/sponsors.ts` — tiered sponsor roster (`TIER_ORDER`: Jade, Ruby, Diamond, Gold, Fellowship, Lunch, Others) with real logos already wired to `public/photos/sponsors/`, plus the special acknowledgments list
- `data/sponsorGallery.ts` — photo strip shown above the sponsor logos in `SponsorHighlight`; real event photos wired to `public/photos/sponsor-highlights/`
- `data/videos.ts` — `highlightReels` (array of video entries shown in the `VideoHighlight` carousel) and `historyVideo`; `videoUrl` is a YouTube link or direct video file — real conference videos are wired in
- `data/gallery.ts` — 16 photo slots; set `src` on each entry once real event photos are sourced

Until real assets are set, every video, logo, and photo renders as a clearly labeled placeholder instead of a broken link.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edit `app/page.tsx` or any component under `components/` — the page hot-reloads.

## Deployment

Linked to Vercel as `paulfuentesss-dev/iieemmr-site`. Deploy a preview with:

```bash
npx vercel deploy
```

or push to a branch and deploy via `vercel --prod` once GitHub auto-deploys are connected.

Page views are tracked with [Vercel Analytics](https://vercel.com/docs/analytics) (`@vercel/analytics`), wired into `app/layout.tsx`.

## Git workflow

Work happens on branches off `main` (e.g. `feat/photo-gallery-real-images`) and merges via pull request — no direct pushes to `main`.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) and are enforced by commitlint on every commit (`.husky/commit-msg`):

```
<type>(optional scope): <short summary>

<optional body explaining why>
```

Common types:

| Type       | Use for                                              |
| ---------- | ----------------------------------------------------- |
| `feat`     | a new feature or section                               |
| `fix`      | a bug fix                                              |
| `docs`     | documentation only (README, comments)                  |
| `style`    | formatting only, no code behavior change               |
| `refactor` | code change that neither fixes a bug nor adds a feature |
| `perf`     | a performance improvement                              |
| `test`     | adding or fixing tests                                 |
| `build`    | build system or dependency changes                     |
| `ci`       | CI/CD configuration changes                            |
| `chore`    | tooling, config, or maintenance with no source impact   |

Example: `feat(gallery): wire up real event photos from data/gallery.ts`

`.husky/pre-commit` also runs ESLint on `app`, `components`, and `data` before every commit.
