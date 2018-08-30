import _select from "./_select";

export default function select(list, searchKeys, keyValues, returnKeys) {
  return _select(list, searchKeys, keyValues, returnKeys, null, false);
}
