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

  const isCurrentAvailable = totalPageCnt >= current && current > 0;

  // if (!isCurrentAvailable) {
  //   return {
  //     before: null,
  //     next: null,
  //     start: null,
  //     maxRange: null
  //   };
  // }

  const rangeIndex = Math.ceil(current / range);
  const lastRangeIndex = Math.ceil(totalPageCnt / range);
  const isInFirstRange = rangeIndex === 1;
  const isInLastRange = lastRangeIndex === rangeIndex;

  // const innerIndex = isCurrentAvailable ? current % range || range : null;
  const start = (rangeIndex - 1) * range + 1;
  // const end = isCurrentAvailable ? rangeIndex * range : null;

  let before;
  let next;
  if (isMovingInRange) {
    before = !isInFirstRange
      ? setLastForBefore
        ? (rangeIndex - 1) * range
        : (rangeIndex - 2) * range + 1
      : 1;
    next = !isInLastRange ? rangeIndex * range + 1 : totalPageCnt;
  } else {
    before = current > 1 ? current - 1 : current;
    next = totalPageCnt > current ? current + 1 : totalPageCnt;
  }

  const maxRange = isCurrentAvailable
    ? isInLastRange
      ? totalPageCnt % range || range
      : range
    : 0;

  return {
    before,
    next,
    start,
    maxRange
  };
}
