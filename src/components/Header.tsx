export default function Header() {
  return (
    <header className="site-header content-width">
      <a className="wordmark" href="#top" aria-label="Juan Oclock, back to top">Juan Oclock</a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
