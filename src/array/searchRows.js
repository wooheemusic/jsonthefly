export default function searchRows(
  list,
  searchKey,
  key,
  returnKey,
  notFound = null
) {
  if (!Array.isArray(list)) return notFound;
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const row = list[i];
    if (row[searchKey] === key) {
      return row[returnKey];
    }
  }
  return notFound;
}
