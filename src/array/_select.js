import isValidObject from "../object/isValidObject";

function extract(row, returnKeys) {
  if (!returnKeys) {
    return row;
  }
  if (typeof returnKeys === "string") {
    return row[returnKeys];
  } else if (Array.isArray(returnKeys)) {
    const newRow = {};
    const l = returnKeys.length;
    for (let i = 0; i < l; i++) {
      const key = returnKeys[i];
      newRow[key] = row[key];
    }
    return newRow;
  }
}

function match(row, searchKeys, keyValues) {
  if (typeof searchKeys === "string") {
    if (row[searchKeys] !== keyValues) {
      return false;
    }
  } else if (Array.isArray(searchKeys)) {
    const l = searchKeys.length;
    for (let i = 0; i < l; i++) {
      const key = searchKeys[i];
      if (row[key] !== keyValues[i]) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

/**
 *
 * this method will be updated.... lots of things to be refined
 *
 * @param {*} list
 * @param {*} searchKeys
 * @param {*} keys
 * @param {*} returnKeys If 'returnKeys' is parsed to false, it returns the existing row object.
 * @param {*} notFound null as default
 */
export default function _select(
  list,
  searchKeys,
  keyValues,
  returnKeys,
  notFound = null,
  selectOne = false
) {
  let result;
  if (!selectOne) {
    result = [];
  }
  if (!Array.isArray(list)) return notFound;
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const row = list[i];
    if (!isValidObject(row)) {
      continue;
    }
    if (match(row, searchKeys, keyValues)) {
      if (selectOne) {
        return extract(row, returnKeys);
      } else {
        result.push(extract(row, returnKeys));
      }
    }
  }
  if (selectOne) {
    return notFound;
  }
  return result;
}
