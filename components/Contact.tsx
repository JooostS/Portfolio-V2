import AccentPicker from "./AccentPicker";
import CopyEmail from "./CopyEmail";
import LocalTime from "./LocalTime";

const EMAIL = "contact@jooosts.nl";

export default function Contact() {
  return (
    <div className="band" id="contact">
      <section className="wrap section contact">
        <h2 className="section-title">Contact</h2>
        <div>
          <p>Email is the easiest way to reach me.</p>
          <div className="contact-row">
            <a className="contact-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <CopyEmail email={EMAIL} />
          </div>
          <p className="contact-links">
            <a href="https://github.com/JooostS">GitHub</a>
            <a href="https://www.linkedin.com/in/joostschreuders/">LinkedIn</a>
          </p>
        </div>
      </section>
      <footer className="wrap band-foot">
        <span>© 2026 Joost Schreuders</span>
        <AccentPicker />
        <LocalTime />
      </footer>
    </div>
  );
}
