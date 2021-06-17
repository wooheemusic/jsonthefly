export default class Subject {

  constructor(initState = {}) {
    this.obs = new Set();
    this.state = typeof initState === 'object' ? {...initState} : initState; // defensive against modifying initstate
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
    this.obs.delete(ob);
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
    if (this.state === v) return; // not considering NaN and -0 

    if (typeof this.state === 'object') {
      if (typeof v === "object") {
        this.state = { ...this.state, ...v }; // null decomposition is ok for preset-env default
        this.notify();
      } else if (typeof v === 'boolean') { // forceUpdate for true, nothing for false
        v && this.notify();
      } else {
        throw new Error('If the previous state is an object, a following state should be an object or a boolean');
      }
    } else {
      // for primitive state
      this.state = v;
      this.notify();
    }
  }

  getState() {
    return this.state;
  }
}

