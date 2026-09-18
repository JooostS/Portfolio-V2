import { ImageResponse } from "next/og";

// Column by column, bottom to top: the same opening the hero board plays.
const DISCS: string[][] = [[], [], ["i", "c"], ["i", "c"], ["c", "i"], [], []];
const COLOUR: Record<string, string> = { i: "#0b1410", c: "#ff4b3e" };

export function ogImage(title: string, subtitle: string) {
  const rows = [5, 4, 3, 2, 1, 0];
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 72,
          alignItems: "center",
          justifyContent: "space-between",
          background: "#eef5f1",
          color: "#06100c"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <div style={{ fontSize: 32, color: "#465a51" }}>Joost Schreuders</div>
          <div style={{ fontSize: title.length > 24 ? 62 : 88, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
            {title}
          </div>
          <div style={{ fontSize: 34, color: "#465a51", marginTop: 28 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: 18, background: "#71ffc5", borderRadius: 30 }}>
          {rows.map((r) => (
            <div key={r} style={{ display: "flex" }}>
              {DISCS.map((col, c) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    width: 62,
                    height: 62,
                    margin: 3,
                    borderRadius: 31,
                    background: col[r] ? COLOUR[col[r]] : "#eef5f1"
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
