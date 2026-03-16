import { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <p className="contact-page__intro">
        Have a question or feedback? Send us a message and we'll get back to you
        as soon as we can.
      </p>

      {submitted ? (
        <p className="contact-page__success">
          Thank you! Your message has been sent. We'll be in touch soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Your message..."
            />
          </div>
          <button type="submit" className="contact-form__submit">
            Send message
          </button>
        </form>
      )}

      <section className="contact-page__info">
        <h2>Other ways to reach us</h2>
        <p>Email: support@eshop.example.com</p>
        <p>We usually reply within 24 hours on business days.</p>
      </section>
    </div>
  );
}

export default ContactPage;
