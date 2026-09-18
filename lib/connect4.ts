export const COLS = 7;
export const ROWS = 6;

export type Player = "ink" | "coral";
export type Columns = Player[][];

const DIRECTIONS: [number, number][] = [[1, 0], [0, 1], [1, 1], [1, -1]];
const CENTER_FIRST = [3, 2, 4, 1, 5, 0, 6];

const LINES: [number, number][][] = [];
for (let c = 0; c < COLS; c++) {
  for (let r = 0; r < ROWS; r++) {
    for (const [dc, dr] of DIRECTIONS) {
      const line = [0, 1, 2, 3].map((i) => [c + dc * i, r + dr * i] as [number, number]);
      if (line.every(([x, y]) => x >= 0 && x < COLS && y >= 0 && y < ROWS)) LINES.push(line);
    }
  }
}

export const other = (p: Player): Player => (p === "ink" ? "coral" : "ink");
export const isFull = (cols: Columns) => cols.every((c) => c.length === ROWS);

export function play(cols: Columns, player: Player, c: number): Columns | null {
  if (cols[c].length >= ROWS) return null;
  return cols.map((col, i) => (i === c ? [...col, player] : col));
}

export function findWin(cols: Columns): [number, number][] | null {
  for (const line of LINES) {
    const p = cols[line[0][0]][line[0][1]];
    if (p && line.every(([c, r]) => cols[c][r] === p)) return line;
  }
  return null;
}

function evaluate(cols: Columns, me: Player) {
  let score = cols[3].filter((p) => p === me).length * 3;
  for (const line of LINES) {
    let mine = 0;
    let theirs = 0;
    for (const [c, r] of line) {
      const p = cols[c][r];
      if (p === me) mine++;
      else if (p) theirs++;
    }
    if (mine && !theirs) score += mine === 3 ? 5 : mine === 2 ? 2 : 0;
    else if (theirs && !mine) score -= theirs === 3 ? 6 : theirs === 2 ? 2 : 0;
  }
  return score;
}

function search(cols: Columns, turn: Player, me: Player, depth: number, alpha: number, beta: number): number {
  const win = findWin(cols);
  if (win) return cols[win[0][0]][win[0][1]] === me ? 1000 + depth : -1000 - depth;
  if (isFull(cols)) return 0;
  if (depth === 0) return evaluate(cols, me);

  const maximising = turn === me;
  let best = maximising ? -Infinity : Infinity;
  for (const c of CENTER_FIRST) {
    const next = play(cols, turn, c);
    if (!next) continue;
    const score = search(next, other(turn), me, depth - 1, alpha, beta);
    if (maximising) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, best);
    }
    if (alpha >= beta) break;
  }
  return best;
}

export function bestMove(cols: Columns, me: Player, depth = 5): number {
  let best = -Infinity;
  let moves: number[] = [];
  for (const c of CENTER_FIRST) {
    const next = play(cols, me, c);
    if (!next) continue;
    const score = search(next, other(me), me, depth - 1, -Infinity, Infinity);
    if (score > best) {
      best = score;
      moves = [c];
    } else if (score === best) moves.push(c);
  }
  return moves[Math.floor(Math.random() * moves.length)];
}
