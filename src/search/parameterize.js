export default function parameterize(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return undefined;
  }
  return arr || undefined;
}

// querystring 에서 []에서 버그가 난다... 그것을 수정하는 메소드///

// 아래는 ...

// function parse(search) {
//   if (search) return querystring.parse(search.slice(1));
//   return {};
// }

// function stringify(obj) {
//   const str = querystring.stringify(obj);
//   if (str) return `?${str}`;
//   return str;
// }
