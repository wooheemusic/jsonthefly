import is from "../object/is";
import arrayEqualWithoutOrder from "../array/arrayEqualWithoutOrder";

function equals(a, b, notStrictly) {
  if (notStrictly) return is(a || null, b || null);
  else is(a, b);
}

export default function paramEqual(a, b, notStrictly = true) {
  if (equals(a, b, notStrictly)) {
    return true;
  }
  const isArray = Array.isArray;
  if (isArray(a)) {
    if (isArray(b)) {
      return arrayEqualWithoutOrder(a, b, true);
    } else
      return (
        (a.length === 1 && equals(a[0], b, notStrictly)) ||
        (notStrictly === true && a.length === 0 && equals(b, undefined, true))
      );
  } else if (isArray(b)) {
    return (
      (b.length === 1 && equals(b[0], a, notStrictly)) ||
      (notStrictly === true && b.length === 0 && equals(a, undefined, true))
    );
  }
  return false;
}
