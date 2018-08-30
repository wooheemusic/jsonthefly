import isValidObject from "./isValidObject";
import isFromNative from "./isFromNative";

function deepAssign(
  target,
  addition,
  checkIfNative = false,
  check = isFromNative
) {
  if (!isValidObject(target) || !isValidObject(addition)) {
    throw new Error("Arguments of 'deepAssign' should be non-null objects.");
  }

  const keys = Object.keys(addition);
  const l = keys.length;

  for (let i = 0; i < l; i++) {
    const propertyName = keys[i];
    const property = addition[propertyName];
    if (isValidObject(property) && (!checkIfNative || !check(property))) {
      // const targetProperty = target[propertyName];
      if (!isValidObject(target[propertyName])) {
        target[propertyName] = Array.isArray(property) ? [] : {};
      }
      deepAssign(target[propertyName], property);
    } else {
      target[propertyName] = property;
    }
  }
  return target;
}

export default deepAssign;
