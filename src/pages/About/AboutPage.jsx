import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <p className="about-page__lead">
        We're a small e-shop built to learn modern web development: React,
        routing, and real API integration.
      </p>
      <section className="about-page__section">
        <h2>What we offer</h2>
        <p>
          Our store is powered by the Fake Store API, so you can browse real
          product data: electronics, jewellery, and men's and women's
          clothing. You can filter by category, add items to your cart, and save
          favorites for later.
        </p>
      </section>
      <section className="about-page__section">
        <h2>This project</h2>
        <p>
          This is a learning project. We use React with Vite, React Router for
          navigation, and a shared context for the cart and favorites. The
          database structure is documented so we can replicate it when we add a
          real backend. If you have questions or feedback, use the Contact Us
          page—we'd love to hear from you.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
