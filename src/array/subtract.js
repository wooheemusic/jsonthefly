import indexOf from "./indexOf";

function subtractArrays(B, A) {
  const l = A.length;
  let m = B.length;
  TOP: for (let i = 0; i < l; i++) {
    const a = A[i];
    for (let j = 0; j < m; j++) {
      if (a === B[j]) {
        B.splice(j, 1);
        m--;
        continue TOP;
      }
    }
  }
  return B;
}

function subtractStringFromArray(A, a) {
  const l = A.length;
  const i = indexOf(a, A);
  if (i !== -1) {
    A.splice(i, 1);
  }
  return A;
}

// (issue) string - undefined, null - undefined ?????
export default function subtract(A, B) {
  if (isArray(A)) {
    if (isArray(B)) {
      return subtractArrays(A, B);
    }
    return subtractStringFromArray(A, B);
  } else if (isArray(B)) {
    return indexOf(A, B) !== -1 ? "" : A;
  }
  if (A === B) {
    return "";
  }
  return A;
}
