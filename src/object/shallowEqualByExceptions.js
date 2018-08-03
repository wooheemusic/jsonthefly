// import arrayEqual from "../array/arrayEqual";
import arrayEqualWithoutOrder from "../array/arrayEqualWithoutOrder";
import is from "./is";
import indexOf from "../array/indexOf";

const isArray = Array.isArray;
const hasOwnProperty = Object.prototype.hasOwnProperty;

// it returns true even if two array properties are different with the same values and length but different order.
export default function shallowEqualByException(
  mapOrKeys,
  A,
  B,
  checkArrayElements = false
) {
  if (is(A, B)) {
    return true;
  }
  if (
    typeof A !== "object" ||
    A === null ||
    typeof B !== "object" ||
    B === null
  ) {
    return false;
  }
  let keys = null;
  if (isArray(mapOrKeys)) {
    keys = mapOrKeys;
  } else {
    keys = Object.keys(mapOrKeys);
  }
  const l = keys.length;

  const keysA = Object.keys(A);
  const keysB = Object.keys(B);

  for (let i = 0; i < l; i++) {
    const key = keys[i];
    const aIndex = indexOf(key, keysA);
    if (aIndex !== -1) {
      keysA.splice(aIndex, 1);
    }
    const bIndex = indexOf(key, keysB);
    if (bIndex !== -1) {
      keysB.splice(bIndex, 1);
    }
  }

  const al = keysA.length;
  if (al !== keysB.length) {
    return false;
  }
  // Test for A's keys different from B.
  for (let i = 0; i < al; i++) {
    const key = keysA[i];
    if (!hasOwnProperty.call(B, key)) {
      return false;
    }
    const a = A[key];
    const b = B[key];
    if (checkArrayElements && isArray(a)) {
      if (arrayEqualWithoutOrder(a, b) === false) return false;
    } else if (!is(a, b)) {
      return false;
    }
  }

  return true;
}
