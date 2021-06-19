export const norm = (x: number, mui: number, sigma: number, A: number) => {
  return A / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(- 1 / 2 * ((x - mui) / sigma) ** 2);
};
