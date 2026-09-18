"use client";

import { useEffect, useState } from "react";
import {
  COLS,
  ROWS,
  bestMove,
  findWin,
  isFull,
  other,
  play,
  type Columns,
  type Player
} from "../lib/connect4";

const PAD = 0.3;
const HOLE = 0.42;
const W = COLS + PAD * 2;
const H = ROWS + PAD * 2;

let plate = `M${PAD} 0H${W - PAD}Q${W} 0 ${W} ${PAD}V${H - PAD}Q${W} ${H} ${W - PAD} ${H}H${PAD}Q0 ${H} 0 ${H - PAD}V${PAD}Q0 0 ${PAD} 0Z`;
for (let c = 0; c < COLS; c++) {
  for (let r = 0; r < ROWS; r++) {
    const cx = PAD + c + 0.5;
    const cy = PAD + r + 0.5;
    plate += `M${cx + HOLE} ${cy}a${HOLE} ${HOLE} 0 1 0 ${-2 * HOLE} 0a${HOLE} ${HOLE} 0 1 0 ${2 * HOLE} 0Z`;
  }
}

type Game = { cols: Columns; turn: Player };
type Phase = "opening" | "play" | "clearing";
type Mode = "computer" | "person";

const OPENING = [3, 3, 2, 4, 4, 2];
const start = (): Game => ({ cols: Array.from({ length: COLS }, () => []), turn: "ink" });
const move = (g: Game, c: number): Game => {
  const cols = play(g.cols, g.turn, c);
  return cols ? { cols, turn: other(g.turn) } : g;
};
const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Board() {
  const [game, setGame] = useState<Game>(start);
  const [phase, setPhase] = useState<Phase>("opening");
  const [mode, setMode] = useState<Mode>("computer");
  const [hover, setHover] = useState<number | null>(null);

  const win = findWin(game.cols);
  const winner = win ? game.cols[win[0][0]][win[0][1]] : null;
  const full = isFull(game.cols);
  const over = Boolean(win) || full;
  const cpuTurn = mode === "computer" && game.turn === "coral";
  const canPlay = phase === "play" && !over && !cpuTurn;

  useEffect(() => {
    if (calm()) {
      setGame(OPENING.reduce(move, start()));
      setPhase("play");
      return;
    }
    const timers = OPENING.map((c, i) =>
      setTimeout(() => {
        setGame((g) => move(g, c));
        if (i === OPENING.length - 1) setPhase("play");
      }, 600 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "play" || over || !cpuTurn) return;
    const timer = setTimeout(() => setGame(move(game, bestMove(game.cols, "coral"))), 550);
    return () => clearTimeout(timer);
  }, [phase, over, cpuTurn, game]);

  function restart() {
    setGame(start());
    setPhase("play");
  }

  function reset() {
    if (phase !== "play") return;
    if (calm() || !game.cols.some((c) => c.length)) return restart();
    setPhase("clearing");
    setTimeout(restart, 700);
  }

  function choose(next: Mode) {
    if (phase !== "play" || next === mode) return;
    setMode(next);
    restart();
  }

  const label = (p: Player) => (p === "ink" ? "Player 1" : "Player 2");
  const status =
    phase === "opening" ? "Setting up the board"
    : winner ? (mode === "person" ? `${label(winner)} wins` : winner === "ink" ? "You win" : "Computer wins")
    : full ? "Draw"
    : mode === "person" ? `${label(game.turn)} to move`
    : cpuTurn ? "Computer is thinking"
    : "Your move";

  return (
    <div className="game">
      <div className="board" data-clearing={phase === "clearing" || undefined} aria-busy={phase === "opening"}>
        <span className="foot left" aria-hidden="true" />
        <span className="foot right" aria-hidden="true" />
        <div className="ghosts" aria-hidden="true">
          {game.cols.map((col, c) => (
            <span key={c} className={`ghost ${game.turn}`} data-on={(canPlay && hover === c && col.length < ROWS) || undefined} />
          ))}
        </div>
        <div className="discs" aria-hidden="true">
          {game.cols.flatMap((col, c) =>
            col.map((p, r) => (
              <span
                key={`${c}-${r}`}
                className={`disc ${p}`}
                data-win={win?.some(([x, y]) => x === c && y === r) || undefined}
                style={{ gridColumn: c + 1, gridRow: ROWS - r, "--fall": ROWS - r, "--col": c } as React.CSSProperties}
              />
            ))
          )}
        </div>
        <svg className="plate" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <path d={plate} fillRule="evenodd" className="plate-face" />
          <path d={plate} fillRule="evenodd" fill="url(#sheen)" />
          <path d={plate} fillRule="evenodd" fill="none" className="plate-edge" />
        </svg>
        <div className="slots">
          {game.cols.map((col, c) => (
            <button
              key={c}
              type="button"
              onClick={() => canPlay && setGame(move(game, c))}
              onPointerEnter={() => setHover(c)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(c)}
              onBlur={() => setHover(null)}
              disabled={!canPlay || col.length === ROWS}
              aria-label={`Drop a disc in column ${c + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="game-bar">
        <p role="status" className="status">
          <span className={`dot ${winner ?? (full || phase === "opening" ? "" : game.turn)}`} />
          {status}
        </p>
        <button type="button" className="btn quiet" onClick={reset}>New game</button>
      </div>
      <div className="seg" role="group" aria-label="Opponent">
        <button type="button" aria-pressed={mode === "computer"} onClick={() => choose("computer")}>Vs computer</button>
        <button type="button" aria-pressed={mode === "person"} onClick={() => choose("person")}>Two players</button>
      </div>
    </div>
  );
}
