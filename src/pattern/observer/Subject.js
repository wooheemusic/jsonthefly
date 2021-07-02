function isMergeable(o) {
  return typeof o === 'object' && (o === null || o.constructor === Object || o.prototype === void 0);
}

export default class Subject {

  constructor(initState, isMerging = false) {
    this.obs = new Set();
    // this.state = typeof initState === 'object' ? {...initState} : initState; // defensive against modifying initstate
    this.state = initState; // shift defensiveness onto clients... like the react state rule. 
    this.isMerging = isMerging;
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

    // isMerging === true means I will use Object.assign for states
    // isMergeable checks whether you can safely merge states or not. Subject.js does not allow customised constructors in the merging mode.
    if (this.isMerging && isMergeable(this.state)) {
      if (isMergeable(v)) {
        this.state = { ...this.state, ...v }; // null decomposition is ok for preset-env default
        this.notify();
        return true;
      } else if (typeof v === 'boolean') { // forceUpdate for true, nothing for false
        v && this.notify();
        return v; // -,.-;
      } else {
        throw new Error('If the previous state is an mergeable object, a following state should be an mergeable object or a boolean');
      }
    } else {
      // for primitive state or hook style of react
      this.state = v;
      this.notify();
      return true;
    }
  }

  getState() {
    return this.state;
  }
}

