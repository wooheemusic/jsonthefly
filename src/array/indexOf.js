export default function indexOf(a, A) {
  const l = A.length;
  for (let i = 0; i < l; i++) {
    if (A[i] === a) return i;
  }
  return -1;
}
