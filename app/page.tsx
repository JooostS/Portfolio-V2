import Board from "../components/Board";
import Contact from "../components/Contact";
import Header from "../components/Header";
import WorkIndex from "../components/WorkIndex";
import { getProjects } from "../lib/github";

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <div className="stage fill" data-tone-section="hero">
        <Header />
        <main>
          <section className="wrap hero">
            <div>
              <h1>Small apps, useful tools and the occasional game.</h1>
              <p className="lede">
                I&apos;m Joost Schreuders, a student software developer from Zuid-Holland. The board is
                Connect Four, like the one I built for school, and this one plays back. Everything else
                I&apos;ve made is below.
              </p>
            </div>
            <Board />
          </section>
        </main>
      </div>

      <section id="work" className="wrap section" data-tone-section="work">
        <h2 className="section-title">Work</h2>
        <WorkIndex projects={projects} />
      </section>

      <section id="about" data-tone-section="about">
        <div className="wrap section about">
          <h2 className="section-title">About</h2>
          <div>
            <p className="about-lead">
              I&apos;m a student software developer from Zuid-Holland, learning C#, APIs and JavaScript.
            </p>
            <p>
              I&apos;ve been publishing code on GitHub since 2024, and right now I&apos;m exploring web
              development, UI/UX and Linux. Away from the keyboard I&apos;m usually gaming or asleep.
            </p>
            <dl className="skills">
              <div>
                <dt>Frontend</dt>
                <dd>HTML, CSS, JavaScript, responsive design, UI/UX implementation</dd>
              </div>
              <div>
                <dt>Backend</dt>
                <dd>RESTful APIs, C#, ASP.NET, database design, Python</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Git and GitHub, VS Code, the command line, Linux</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
