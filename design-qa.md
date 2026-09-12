# Portfolio design QA

Implementation: http://127.0.0.1:4173/ on `codex/portfolio-redesign`. Local production preview; no deployment.

## Visual truth and normalization

Selected full-page reference: `/Users/juan_oclock/.codex/generated_images/01a0946b-bafd-7a62-8b56-051da8dc1726/exec-9197442a-f5a4-45c3-ab20-2328bcd263b0.png` (887 × 1774 pixels).

Approved replacement project section: `/Users/juan_oclock/.codex/generated_images/01a0946b-bafd-7a62-8b56-051da8dc1726/exec-fddc4a68-ac1c-40b5-9199-b1e8b7367c5b.png` (1330 × 1182 pixels).

Rendered evidence: `docs/qa/desktop-final.png` (1425 × 3207 pixels), Chrome viewport 1440 × 1000 CSS px, DPR 1, 15 px native scrollbar. Full-page capture at the top, dark theme, all content and images loaded. Source is a generated design board, with no recorded CSS viewport. Both full-view panels are normalized to 660 pixels wide in `docs/qa/comparison-final.png`; this is a proportional composition comparison, not a pixel-identical test. The taller page intentionally incorporates the subsequently approved two-card shelf and visible email fallback.

Focused evidence: `docs/qa/projects-comparison-final.png`. The actual portfolio section is cropped from the same full-page render and compared with the replacement shelf in one input, both 660 px wide. `docs/qa/hero-final.png` provides readable hero detail. Mobile evidence: `docs/qa/mobile-final.png` at 390 × 844 CSS viewport (375 px content), and `docs/qa/mobile-320-contact-final.png` at 320 × 740 (305 px content), DPR 1.

## Findings and comparison history

1. First full-view comparison (`docs/qa/comparison-v1.png`): P2 Taqvo phones were clipped by the media frame. Changed percentage widths to height-constrained images with adjusted positions. Final focused comparison shows both full devices.
2. Navigation interaction: P2 section top padding left Portfolio heading 284 px below viewport top. Converted section top spacing to margins and reduced scroll margin. Actual navigation now lands the heading at 64 px desktop and 44 px mobile.
3. Responsive code review: P2 GSAP matchMedia did not enter its callback when both desktop and reduced-motion conditions were false. Added an always-matching condition. Browser verification at 390 px confirms far/middle offsets of 48/24 px and no product-media transform; desktop is 96/48 px.
4. Narrow screen capture: P2 isolated word in contact heading at 320 px. Fluid 30–38 px heading sizing restores two balanced lines, verified in `mobile-320-contact-final.png`.
5. Final full-view comparison found a P2 abrupt landscape bottom edge. Added a scene-level lower fade; final recapture removes the horizontal boundary into About.
6. Added project status/description IDs and aria-describedby to preserve useful context for each named external link.

## Required fidelity surfaces

- **Typography:** self-hosted Manrope resolves correctly in Chrome, regular display weight and medium/semibold controls. Deliberately uses the lighter full-page direction throughout rather than the heavier heading in the isolated shelf mock. Live text is selectable, responsive, and readable; no truncation observed.
- **Layout and rhythm:** centered hero, wide two-column About, one two-card collection, compact upcoming row, centered contact and quiet footer. 1120 px content container and generous section gaps retained. Cards stack at mobile widths without horizontal overflow, verified at 390 and 320.
- **Colors:** near-black #0b0d0d, ivory #f3f1eb, muted gold #e1c273, charcoal captions. Green Published and gold TestFlight indicators also include text. Focus outline is gold and visible.
- **Images:** real CalorieCue/Taqvo source website imagery replaces the illustrative product UI in the generated mock. Taqvo device proportions and map content therefore differ intentionally. Flat peach/olive media backgrounds preserve the palette without inventing scenic product photography. Landscape uses three independent raster layers with true alpha for foreground/middle; not CSS-drawn artwork. Product captions and status remain HTML. No missing images observed.
- **Content:** keeps the approved funny builder/dad story, two real projects and release stages, an unnamed non-clickable upcoming web app, collaborator-friendly contact and spaceship joke. No client-seeking sales funnel.

## Interaction and technical evidence

