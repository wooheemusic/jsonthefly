export default function numberOf(a, A) {
  const l = A.length;
  let r = 0;
  for (let i = 0; i < l; i++) {
    if (A[i] === a) r++;
  }
  return r;
}
