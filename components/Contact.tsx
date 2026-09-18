import { formatMonth, getLatestPush } from "../lib/github";
import AccentPicker from "./AccentPicker";
import CopyEmail from "./CopyEmail";
import LocalTime from "./LocalTime";

const EMAIL = "contact@jooosts.nl";

export default async function Contact() {
  const latest = await getLatestPush();

  return (
    <div className="band" id="contact" data-tone-section="contact">
      <section className="wrap band-body">
        <h2 className="band-title">Want to work together, or have a project in mind?</h2>
        <div className="contact-row">
          <a className="contact-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <CopyEmail email={EMAIL} />
        </div>
        <p className="band-note">
          Email is the quickest way to reach me. My code is on <a href="https://github.com/JooostS">GitHub</a>,
          where the latest activity was in {formatMonth(latest)}.
        </p>
      </section>
      <footer className="wrap band-foot">
        <span>© 2026 Joost Schreuders</span>
        <AccentPicker />
        <LocalTime />
      </footer>
    </div>
  );
}