- Header Portfolio and hero CTA navigate to the collection; Contact and back-to-top work.
- Both project cards clicked: each opens its correct HTTPS site in a separate Chrome tab and preserves the portfolio. rel=noopener noreferrer is present.
- Copy button displays “Email copied. Your move.” after the Clipboard API resolves. Three focused node tests pass, including actual address forwarding and rejection/unavailable fallback. Browser-session clipboard readback was empty, so independent OS clipboard contents are not asserted.
- Keyboard Tab exposes Skip to content; Enter then Tab reaches Explore my projects. Computed outline is solid. Focus handlers settle entrance transforms.
- Desktop and mobile hero offsets verified from rendered transforms; mobile media drift is absent.
- Chrome warning/error log check returns an empty list.
- Production build passes, including lint and type validation. Focused tests: 3 passed, 0 failed. git diff --check passes.

## Remaining verification limits and P3 polish

Reduced-motion CSS and matchMedia cleanup are implemented and reviewed, but live reduced-motion emulation was not completed because native Chrome interaction was interrupted. No system preferences were changed. No physical iPhone/Safari session, screen-reader session, measured frame-rate benchmark, or mail-client send was performed. Further landscape color grading or richer product photography would be optional P3 art-direction refinements, not blockers for this selected implementation.

## Implementation checklist

- [x] Fix and recapture desktop and narrow layouts.
- [x] Compare full composition and project region against the respective approved references.
- [x] Verify primary navigation, external destinations, keyboard entry, clipboard feedback, and responsive motion.
- [x] Preserve readable static content and reduced-motion fallback.
- [x] Keep a local production preview available for review.

Previous approved baseline result: passed


## Editorial refinement review

User explicitly requested a longer hero, separately timed mountain layers, editorial typography, expanded About, and contact form. These supersede the matching typography and contact layout in the previous image reference. The project shelf and dark palette remain unchanged.

- Revisited Fora in Chrome. At scroll 774 px, the rear and middle hills retain roughly 240/132 px of vertical offset relative to normal scrolling, while foreground follows its own pace. Applied that depth principle with independent start points and smoothing. At local scroll 563 px in a 1200 px hero, observed approximately 98.5/45.8/-13.4 px transforms across the three layers.
- Instrument Serif display type paired with existing Manrope body text. Taller hero keeps the original narrative. About adds existing project status, the side-project process, and an invitation to collaborate without inventing employment history or credentials.
- Contact now uses a two-column introduction/form at desktop, stacked fields on mobile. Name, email, and message labels, required validation, length limits, visible focus, and an explicit email-draft CTA. No message is sent or stored by the site. No delivery service was supplied.
- Browser checks: required empty fields stop submission and focus name; invalid email focuses email; valid test inputs clear all invalid states. Test data cleared afterward. No email was sent and no external mail-client flow was invoked during QA. Unit test verifies encoded draft payload.
- Found LastPass injected markup causing a hydration mismatch on the first dev load. Added the field ignore hint; subsequent reload showed normal rendering without the issue overlay. Extension decorations can still appear after hydration.
- Responsive check at 390 and 320 px found no horizontal overflow. Reduced narrow hero type from a 58 px minimum to 48 px to preserve its two-line heading.
- Evidence: `docs/qa/editorial-desktop.png`, `docs/qa/editorial-hero.png`, `docs/qa/editorial-mobile.png`. Existing product imagery and palette retained; editorial type, taller hero, extra biography text, and form are intentional changes from the prior source.
- Production build includes lint/type validation; three focused contact/clipboard tests pass. Reduced-motion emulation and physical-device Safari remain unverified as noted above.

Previous refinement result: passed


## Mountain-lake reference update

Source: `/Users/juan_oclock/Downloads/_ (6).jpeg`, 474 × 924 px. User requests its modern sans-serif, dark photographic layout. This supersedes the prior editorial serif direction. Portfolio order and functional content remain as requested earlier: Hero → About → Portfolio → Contact → Footer. Travel tours, video controls, and social accounts are not copied.

Evidence: `docs/qa/lake-desktop.png` at 1440 × 1000 CSS viewport, DPR 1, content width 1425 px; `docs/qa/lake-mobile.png` at 390 × 844. Also inspected 320 × 740 for overflow and form layout. Same-input full comparison: `docs/qa/lake-comparison.png`; focused hero comparison: `docs/qa/lake-hero-comparison.png`. Panels normalized to 560 px wide. Source CSS dimensions are unknown, so compare proportions and art direction, not pixel identity. Taller hero and longer page intentionally preserve the earlier long-hero/About/contact-form requirements.

