// import arrayEqual from "../array/arrayEqual";
import arrayEqualWithoutOrder from "../array/arrayEqualWithoutOrder";
import is from "./is";

const isArray = Array.isArray;

// it returns true if two array properties are different but with the same values, order and length.
export default function shallowEqualByKeys(mapOrKeys, A, B) {
  let keys = null;
  if (mapOrKeys.length > -1) {
    keys = mapOrKeys;
  } else {
    keys = Object.keys(mapOrKeys);
  }
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    const a = A[key];
    const b = B[key];
    if (isArray(a)) {
      if (arrayEqualWithoutOrder(a, b) === false) return false;
    } else if (!is(a, b)) {
      return false;
    }
  }
  return true;
}
