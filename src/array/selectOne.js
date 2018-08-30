import _select from "./_select";

export default function selectOne(
  list,
  searchKeys,
  keyValues,
  returnKeys,
  notFound
) {
  return _select(list, searchKeys, keyValues, returnKeys, notFound, true);
}
