import is from "./is";
import arrayEqualWithoutOrder from "../array/arrayEqualWithoutOrder";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export default function shallowEqual(objA, objB, checkArrayElements = false) {
  if (is(objA, objB)) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }
  // Test for A's keys different from B.
  const l = keysA.length;
  for (let i = 0; i < l; i++) {
    const key = keysA[i];
    if (!hasOwnProperty.call(objB, key)) {
      return false;
    }
    const a = objA[key];
    const b = objB[key];
    if (checkArrayElements && Array.isArray(a)) {
      if (arrayEqualWithoutOrder(a, b) === false) return false;
    } else if (!is(a, b)) {
      return false;
    }
  }
  return true;
}
