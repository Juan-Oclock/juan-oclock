import AboutVideo from './AboutVideo';

export default function About() {
  return (
    <section id="about" className="about content-width section-space" aria-labelledby="about-title" data-reveal-group>
      <div className="about-visual" data-reveal>
        <h2 id="about-title">A developer. A dad.<br />A few too many tabs.</h2>
        <AboutVideo />
      </div>
      <div className="about-story">
        <p data-reveal>I’m Juan. By day, I build software. Somewhere between lunchboxes, bedtime negotiations, and “one last fix,” I build things of my own.</p>
        <p data-reveal>This is where those side quests live. CalorieCue is out in the world, Taqvo is taking its first laps in TestFlight, and a web app is still at the “I should really write this down” stage.</p>
        <p data-reveal>I like taking a small, everyday idea and following it all the way to something you can actually use. Some ideas become apps. Others become very educational folders on my laptop.</p>
        <p data-reveal>Away from the keyboard, I lift weights, hike trails, and walk off merge conflicts. Apparently parenting doesn’t count as cardio. It should.</p>
        <p className="about-invitation" data-reveal>Building something of your own? I’m always up for swapping notes, exploring a collaboration, or hearing a good “what if.”</p>
      </div>
    </section>
  );
}
