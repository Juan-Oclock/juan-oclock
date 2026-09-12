# Portfolio redesign implementation

Goal: implement the approved spacious portfolio and polished two-card project section in the existing Vercel-connected Next.js repository.

Branch: `codex/portfolio-redesign`. Existing stack: Next.js 15, React 19, GSAP, react-icons. Keep this application rather than scaffold a separate prototype.

Visual truth: full-page `exec-9197442a-f5a4-45c3-ab20-2328bcd263b0.png` with project-section `exec-fddc4a68-ac1c-40b5-9199-b1e8b7367c5b.png`, both in the parent workspace's design references. Motion requirements are in `motion-spec.md`.

- [x] Clone the confirmed repository and create isolated worktree.
- [x] Inspect existing components, package scripts, and source assets. Baseline TypeScript passes; lint currently prompts for missing ESLint setup.
- [x] Add behavioral tests for bounded motion and clipboard error handling, observe failure, then implement helpers.
- [x] Replace page composition and styles: semantic hero, About, data-driven Projects, contact, footer; self-host font and real product imagery.
- [x] Implement native-scroll GSAP scenes, independent landscape layers, modest entrances, responsive and reduced-motion cleanup.
- [x] Verify production build, TypeScript, lint, and focused tests.
- [x] Review in Chrome at desktop and mobile sizes, test navigation/external links/copy/focus/motion, compare rendered views to the selected references, save design QA.
- [x] Leave a verified local preview running for review. No production deployment or merge in this step.

Files: `src/app/page.tsx`, `layout.tsx`, `globals.css`; `src/components/{Header,Hero,About,Projects,Contact,Footer,PortfolioMotion}.tsx`; `src/data/projects.ts`; `src/lib/experience.mjs`; `tests/experience.test.mjs`; `public/images/portfolio/`; `public/fonts/`; `design-qa.md`.
