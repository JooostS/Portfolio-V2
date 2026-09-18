export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  features: string[];
  stack: string[];
  updated: string;
  repoUrl: string;
  liveUrl: string | null;
  liveLabel: string;
  embed: boolean;
  image: Shot | null;
};

export type Shot = { src: string; width: number; height: number; alt: string };

type Curated = Pick<Project, "title" | "kind" | "summary" | "features" | "stack"> & {
  liveUrl?: string;
  liveLabel?: string;
  embed?: boolean;
  image?: Shot;
};

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const USER = "JooostS";

// Written from each repo's README and source. Repos not listed here still appear,
// using their GitHub description.
const CURATED: Record<string, Curated> = {
  "connect-4": {
    image: { src: "/work/connect-4.png", width: 1920, height: 1200, alt: "The 4-op-een-rij board, an empty grid with a score panel and keyboard hints, all in Dutch." },
    title: "4-op-een-rij",
    kind: "Progressive web app",
    summary: "Connect Four for two players, in Dutch. Built for a school assignment and installable like a native app.",
    features: [
      "Two players take turns, red starts",
      "Undo the last move",
      "Keeps score across games",
      "Play with mouse, touch, or arrow keys and Enter",
      "Install it to your home screen or desktop"
    ],
    stack: ["JavaScript", "Service worker", "Web app manifest"],
    liveLabel: "Play it",
    embed: true
  },
  "location-pwa": {
    image: { src: "/work/location-pwa.png", width: 1000, height: 1440, alt: "Location Guide showing a status card that reads Searching for GPS." },
    title: "Location Guide",
    kind: "Progressive web app",
    summary: "Walk around and it tells you about the places you reach, using your phone's GPS.",
    features: [
      "Shows GPS status and accuracy while you walk",
      "Waits for a fix within 25 metres before it triggers",
      "Measures the distance to each saved place with the haversine formula",
      "Opens an info card when you arrive at a place"
    ],
    stack: ["JavaScript", "Geolocation API", "Service worker"],
    liveLabel: "Open the app"
  },
  "weather-app": {
    image: { src: "/work/weather-app.png", width: 1920, height: 1200, alt: "Weather App in dark mode showing current conditions for Amsterdam." },
    title: "Weather App",
    kind: "Web app",
    summary: "Weather for any city or your current location, with hourly and 7-day forecasts.",
    features: [
      "Search by city or use your device's location",
      "Hourly and 7-day forecasts",
      "Switch between Celsius and Fahrenheit",
      "Background and animations change with the weather",
      "Dark mode and search history"
    ],
    stack: ["JavaScript", "CSS", "Open-Meteo API", "OpenStreetMap Nominatim"],
    liveLabel: "Open the app"
  },
  "network-monitor": {
    title: "Network Monitor",
    kind: "Desktop app",
    summary: "A Python dashboard that scans your local network, pings devices and charts latency.",
    features: [
      "Discovers devices on the network with ARP",
      "Pings hosts in threads and tracks latency",
      "Detects HTTP, DNS and TCP",
      "Pins important hosts to a watchlist",
      "Exports the device table as JSON"
    ],
    stack: ["Python", "CustomTkinter", "Matplotlib"]
  },
  "yt-adblocker": {
    title: "YouTube ad skipper",
    kind: "Userscript",
    summary: "Skips YouTube ads automatically and closes the adblock warning popup.",
    features: [
      "Skips ads automatically",
      "Removes the popup that asks you to turn off your adblocker",
      "Installs from Greasy Fork through a userscript manager"
    ],
    stack: ["JavaScript", "Userscript"],
    liveUrl: "https://greasyfork.org/nl/scripts/540098-auto-adblock-skipper-on-youtube",
    liveLabel: "Install on Greasy Fork"
  },
  portfolio: {
    image: { src: "/work/portfolio.png", width: 1920, height: 1200, alt: "The jooosts.online home page: a short bio and a View My Work button on a dark starry background." },
    title: "jooosts.online",
    kind: "Website",
    summary: "My personal site, written in plain HTML, CSS and JavaScript.",
    features: [],
    stack: ["HTML", "CSS", "JavaScript"],
    liveLabel: "Visit the site"
  },
  "portfolio-v2": {
    image: { src: "/work/portfolio-v2.png", width: 1440, height: 900, alt: "The home page: a headline next to a playable Connect Four board on a warm off-white background." },
    title: "jooosts.nl",
    kind: "Website",
    summary: "This site. The hero is a Connect Four board you can play against the computer.",
    features: [
      "Play Connect Four against a minimax opponent, or against a second player",
      "The work list is read from the GitHub API",
      "Follows your light or dark setting",
      "Pick an accent colour in the footer"
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS"],
    liveLabel: "Visit the site"
  }
};

// Snapshot used only when the GitHub API can't be reached (offline build, rate limit).
const FALLBACK: Repo[] = [
  ["connect-4", null, "JavaScript", "https://connect-4-liard.vercel.app", "2026-03-17T11:11:12Z"],
  ["location-pwa", "location-pwa", "JavaScript", "https://location-pwa-three.vercel.app", "2026-03-06T16:06:14Z"],
  ["Weather-app", "A sleek, responsive weather application that provides real-time weather updates.", "CSS", "https://weather-app-jooostss-projects.vercel.app", "2025-11-03T15:23:42Z"],
  ["Network-Monitor", "A clean looking network monitor tool, all based on python", "Python", null, "2025-11-03T15:24:47Z"],
  ["YT-adblocker", "Auto-skips ads and removes adblock popups on YouTube.", "JavaScript", null, "2025-10-30T13:38:33Z"],
  ["Portfolio", "My portfolio", "CSS", "https://jooosts.online", "2026-06-11T08:45:59Z"]
].map(([name, description, language, homepage, pushed_at]) => ({
  name: name as string,
  description: description as string | null,
  html_url: `https://github.com/${USER}/${name}`,
  homepage: homepage as string | null,
  language: language as string,
  topics: [],
  pushed_at: pushed_at as string,
  fork: false,
  archived: false
}));

async function fetchRepos(): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 }
    });
    const data = await res.json();
    if (!res.ok || !Array.isArray(data) || !data.length) throw new Error(`GitHub responded ${res.status}`);
    return data;
  } catch {
    return FALLBACK;
  }
}

