// import arrayEqual from "../array/arrayEqual";
import arrayEqualWithoutOrder from "../array/arrayEqualWithoutOrder";
import is from "./is";

const hasOwnProperty = Object.prototype.hasOwnProperty;

// this check hasOwnProperty by default
// it returns true even if two array properties are different with the same values and length but different order.
export default function shallowEqualByKeys(
  mapOrKeys,
  A,
  B,
  checkArrayElements = false,
  checkHasOwnProperty = true
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
  if (Array.isArray(mapOrKeys)) {
    keys = mapOrKeys;
  } else {
    keys = Object.keys(mapOrKeys);
  }

  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    if (
      checkHasOwnProperty &&
      !(hasOwnProperty.call(A, key) && hasOwnProperty.call(B, key))
    ) {
      return false;
    }
    const a = A[key];
    const b = B[key];
    if (checkArrayElements && Array.isArray(a) && Array.isArray(b)) {
      if (arrayEqualWithoutOrder(a, b, true) === false) return false;
    } else if (!is(a, b)) {
      return false;
    }
  }
  return true;
}
