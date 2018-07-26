export default function arrayEqual(A, B) {
  const l = A.length;
  const m = B.length;
  if (l === undefined || l !== m) {
    return false;
  }
  for (let i = 0; i < l; i++) {
    if (A[i] !== B[i]) {
      return false;
    }
  }
  return true;
}
