# Design system and handoff

## Concept

The page is built from the profile picture: mint `#71ffc5` and near-black letters. The hero is a physical
Connect Four board in that mint, lit from the top left and sitting on feet, because the work started with a
Connect Four. It plays back. Everything else is quiet: tinted neutrals, with mint kept for small accents and one interactive surface.

The colour scheme follows the visitor's system (`prefers-color-scheme`). There is no toggle.

## Tokens

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--mint` | `#71ffc5` | same | Board, primary buttons, active row, small accents. Sampled from the avatar |
| `--on-mint` | `#030b08` | same | Text on any mint surface |
| `--coral` | `#ff4b3e` | same | Second disc, list bullets |
| `--bg` | `#eef5f1` | `#08110e` | Page |
| `--surface` | `#f8fcfa` | `#0d1915` | About section tone |
| `--bg-work` | `#e6efe9` | `#0b1713` | Work section tone |
| `--band-bg` | `#08120e` | `#050a08` | Contact band, the deepest tone in both schemes |
| `--sunken` | `#dde9e3` | `#050a08` | Preview frame |
| `--ink` | `#06100c` | `#e8f2ed` | Text |
| `--muted` | `#465a51` | `#94aaa1` | Secondary text |
| `--disc-a` | `#0b1410` | `#eef3f0` | First player's disc (flips so it stays visible) |

Mint never carries white text: it always takes `--on-mint`. On the page background mint is used only as a
fill, never as text, because it has no contrast there.

Radii by role: controls 10px, rows 16px, frames 20px, board 0.3 of a cell.

## Background and depth

- A fixed grain layer (`body::before`, SVG noise, 7-9% opacity) sits over everything.
- A soft mint light pool behind the hero (`.stage`), placed where the board is lit from.
- The page tone changes as you scroll: hero, work, about and contact each have their own background, and it
  eases between them over 0.9s (`components/ToneShift.tsx` sets `data-tone` on `<html>`). `--tone`, `--mint`
  and `--tint` are registered colour properties, which is what makes their changes animate.
- Shadows are cast from one light source, top left, and are larger on the board than on frames.

## Type

- **Bricolage Grotesque**, weight 600 for headings, 500 for labels. Tracking -0.04em on large sizes.
- **Newsreader** for body text, 19px, line-height 1.6, measure 31-34em.

| Role | Size |
| --- | --- |
| Hero heading | 42-75px |
| Case title | 46-118px |
| Email link | 26-80px |
| Work title | 30-46px |
| About lead | 29-45px |
| Body, lede | 19-21px |

Sentence case throughout. No all-caps, no eyebrows, no numbered markers.

## Components

- **Header**: logo tile, name, Work, About and a mint "Get in touch" button. Below 480px only the tile shows.
- **Hero height**: on the home page the hero fills the viewport (`.stage.fill`, `100svh`), so the first screen shows
  only the hero on any monitor and the Work section starts below the fold. Checked from 1280x720 to 3440x1440.
- **Board** (`components/Board.tsx`, logic in `lib/connect4.ts`): SVG plate with 42 holes over a disc grid, two
  feet, a sheen and a darker rim. Discs are ink and coral, and land with a small bounce. Hovering or focusing a
  column shows a ghost disc above it. Six discs drop in as a scripted opening, then it is the visitor's move.
  The opponent is a depth-5 minimax search. A toggle switches to two players.
- **Work index** (`components/WorkIndex.tsx`): a list on the left and a sticky preview on the right. Hovering or
  focusing a row fills it mint and crossfades the preview to that project's screenshot. Projects with no
  screenshot show a mint poster with their title and first three features. On touch devices and below 900px
  the preview is removed and each row shows its own thumbnail and summary.
- **About**: a large lead sentence, a short paragraph and a skills table.
- **Contact band**: the deepest tone of the scheme, not mint. The email is the largest type on the page with a
  mint underline. Mint appears only on hover, the copy button hover and the accent swatches.
- **Case study**: title, lede, actions, framed screenshot, facts, features, optional live embed, next project.
- **Share images**: `app/opengraph-image.tsx` and `app/work/[slug]/opengraph-image.tsx`.

## Small touches

