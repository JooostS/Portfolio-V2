# Design system and handoff

## Concept

The hero is a physical Connect Four board in the profile picture's mint `#71ffc5`, because the work started with
a Connect Four. It plays back. Everything else is plain: warm neutrals, one sans-serif font, hairline dividers.
Mint is only used for the board, primary buttons, the active work row, link underlines and text selection.

The colour scheme follows the visitor's system (`prefers-color-scheme`). There is no toggle.

## Tokens

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--mint` | `#71ffc5` | same | Board, primary buttons, active row, underlines. Sampled from the avatar |
| `--on-mint` | `#030b08` | same | Text on any mint surface |
| `--coral` | `#ff4b3e` | same | Second disc, every second list bullet |
| `--bg` | `#f5f2ec` | `#151412` | Page |
| `--sunken` | `#e9e5dc` | `#0f0e0d` | Preview frame |
| `--ink` | `#1a1815` | `#ece8e1` | Text |
| `--muted` | `#5f5a52` | `#a39d92` | Secondary text |
| `--disc-a` | `#1a1815` | `#eeeae3` | First player's disc (flips so it stays visible) |

Mint never carries white text: it always takes `--on-mint`. On the page background mint is used only as a fill
or an underline, never as text, because it has no contrast there.

Radii: controls 6px, frames and rows 8px, board 0.3 of a cell.

## Type

**IBM Plex Sans**, weights 400, 500 and 600. Headings are 600 with -0.025em tracking, everything else is
normal tracking. Sentence case throughout. No all-caps, no eyebrows, no numbered markers.

| Role | Size |
| --- | --- |
| Hero heading | 34-56px |
| Case title | 35-67px |
| Work title | 22-30px |
| Email link | 21-32px |
| Body | 17px, 18px for About and Contact |

## Layout

- The hero fills the viewport (`.stage.fill`, `100svh`), so the first screen shows only the hero and the Work
  section starts below the fold.
- Sections are separated by a 1px line inside the content width. About, Contact and the case-study sections share
  one two-column layout: a small title on the left, text on the right. Below 860px it is one column.
- There is no grain, glow, gradient or tone change between sections.

## Components

- **Header**: logo tile, name, Work, About and a mint "Get in touch" button. Below 480px only the tile shows.
- **Board** (`components/Board.tsx`, logic in `lib/connect4.ts`): SVG plate with 42 holes over a disc grid, two
  feet and a darker rim. Discs are ink and coral, and land with a small bounce. Hovering or focusing a column
  shows a ghost disc above it. Six discs drop in as a scripted opening, then it is the visitor's move. The
  opponent is a depth-5 minimax search. A toggle switches to two players. The winning four flash twice.
- **Work index** (`components/WorkIndex.tsx`): a list on the left and a sticky preview on the right. Hovering or
  focusing a row fills it mint and crossfades the preview to that project's screenshot. Projects with no
  screenshot show a mint poster with their title and first three features. On touch devices and below 900px the
  preview is removed and each row shows its own thumbnail and summary.
- **About**: two short paragraphs, no skills table.
- **Contact**: email as the largest text in the section, a copy button, and GitHub and LinkedIn links.
- **Case study**: title, lede, actions, framed screenshot, facts, features, optional live embed, next project.
- **Share images**: `app/opengraph-image.tsx` and `app/work/[slug]/opengraph-image.tsx`.

## Behaviour and accessibility

- Motion answers an action (disc drop, board release, row highlight, ghost disc), except the six-disc opening
  on load. Nothing moves while scrolling.
- `prefers-reduced-motion` removes the drop animation and transitions, places the opening instantly and makes
  "New game" reset instantly.
- Column buttons are labelled, disabled when full or when it is not the visitor's turn. Status is a
  `role="status"` region. Focus rings switch to mint in dark mode and stay visible on mint surfaces.
- The two players are called Player 1 and Player 2, because the first disc changes colour with the scheme.
- The copy button announces "Email address copied" and falls back when the clipboard API is blocked.

## Data

`lib/github.ts` reads `https://api.github.com/users/JooostS/repos` (cached for an hour, falls back to a built-in
snapshot if the API is unreachable). Set `GITHUB_TOKEN` to avoid the 60 requests per hour anonymous limit.

- Forks, archived repos and the profile repo are skipped. Repos with no description and no homepage are skipped.
- Copy for each project lives in `CURATED`, written from that repo's README and source. A new repo appears
  automatically; add a `CURATED` entry to give it a title, features, stack and screenshot.
- Screenshots live in `public/work/`. The About text comes from the old site and GitHub.
- A live URL is only shown if it is publicly reachable. A Vercel deployment that redirects to `vercel.com/sso`
  is treated as private and hidden. The live embed is only shown when the site allows framing.

## Critique log

Passes 1 to 4 built a dark green look with grain, a glow behind the hero, a background that changed tone between
sections, an accent picker, a scroll progress line, a local-time footer and a back-to-top ring.

Pass 5, in response to "does it look like an AI made it":
- Removed the parts that read as generated: green-tinted near-black with a glow and grain, the Bricolage and
  Newsreader pairing with very tight tracking, the tone shift, accent picker, progress line, back-to-top ring,
  local time and the "latest activity" line.
- Moved to warm paper and warm charcoal, one font, smaller headings, smaller radii and hairline dividers.
- Rewrote the hero, About and Contact copy in plain first person, using only facts already on the old site and
  GitHub. The skills table and the "Want to work together, or have a project in mind?" line are gone.

Open:
- The Weather App demo is behind Vercel login. Turn off deployment protection and it will appear on its own.
- Network Monitor and the YouTube userscript have no screenshot. Network Monitor's table shows devices on your
  network, so use a screenshot with that data blurred or made up: save it in `public/work/` and add an `image`
  entry in `lib/github.ts`.
- The first work item is the old site, whose screenshot is a neon green look that no longer matches.
- The email address is public. Remove it from `components/Contact.tsx` if you don't want that.
