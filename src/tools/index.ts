export * from './Vec';

export function clamp(n: number, min: number, max: number): number {
  if (n < min) {
    return min;
  } else if (n > max) {
    return max;
  } else {
    return n;
  }
}

export function bunchBy<A>(xs: A[], n: number): A[][] {
  const out = [];

  for (let i = 0; i < xs.length - n + 1; i++) {
    out.push(xs.slice(i, i + n));
  }

  return out;
}
