import indexOf from "./indexOf";

function mergeArrays(B, A) {
  const l = A.length;
  const m = B.length;
  const r = [...B];
  TOP: for (let i = 0; i < l; i++) {
    const a = A[i];
    for (let j = 0; j < m; j++) {
      if (a === B[j]) continue TOP;
    }
    r.push(a);
  }
  return r;
}

export default function merge(A, B) {
  if (isArray(A)) {
    if (isArray(B)) {
      return mergeArrays(A, B);
    }
    const _A = [...A];
    if (indexOf(B, _A) !== -1 || B === undefined) {
      return _A;
    }
    _A.push(B);
    return _A;
  } else if (isArray(B)) {
    const _B = [...B];
    if (indexOf(A, _B) !== -1 || A === undefined) {
      return _B;
    }
    _B.push(A);
    return _B;
  }
  const result = [];
  if (A === B && A !== undefined) {
    result.push(A);
    return result;
  }
  if (A !== undefined) {
    result.push(A);
  }
  if (B !== undefined) {
    result.push(B);
  }
  return result;
}
