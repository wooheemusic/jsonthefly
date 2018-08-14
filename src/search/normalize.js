const isArray = Array.isArray;

function isInvalid(value, isEmptyStringIgnored) {
  return (
    value === null ||
    value === undefined ||
    (isEmptyStringIgnored === false && value === "") ||
    value !== value
  );
}

function deleteKey(obj, key, isEmptyStringIgnored) {
  if (isInvalid(obj[key], isEmptyStringIgnored)) {
    delete obj[key];
  }
}

function deleteElement(
  obj,
  key,
  isEmptyStringIgnored,
  isEmptyArrayIgnored,
  arrayToString
) {
  const arr = obj[key];
  const l = arr.length;
  let m = 0;
  for (let i = 0; i < l; i++) {
    if (isInvalid(arr[i - m], isEmptyStringIgnored)) {
      arr.splice(i - m, 1);
      m++;
    }
  }
  if (isEmptyArrayIgnored === false && arr.length === 0) {
    delete obj[key];
  }
  if (arrayToString === true) {
    if (arr.length === 1) obj[key] = arr[0];
    if (arr.length === 0) {
      // isEmptyArrayIgnored === true
      if (isEmptyStringIgnored === true) {
        obj[key] = "";
      } else {
        delete obj[key];
      }
    }
  }
}

export default function normalize(
  obj,
  isEmptyStringIgnored = false,
  isEmptyArrayIgnored = false,
  arrayToString = true,
  keys = Object.keys(obj)
) {
  // (scheduled) isReturningNew = false
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    const value = obj[key];
    if (isArray(value)) {
      deleteElement(
        obj,
        key,
        isEmptyStringIgnored,
        isEmptyArrayIgnored,
        arrayToString
      );
      // if (isEmptyArrayIgnored === false && value.length === 0) {
      //   delete obj[key];
      // }
      // if (arrayToString === true && value.length === 1) {
      //   obj[key] = value[0];
      // }
    } else {
      deleteKey(obj, key, isEmptyStringIgnored);
    }
  }
  return obj;
}
