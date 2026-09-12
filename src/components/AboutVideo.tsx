'use client';

import { useEffect, useRef, useState } from 'react';
import { PiPauseFill, PiPlayFill } from 'react-icons/pi';

export default function AboutVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div className="about-photo about-video">
      <video ref={ref} muted loop playsInline preload="metadata" poster="/videos/juan-about-poster.jpg"
        width={720} height={1280} aria-label="Juan making a playful expression and pointing"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="/videos/juan-about.mp4" type="video/mp4" />
      </video>
      <button className="about-video-toggle" type="button" onClick={toggle}
        aria-label={playing ? 'Pause About video' : 'Play About video'}>
        {playing ? <PiPauseFill aria-hidden="true" /> : <PiPlayFill aria-hidden="true" />}
        <span>{playing ? 'Pause' : 'Play'}</span>
      </button>
    </div>
  );
}
