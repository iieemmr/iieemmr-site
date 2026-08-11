# 12th MMRC Recap Site

A post-conference recap page for the **12th IIEE Metro Manila Regional Conference** (Brighter 2026), built for the Institute of Integrated Electrical Engineers of the Philippines, Metro Manila Region. Thanks delegates, chapters, and partners, and recaps the event's speakers, sponsors, and highlights.

Live at [iieemmr-site.vercel.app](https://iieemmr-site.vercel.app). Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Sections

The page (`app/page.tsx`) renders six sections in order, one component each under `components/`:

1. **HeroRecap** — headline, thank-you subheadline, event dates/venue, and a "Watch Highlights" CTA
2. **EventDetails** — exhibitor stats, opening program speakers, closing ceremony chapter roll call, and hosts
3. **VideoHighlight** — embeds the conference highlight reel
4. **SponsorThankYou** — sponsor/partner logo grid and special acknowledgments
5. **MMRHistoryVideo** — embeds the "IIEE MMR Through The Lens of Time" video
6. **PhotoGallery** — lightbox photo grid

Shared, reusable pieces live in `components/shared/`: `VideoEmbed` (renders a placeholder until a real video URL is supplied), `PlaceholderBox` (generic labeled placeholder for logos/photos), `LogoGrid`, `PhotoLightbox`, and `ShareButton` (native share sheet with clipboard-copy fallback).

`app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, and `app/error.tsx` provide the site's SEO and error-handling essentials; the latter two are branded and wrapped in `SiteNav`/`SiteFooter` automatically via the root layout.

## Swapping in real content

Nothing is hardcoded into the components — all copy-adjacent data lives in `data/*.ts`:

- `data/eventDetails.ts` — opening speakers, closing chapter reps, hosts, exhibitor stat
- `data/sponsors.ts` — sponsor/partner list; set `logoSrc` to a real image path once logos are sourced
- `data/videos.ts` — the two video entries; set `videoUrl` to a YouTube link or direct video file once available
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
