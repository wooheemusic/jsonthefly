import numberOf from "./numberOf";
import indexOf from "./indexOf";

const isArray = Array.isArray;

function arrayEqual1(A, B) {
  const l = A.length;
  const m = B.length;
  if (l === undefined || l !== m) {
    return false;
  }
  for (let i = 0; i < l; i++) {
    const a = A[i];
    const num = numberOf(a, B);
    if (num === 0) {
      return false;
    } else if (num !== 1 && numberOf(a, A) !== num) {
      return false;
    }
  }
  return true;
}

function arrayEqual2(_A, _B) {
  if (!(isArray(_A) && isArray(_B))) {
    return false;
  }
  const l = _A.length;
  const m = _B.length;
  if (l !== m) {
    return false;
  }
  const A = [..._A];
  const B = [..._B];
  for (let i = 0; i < l; i++) {
    const a = A[i];
    const index = indexOf(a, B);
    if (index !== -1) {
      b.splice(index, 1);
    }
  }
  if (B.length !== 0) return false;
  return true;
}

export default arrayEqual2;
