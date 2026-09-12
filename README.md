# Juan Oclock portfolio

The side-project portfolio for `juan-oclock.com`, built in the existing `Juan-Oclock/juan-oclock` Next.js repository. Hero, About, one expandable project collection, contact, and footer.

## Local development

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 4173
```

Do not run a development server and a production build concurrently in the same checkout; both use `.next`.

## Editing

- `src/data/projects.ts`: released project content and external destinations. Add entries to extend the grid. For a future web release, add its platform field and render that in Projects instead of the current iOS label.
- `src/components/Projects.tsx`: the non-clickable upcoming web-app row.
- `src/components/{Hero,About,Contact,Footer}.tsx`: narrative and contact copy.
- `src/app/globals.css`: responsive layout, spacing, Manrope type, dark palette, aqua headings, soft-lime project accents and button interaction states, focus states.
- `src/components/PortfolioMotion.tsx`: native-scroll GSAP motion. The portrait remains steady. Hero copy enters with a subtle stagger; sections reveal on scroll and project imagery drifts gently on desktop only. Reduced motion is static. Effects clean up across breakpoint changes and unmount.

## Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

See `design-qa.md` for screenshots, visual comparisons, tested interactions, and verification limits. Production deploys from `main` in `Juan-Oclock/juan-oclock` to the existing Vercel project `juan-oclock`.

Next.js is updated to the patched 15.5 release line. A PostCSS override keeps its transitive parser on the patched 8.5 release line; the lockfile records the tested dependencies.

## Assets

Manrope body and display type is self-hosted, with their SIL Open Font Licenses in `public/fonts/`. Phosphor icons come from the existing react-icons dependency.

The full-width hero uses an AI-expanded version of Juan’s supplied portrait, composed to match the approved mockup. The image is an optimized WebP; text and directional dark gradients remain separate responsive HTML/CSS. About uses Juan’s supplied 2.1-second clip, converted to a silent 720px H.264 MP4 with continuous looping, a poster, pause/play control, and reduced-motion preference support. A downloadable GIF is also available in public/videos. Earlier landscape-layer and portrait assets are retained but no longer drive the hero. Product imagery comes from Juan's existing CalorieCue and Taqvo landing-page assets; it retains their actual product UI rather than the illustrative UI in the generated design reference. Optimized images live in `public/images/portfolio`. The one-off source preparation script is retained in the parent workspace's `design` folder, not needed for installation or deployment.

The contact form sends through a server-only Resend endpoint when configured. It validates submissions, preserves text on failure, and includes basic spam safeguards. Follow `docs/contact-email-setup.md` to set the API key and verified sender locally and in Vercel. Until configured, no email is sent; the form shows a helpful error. The recipient address is kept server-side and is not displayed in the contact section.
