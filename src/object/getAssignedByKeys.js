// The entries that are in the intersection of given keys and a original object will be assigned to the copy.
export default function getAssignedByKeys(copy, keys, origin) {
  // let keys = null;
  // if (mapOrKeys.length > -1) {
  //   keys = mapOrKeys;
  // } else {
  //   keys = Object.keys(mapOrKeys);
  // }
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    if (hasOwnProperty.call(origin, key)) {
      copy[key] = origin[key];
    }
  }
  return copy;
}
