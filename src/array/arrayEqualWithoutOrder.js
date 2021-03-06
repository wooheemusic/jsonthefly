import numberOf from "./numberOf";
import indexOf from "./indexOf";

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

function arrayEqual2(A, _B, alreadyChecked = false) {
  const isArray = Array.isArray;
  if (!alreadyChecked && !(isArray(A) && isArray(_B))) {
    return false;
  }
  const l = A.length;
  const m = _B.length;
  if (l !== m) {
    return false;
  }
  // const A = [..._A];
  const B = [..._B];
  for (let i = 0; i < l; i++) {
    const a = A[i];
    const index = indexOf(a, B);
    if (index !== -1) {
      B.splice(index, 1);
    }
  }
  if (B.length !== 0) return false;
  return true;
}

export default arrayEqual2;
