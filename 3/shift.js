(() => {
  const FLOW = {
    H: undefined,
    B: undefined,
    T: undefined,
    Q: undefined,
    D: undefined,
    F: undefined
  };

  window.setFLOW = ({ h, b, t, q, d, f } = {}) => {
    if (h !== undefined) FLOW.H = h;
    if (b !== undefined) FLOW.B = b;
    if (t !== undefined) FLOW.T = t;
    if (q !== undefined) FLOW.Q = q;
    if (d !== undefined) FLOW.D = d;
    if (f !== undefined) FLOW.F = f;

    return { ...FLOW };
  };
})();
