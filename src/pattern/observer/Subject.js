const fundamentalConstructor = {}.constructor;

export default class Subject {

  constructor(initState, isHookStyle = true) {
    this.obs = new Set();
    // this.state = typeof initState === 'object' ? {...initState} : initState; // defensive against modifying initstate
    this.state = initState; // shift defensiveness onto clients... like the react state rule. 
    this.isHookStyle = isHookStyle;
  }

  register(ob) {
    if (typeof ob !== "object" || typeof ob.update !== "function") {
      throw new Error(
        "Subject.prototype.register allows only an object with a function property of 'update'"
      );
    }
    this.obs.add(ob);
  }

  unregister(ob) {
    return this.obs.delete(ob);
  }

  clear() {
    this.obs.clear()
  }

  notify() {
    for (let ob of this.obs.values()) {
      ob.update(this.state);
    }
  }

  setState(v) {
    // resolving function arg
    typeof v === 'function' && (v = v(this.state));

    // nothing changed
    if (this.state === v) return false; // not considering NaN and -0 

    if (!this.isHookStyle && typeof this.state === 'object') {
      if (typeof v === "object"
        && ((typeof Symbol === 'function') ? !(Symbol.iterator in v) : !Array.isArray(v)) // exclude iterables, 
        && v.constructor === fundamentalConstructor) { // allows only an fundamental object
        this.state = { ...this.state, ...v }; // null decomposition is ok for preset-env default
        this.notify();
        return true;
      } else if (typeof v === 'boolean') { // forceUpdate for true, nothing for false
        v && this.notify();
        return v; // -,.-;
      } else {
        throw new Error('If the previous state is an object, a following state should be an object or a boolean');
      }
    } else {
      // for primitive state or hook style
      this.state = v;
      this.notify();
      return true;
    }
  }

  getState() {
    return this.state;
  }
}

