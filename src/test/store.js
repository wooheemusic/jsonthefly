const states = [];

export default function store(state) {
  states.push(state);
  const l = states.length;
  const prev = states[l - 2];
  const curr = states[l - 1];
  console.log("store prev", prev);
  console.log("store current", curr);
  console.log("store equality", curr && prev && curr === prev);
}