Fidelity surfaces: Manrope 600 uppercase aqua headings and readable regular body type; near-black #050807, aqua #70d8d0, ivory #eef5f2; left-aligned image-led hero with three project notes; centered collection heading; reduced card radii; forest image balanced against About narrative. Real app screenshots, correct status labels, and existing humor retained. Generated landscape imagery uses real raster assets, not CSS drawings.

Findings fixed: first dev capture had stale CSS; restarted development server and verified the correct selectors visibly applied. First full capture preceded lazy image loading; scrolled to the collection and confirmed all eight images load before final recapture. Lightened navigation text against the sky. Moved hero notes after the headline in DOM order. Removed the contact line-break dependency so words stay properly spaced under the new responsive heading.

Navigation to Portfolio/Contact/back-to-top works. New hero notes use the same real external project URLs with target blank and noopener/noreferrer. Form behavior is unchanged from the prior verified draft flow. No horizontal overflow at desktop, 390, or 320 px. Chrome error log empty. Production build includes lint/type validation. No deployment. Prior reduced-motion and physical-device test limits remain.

final result: passed

## Approved full-width portrait implementation — September 12

Visual source: `/Users/juan_oclock/.codex/generated_images/01a0946b-bafd-7a62-8b56-051da8dc1726/exec-2f333ab1-0e86-4432-97f4-31561220bf90.png` (1487×1058). Compared alongside `docs/qa/portrait-desktop.png` (1440×1024 viewport). Full-page responsive capture: `docs/qa/portrait-mobile-full.png` (390×844 viewport).

Implemented the uninterrupted full-bleed photo, left shade and bottom fade, right-positioned portrait, live aqua heading and CTA, and three divided project notes. The photo-only asset was AI-expanded from Juan's supplied photo and approved mockup, then encoded as WebP. About now uses the alpine lake image. Typography remains the site's self-hosted Manrope; minor glyph/spacing differences from generated lettering are intentional. Mobile uses a face-first crop and copy beneath it rather than squeezing the desktop composition. The face stays still; HTML entrances and lower section motion remain.

Checked in Chrome at 1440×1024, 390×844, and 320×740. No horizontal overflow at the two mobile widths; all six page images loaded. Anchor navigation to Portfolio and back to top works. Full-page mobile review confirms About, project cards, contact and footer remain readable. Desktop source/render comparison shows the same composition and hierarchy, without a visible photo card seam or text over the face. The mobile full-page capture contains a browser focus/skip-link artifact after anchor navigation; it is not persistent page content.

Validation: 3/3 tests passed, standalone lint/typecheck passed, production build passed, and `git diff --check` passed. No deployment. Contact remains an email-draft form. Live reduced-motion preference switching and real-device performance profiling remain unverified as previously recorded; the static reduced-motion branch is retained.

Final visual result: passed. No outstanding P0/P1/P2 findings for this portrait refinement.


## About looping video — September 12

Replaced the About landscape with the supplied me.mov clip. Full 2.1-second clip retained; audio removed for GIF-style playback. H.264 MP4 (436 KB), poster (30 KB), optional GIF (3.8 MB). Added accessible pause/play button, playsInline, loop, and reduced-motion preference handling. Chrome confirmed muted playback with advancing currentTime, 2.1s duration, loop enabled, successful pause and resume. Desktop and 390px mobile visually reviewed; adjusted crop upward to preserve headroom and the sunglasses gag. Lint and typecheck passed. Original upload preserved.

## Direct contact email — September 12

Implemented a server-only Resend endpoint and direct-send UI. Browser verified sending/disabled state and error recovery with all visitor fields retained. Found and fixed Next's local request URL normalization (localhost versus browser-facing 127.0.0.1); added a regression test. After the fix, missing credentials correctly return 503 with direct-email guidance, never success. Desktop and mobile form reviewed; mobile capture at docs/qa/contact-resend-mobile.png includes the previously noted browser full-page focus/skip-link artifact. No horizontal overflow at 390px.

All 8 automated tests passed, standalone lint/typecheck passed, production build passed with dynamic /api/contact route, and diff whitespace check passed. Provider success/failure were tested with simulated HTTP responses; no real messages sent. Delivery remains inactive until Resend API key and verified sender are configured. Local development server restored on port 4173. Setup: docs/contact-email-setup.md; ignored .env.local template prepared. Basic per-instance throttling is not distributed abuse protection; this limitation is documented.
