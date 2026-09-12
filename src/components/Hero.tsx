import Image from 'next/image';
import { PiArrowDown } from 'react-icons/pi';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-hero>
      <div className="hero-portrait" aria-hidden="true">
        <Image src="/images/portfolio/juan-hero-wide.webp" alt="" fill priority sizes="100vw" />
      </div>
      <div className="hero-portrait-shade" aria-hidden="true" />
      <div className="hero-copy content-width" data-hero-intro>
        <p className="eyebrow" data-intro>Developer. Dad. Curious builder.</p>
        <h1 id="hero-title" data-intro>From idea to<br /><span>“wait, it works.”</span></h1>
        <p className="hero-description" data-intro>I turn coffee and questionable ideas into apps.<br className="desktop-break" /> Some even make it out of my laptop.</p>
        <div data-intro><a href="#portfolio" className="button button-light">Explore my projects <PiArrowDown aria-hidden="true" /></a></div>
      </div>
      <div className="hero-project-notes content-width">
        <a href="https://caloriecue.app" target="_blank" rel="noopener noreferrer"><span>Out in the world</span><strong>CalorieCue</strong><p>Published · iOS</p></a>
        <a href="https://taqvo.app" target="_blank" rel="noopener noreferrer"><span>Taking its first laps</span><strong>Taqvo</strong><p>TestFlight · iOS</p></a>
        <a href="#portfolio"><span>Somewhere in my tabs</span><strong>The next side quest</strong><p>Web app · Coming soon</p></a>
      </div>
    </section>
  );
}