// A Vercel deployment behind SSO answers with a redirect to a login page, which
// visitors can't get past, so it must not be shown as a public link.
async function probe(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "manual", next: { revalidate: 3600 } });
    const sso = res.status >= 300 && res.status < 400 && (res.headers.get("location") ?? "").includes("vercel.com/sso");
    const framable =
      res.ok &&
      !res.headers.get("x-frame-options") &&
      !/frame-ancestors/i.test(res.headers.get("content-security-policy") ?? "");
    return { live: !sso, framable };
  } catch {
    return { live: true, framable: false };
  }
}

function humanize(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

async function toProject(repo: Repo): Promise<Project> {
  const slug = repo.name.toLowerCase();
  const curated = CURATED[slug];
  const url = curated?.liveUrl ?? (repo.homepage || null);
  const status = url ? await probe(url) : null;
  const liveUrl = status?.live ? url : null;

  return {
    slug,
    title: curated?.title ?? humanize(repo.name),
    kind: curated?.kind ?? (repo.language ? `${repo.language} project` : "Project"),
    summary: curated?.summary ?? repo.description ?? "",
    features: curated?.features ?? [],
    stack: curated?.stack ?? [repo.language, ...(repo.topics ?? [])].filter((s): s is string => Boolean(s)),
    updated: repo.pushed_at,
    repoUrl: repo.html_url,
    liveUrl,
    liveLabel: curated?.liveLabel ?? "Open the project",
    embed: Boolean(curated?.embed && liveUrl && status?.framable),
    image: curated?.image ?? null
  };
}

export async function getProjects(): Promise<Project[]> {
  const repos = (await fetchRepos())
    .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== USER.toLowerCase())
    .filter((r) => CURATED[r.name.toLowerCase()] || r.description || r.homepage)
    .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1));
  return Promise.all(repos.map(toProject));
}

export const formatList = (items: string[]) =>
  new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(items);

export const formatMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
