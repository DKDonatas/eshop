import "./Hero.css";

/**
 * Hero banner for homepage – full-width headline, fashion editorial style.
 */
function Hero() {
  return (
    <section className="hero" aria-label="Welcome">
      <div className="hero__inner">
        <h1 className="hero__title">Curated for you</h1>
        <p className="hero__subtitle">
          Discover electronics, jewellery, and clothing — all in one place.
        </p>
      </div>
    </section>
  );
}

export default Hero;
