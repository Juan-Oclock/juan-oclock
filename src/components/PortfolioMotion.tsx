'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PortfolioMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ all: '(min-width: 0px)', desktop: '(min-width: 768px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      const { desktop, reduce } = context.conditions!;
      if (reduce) return;
      const scene = element.querySelector<HTMLElement>('[data-hero]');
      const ease = 'power3.out';

      if (scene) {
        const intro = scene.querySelector('[data-hero-intro]');
        if (intro && !revealed.current.has(intro)) {
          revealed.current.add(intro);
          if (window.scrollY < 8 && !window.location.hash) {
            gsap.fromTo(intro.querySelectorAll('[data-intro]'), { y: 10 }, { y: 0, duration: 0.55, stagger: 0.06, ease, clearProps: 'transform' });
          }
        }
      }

      const settle = (group: Element) => {
        revealed.current.add(group);
        const targets = group.querySelectorAll('[data-reveal]');
        gsap.killTweensOf(targets);
        gsap.set(targets, { clearProps: 'transform,opacity' });
      };

      element.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach(group => {
        if (revealed.current.has(group) || group.getBoundingClientRect().top < window.innerHeight * 0.85) {
          settle(group);
          return;
        }
        ScrollTrigger.create({
          trigger: group, start: 'top 85%', once: true,
          onEnter: () => {
            if (revealed.current.has(group)) return;
            revealed.current.add(group);
            // Capture delayed callbacks in the matchMedia context for reliable cleanup.
            context.add(() => {
              const index = group.parentElement?.classList.contains('project-grid') ? [...group.parentElement.children].indexOf(group) % 2 : 0;
              gsap.fromTo(group.querySelectorAll('[data-reveal]'), { y: desktop ? 18 : 10 }, {
                y: 0, duration: 0.6, delay: desktop ? index * 0.08 : 0,
                stagger: 0.07, ease, clearProps: 'transform',
              });
            });
          },
        });
      });

      if (desktop) {
        element.querySelectorAll<HTMLElement>('[data-media-layer]').forEach(layer => {
          gsap.fromTo(layer, { y: 6 }, {
            y: -8, ease: 'none',
            scrollTrigger: { trigger: layer.closest('[data-project-card]'), start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      }

      const focus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const group = target.closest('[data-reveal-group]');
        if (group) settle(group);
        const intro = target.closest('[data-hero-intro]');
        if (intro) { gsap.killTweensOf(intro.querySelectorAll('[data-intro]')); gsap.set(intro.querySelectorAll('[data-intro]'), { clearProps: 'transform' }); }
      };
      const hash = () => {
        const id = window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        if (target.matches('[data-reveal-group]')) settle(target);
        target.querySelectorAll('[data-reveal-group]').forEach(settle);
      };
      element.addEventListener('focusin', focus);
      window.addEventListener('hashchange', hash);
      hash();
      return () => { element.removeEventListener('focusin', focus); window.removeEventListener('hashchange', hash); };
    }, element);

    return () => media.revert();
  }, []);

  return <div ref={root} className="portfolio-page">{children}</div>;
}