- **Accent picker** (footer): five swatches (mint, lilac, sky, butter, peach). Choosing one changes `--mint`, so the
  board, buttons, active row, progress line and selection colour all ease to the new colour. Stored in
  `localStorage`. Every accent is light enough to keep near-black text on it.
- **Preview tint**: the glow behind the work preview follows the hovered project's own colour (`tint` in `CURATED`).
- **Copy button**: copies the email, with a fallback when the clipboard API is blocked, and announces it.
- **Local time**: Zuid-Holland time in the footer, with "probably asleep" between 23:00 and 07:00.
- **Scroll progress**: a thin accent line at the top edge, drawn with a CSS scroll timeline (no JavaScript;
  browsers without support just don't show it).
- **Win glint**: the four winning discs brighten twice.

## Behaviour and accessibility

- Motion answers an action (disc drop, board release, row highlight, ghost disc), except the six-disc opening on
  load. Nothing moves on its own while scrolling; only the background tone and the progress line respond to it.
- `prefers-reduced-motion` removes the drop animation and transitions, places the opening instantly and makes
  "New game" reset instantly.
- Column buttons are labelled, disabled when full or when it is not the visitor's turn. Status is a
  `role="status"` region. Focus rings switch to mint in dark mode and stay visible on mint surfaces.
- The two players are called Player 1 and Player 2, because the first disc changes colour with the scheme.
- Checked at 390px: no horizontal overflow on the home page or any of the six case studies.

## Data

`lib/github.ts` reads `https://api.github.com/users/JooostS/repos` (cached for an hour, falls back to a built-in
snapshot if the API is unreachable). Set `GITHUB_TOKEN` to avoid the 60 requests per hour anonymous limit.

- Forks, archived repos and the profile repo are skipped. Repos with no description and no homepage are skipped.
- Copy for each project lives in `CURATED`, written from that repo's README and source. A new repo appears
  automatically; add a `CURATED` entry to give it a title, features, stack and screenshot.
- Screenshots live in `public/work/`. The About text and skills come from jooosts.online.
- A live URL is only shown if it is publicly reachable. A Vercel deployment that redirects to `vercel.com/sso`
  is treated as private and hidden. The live embed is only shown when the site allows framing.

## Critique log

Pass 1 removed what read as generated: a lime accent on black, tracked all-caps labels, numbered markers, an
italic accent word, gradient orb art, scroll reveals, smooth-scroll hijacking.

Pass 2 replaced project copy written from repo names with copy from the READMEs, and added screenshots, the
opponent and share images.

Pass 3, in response to "plain background, wants dark mode, use the avatar colour":
- Blue became the avatar mint. Because mint is light, white text on it fails, so every mint surface takes
  near-black text and the second disc changed from yellow to coral.
- Red and yellow discs became ink and coral, which keeps the board to the avatar's palette plus one accent.
- The flat background became grain, a light pool and tonal sections.
- The work list gained the sticky preview so projects can be browsed without leaving the page.
- Dark mode was added and checked in both schemes.
- Caught in review: the headline left "game." alone on a fourth line, so the hero columns were rebalanced and
  the heading size reduced; the hero glow and bottom spacing were reduced.

Pass 4, in response to "the contact area has too much of the avatar colour, add small functions and a colour
transition":
- The contact band moved from solid mint to the deepest neutral, with mint reduced to an underline, hover and
  the swatches.
- Added the tone shift, accent picker, preview tint and the other small touches above. Each one is either
  functional or tied to something already on the page, and none animates on its own.
- Tested by script: tone changes for all four sections, accent applied and persisted, tint follows the hovered project, and a real click copies the email. Re-checked 390px overflow.

Near-black with a green accent is a common generated look. The differences here are that the green is the
avatar's own mint, used as a solid material and never as a glow, the type is set in ivory and mint-tinted
neutrals, and the layout and board are specific to this content.

Open:
- The Weather App demo is behind Vercel login. Turn off deployment protection and it will appear on its own.
- Network Monitor and the YouTube userscript have no screenshot. Network Monitor's table shows devices on your
  network, so use a screenshot with that data blurred or made up: save it in `public/work/` and add an `image`
  entry in `lib/github.ts`.
- The email address is public. Remove it from `components/Contact.tsx` if you don't want that.
