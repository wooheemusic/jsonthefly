function isAvailable(totalPageCnt, current) {
  return totalPageCnt >= current && current > 0;
}

function getCeil(total, range) {}
function getFloor(total, range) {}

export default function getPagenation(
  totalPageCnt,
  current,
  range = 10,
  isMovingInRange = true,
  setLastForBefore = false
) {
  if (
    !(
      Number.isInteger(totalPageCnt) &&
      Number.isInteger(current) &&
      Number.isInteger(range)
    )
  )
    throw new Error("only integers available");

  const isCurrentAvailable = isAvailable(totalPageCnt, current);

  const outerIndex = Math.ceil(current / range);
  // const innerIndex = isCurrentAvailable ? current % range || range : null;
  const start = isCurrentAvailable ? (outerIndex - 1) * range + 1 : null;
  // const end = isCurrentAvailable ? outerIndex * range : null;

  const totalLastRange = totalPageCnt % range || range;
  const fullRangeChount = Math.floor(totalPageCnt / range);
  const maxRange = isCurrentAvailable
    ? fullRangeChount * range < current
      ? totalLastRange
      : range
    : 0;

  let before;
  let next;
  if (isMovingInRange) {
    before =
      current > range
        ? setLastForBefore
          ? (outerIndex - 1) * range
          : (outerIndex - 2) * range + 1
        : null;
    next =
      Math.ceil(totalPageCnt / range) > outerIndex
        ? outerIndex * range + 1
        : null;
  } else {
    before = current > 1 ? current - 1 : null;
    next = totalPageCnt > current ? current + 1 : null;
  }
  before = isAvailable(totalPageCnt, before) ? before : null;
  next = isAvailable(totalPageCnt, next) ? next : null;

  return {
    before,
    next,
    start,
    maxRange
  };
}
