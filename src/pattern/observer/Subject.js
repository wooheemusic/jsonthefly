export default class Subject {

  constructor(initState = {}) {
    this.obs = new Set();
    this.state = initState;
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

  // I am considering a primitive version for the react functional approach.
  setState(v) {
    if (!v || this.state === v) return;
    if (typeof v === "object") {
      this.state = { ...this.state, ...v };
      this.notify();
    } else if (typeof v === "function") {
      this.state = { ...this.state, ...v(this.state) };
      this.notify();
    }
  }

  getState() {
    return this.state;
  }
}

