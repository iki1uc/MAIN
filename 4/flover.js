window.setFLOW = ({ h, b, t, q, d, f } = {}) => {
  if (h !== undefined) H = h;
  if (b !== undefined) B = b;
  if (t !== undefined) T = t;
  if (q !== undefined) Q = q;
  if (d !== undefined) D = d;
  if (f !== undefined) F = f;

  return { H, B, T, Q, D, F };
};
