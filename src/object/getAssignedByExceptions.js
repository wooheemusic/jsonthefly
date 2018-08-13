import indexOf from "../array/indexOf";

const hasOwnProperty = Object.prototype.hasOwnProperty;
// The entries that are in the intersection of given keys and a original object will be assigned to the copy.
export default function getAssignedByExceptions(copy, exKeys, origin) {
  // let keys = null;
  // if (mapOrKeys.length > -1) {
  //   keys = mapOrKeys;
  // } else {
  //   keys = Object.keys(mapOrKeys);
  // }
  const keys = Object.keys(origin);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    const key = keys[i];
    if (indexOf(key, exKeys) === -1) {
      copy[key] = origin[key];
    }
  }
  return copy;
}
