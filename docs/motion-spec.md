# Portfolio motion specification

Status: required for implementation; not yet implemented or tested on Juan's site.

Juan explicitly requested layered, scroll-driven animation inspired by [Fora](https://fora.so/). Apply this to the selected spacious full-page concept and polished project section. Preserve Hero → About → Portfolio → Contact → Footer and the original humor.

## Reference evidence

Inspected Fora in Chrome on September 12, 2026 at a 2138 × 1407 viewport. The hero contains three separate transparent landscape images. At scroll position 0 their inspected wrappers had no transform. At scroll position 492px, the first two wrappers had vertical translations of approximately +152.52px and +83.64px, while the third inspected wrapper had no transform. Their different offsets produce relative depth against normal page scrolling. Subsequent screenshots showed the intro's first paragraph brightening while later paragraphs remained dim.

This confirms layered scroll movement and progressive text emphasis. It does not establish Fora's complete animation implementation, timing curves, or behavior on other devices. Values below are proposed for Juan's design, not copied measurements of Fora.

Reference captures:

- `concepts/fora-motion-top.png`
- `concepts/fora-motion-scroll.png`
- `concepts/fora-hero-reference.png`
- `concepts/fora-body-reference.png`

## Motion character

Quiet depth and a gentle sequence of entrances. Background layers move independently; content settles into place. Motion supports the large spaces between sections. Avoid bouncing, rapid scale changes, cursor-following tilt, compulsory waiting, and continuous idle movement.

Use native document scrolling. Do not intercept wheel/touch input, add an artificial scroll container, force snap points, or pin content to manufacture a long animation. Scrolling backward reverses decorative parallax naturally; completed content entrances do not repeatedly hide text.

## Hero layer composition

Create separate visual assets for the approved mountain scene: distant ridge, middle ridge, and foreground silhouette. The sky is the base surface. Assets need transparent silhouettes and sufficient overlap/bleed to cover all motion positions. Do not animate the entire flattened full-page mockup or reuse one landscape image three times as a substitute for actual layers. Source or generate individual matching layers when implementing.

Layer order from back to front: sky → distant ridge → middle ridge → foreground silhouette → headline/body/CTA. Decorative layers have no pointer interaction and no accessible text. Keep the heading and CTA outside decorative clipping and transform containers.

Let `p` be scroll progress through the hero: 0 when the hero top reaches the viewport top; 1 when its bottom reaches the viewport top. Clamp outside that interval. The following values are translations relative to each layer's normal document position, not absolute screen coordinates:

| Layer | At p = 0 | At p = 1 | Intended effect |
|---|---|---|---|
| Sky | 0px | 0px | Stable base within the section |
| Distant ridge | translateY(0) | translateY(+96px) | Drifts upward more slowly than the document |
| Middle ridge | translateY(0) | translateY(+48px) | Intermediate depth |
| Foreground silhouette | translateY(0) | translateY(0) | Travels with normal scrolling; moves fastest relative to the distant ridge |
| Text and CTA | Normal layout | Normal layout | Predictable reading and click targets |

Use linear scroll mapping for this scene. No time-based catch-up is required: stop movement immediately when scrolling stops. Provide at least 112px vertical bleed for the far layer or an equivalent verified overlap. Clip decorative layers only, never focus indicators or text. Fade the foreground into the page background using a static mask.

## Entrance choreography

Content is visible in the base HTML/CSS. Only enhance motion after setup succeeds. A failed script, slow image, direct anchor visit, or keyboard navigation must never leave content hidden. Start text at full opacity and animate a modest translation; fade decorative accents or media only. All final positions match the approved static design.

For section entrances, trigger when the section's first relevant content reaches 85% of viewport height. Use ease-out `cubic-bezier(0.22, 1, 0.36, 1)`. Effects run once per page visit and should complete rather than replay when scrolling back. An element already above the trigger on initial load renders in its final state.

| Area | Motion | Timing and sequence |
|---|---|---|
| Hero introduction | Eyebrow, headline, supporting copy, CTA settle from translateY(10px) to 0; text stays visible | 450–600ms; offsets 0 / 60 / 120 / 180ms; complete within 800ms; run only when page opens at top |
| About | Heading settles from +16px; two paragraphs settle from +12px | 550ms; heading first, paragraphs follow at 70ms intervals; preserve whole paragraphs rather than splitting letters |
| Portfolio heading | Title and subtitle settle from +16px | 500ms; 60ms offset for subtitle |
| Project cards | Each card settles from +20px; image can fade from 0.85 to 1 while title/status/description stay fully visible | 600ms; stagger 80ms within each visible row; cap row stagger at 160ms as the collection grows |
| Upcoming web app | Compact row settles from +10px | 450ms; no delayed wait for offscreen cards |
| Contact | Heading then support copy and CTA settle from +12px | 550ms; 70ms intervals |
| Footer | Static signature and joke | No entrance needed; keep the ending quiet |

Do not reproduce Fora's very dim reading state. Text is continuously readable, selectable, and exposed as normal semantic text. Avoid blur effects on body copy.

## Depth inside project images

Use the approved card framing and generous media stages. Keep the card shell, captions, status labels, and external-link action stationary after their entrance.

- The media background and phone artwork can be independent layers when original assets support separation.
- Over the card's visible travel from near the viewport bottom to near the top, translate the decorative backdrop from +6px to −6px and phone artwork from 0px to −8px. These are small bounded offsets; do not move the interactive card itself continuously.
- Apply at most 1.02× image scale on fine-pointer hover over 220ms. Link-arrow movement is at most 2px diagonally, with subtle border emphasis.
- Keep phone UI readable and within the media crop at all offsets. Reserve an 8–12px internal bleed or disable the media parallax if the image cannot accommodate it.
- If only a flattened original app screenshot is available, use one gentle media transform. Do not fabricate separate phone screens to satisfy the layer count.
- Never add movement to the noninteractive Coming soon row that implies it is clickable.

## Responsive and accessibility behavior

- At widths below 768px, disable project-image parallax and halve hero layer offsets to +48 / +24 / 0px. Use 8–12px section entrances and at most 60ms stagger.
- Under `prefers-reduced-motion: reduce`, show all content immediately in its final state. Disable parallax, translation, scale, stagger, and smooth anchor scrolling. Keep static visual focus and hover feedback.
- Respond if the motion preference changes while the page is open; remove residual transforms and pending delays.
- On keyboard focus within a transitioning card or section, settle it immediately. Focus targets must not move away while being used. Hover effects are optional and limited to fine pointers; touch interaction remains direct.
- Preserve ordinary anchor navigation and usable scroll margins below the header. A direct Portfolio/Contact anchor should show its content immediately.
- No autoplay looping motion is specified, so no persistent pause control is needed for this design.

## Implementation constraints

Inspect the connected repository's existing stack before choosing a motion library. Reuse a suitable dependency if one exists; keep all motion definitions centralized. This spec does not authorize replacing the application framework.

Prefer transforms and opacity without layout animation. Reserve image sizes, load the hero efficiently, lazy-load lower project imagery, and prevent layout shifts. Share scroll progress per scene rather than attaching independent state updates to every layer. Suspend offscreen work; do not rerender the whole page on every scroll event. Separate entrance and media-layer transforms so they do not overwrite each other. Remove temporary compositor hints after entrances finish.

## Acceptance checks before release

1. Desktop slow scrolling visibly separates the mountain layers; stop/reverse scrolling has no jump or drift. Layer edges never reveal gaps.
2. Hero → About → Portfolio → Contact → Footer remains the normal reading order and the large spacing is preserved.
3. Card entrances are lightly staggered; adding another row does not accumulate long delays. Card captions and links remain easy to read and operate.
4. Test fast scrolling, backward scrolling, anchor navigation, refresh partway down the page, browser back restoration, resize, and orientation change. No content remains offset or hidden.
5. Test reduced motion both before load and when changed live; test keyboard focus during an entrance, touch scrolling, and JavaScript unavailable/failing.
6. Inspect a browser performance recording and a representative phone. Aim for smooth frame pacing without animation-driven layout work or visible jank; reduce decorative layers/offsets if the device cannot sustain it. Record findings rather than claiming unmeasured frame rates.
7. Review a short recording of the implemented scroll sequence alongside the approved static full-page and project-section references. Static image concepts alone do not demonstrate that motion works.

The motion pass is part of the implementation definition of done. The current deliverable is this specification, not an animated website.


## Editorial refinement — September 12

Supersedes earlier hero values: hero height 940–1200 px desktop (112svh), 830 px mobile. Far/middle/foreground scroll offsets 210/110/-38 px, beginning at 0/9/18% of the hero. Each layer has its own ScrollTrigger and 0.55/0.8/1.05 second scrub smoothing. Independent inner wrappers enter from 40/75/110 px with 180 ms staggering and 1.4 second ease-out, once at page top. Mobile offsets scale to 45%; reduced motion remains fully static.


## Approved portrait hero — September 12 (current implementation)

This supersedes the earlier mountain-layer hero animation and dimensions. The full-bleed portrait stays stationary to preserve the face and composition. Desktop uses a left-to-right shade and bottom fade; mobile changes the crop and stacks copy below the face. Hero height is 940–1100 px desktop and 1180 px mobile. Live HTML intro elements enter from 10 px with 60 ms staggering over 550 ms, once on an unanchored top-of-page load. Sections retain light scroll entrances; project imagery has gentle desktop-only motion. Reduced-motion preference skips these effects; context cleanup handles breakpoint changes. No mountain layers remain in the hero.
