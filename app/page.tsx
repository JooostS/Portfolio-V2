import Board from "../components/Board";
import Contact from "../components/Contact";
import Header from "../components/Header";
import WorkIndex from "../components/WorkIndex";
import { getProjects } from "../lib/github";

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <div className="stage fill">
        <Header />
        <main>
          <section className="wrap hero">
            <div>
              <h1>I&apos;m Joost, a software student from Zuid-Holland.</h1>
              <p className="lede">
                I build small web apps and desktop tools. The board is Connect Four, like the one I made
                for school, and this one plays back. Try to beat it, then have a look at the rest of my work.
              </p>
            </div>
            <Board />
          </section>
        </main>
      </div>

      <div id="work" className="alt">
        <section className="wrap section">
          <h2 className="section-title">Work</h2>
          <WorkIndex projects={projects} />
        </section>
      </div>

      <section id="about" className="wrap section about">
        <h2 className="section-title">About</h2>
        <div>
          <p className="about-lead">I&apos;m a student software developer from Zuid-Holland.</p>
          <p>
            At the moment I&apos;m learning C# and working with APIs and JavaScript, and I&apos;m interested
            in web development, UI/UX and Linux.
          </p>
          <p>
            I&apos;ve been putting code on GitHub since 2024: mostly small web apps, a Python network tool and
            a browser userscript. I use HTML, CSS and JavaScript on the front end, C# with ASP.NET and Python
            on the back end, and Git, VS Code and the command line every day. Away from the keyboard
            I&apos;m usually gaming or asleep.
          </p>
        </div>
      </section>

      <Contact />
    </>
  );
}
