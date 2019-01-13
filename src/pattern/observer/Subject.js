class Subject {
  constructor(deafultState = {}) {
    this.obs = [];
    this.state = deafultState;
  }
  register(ob) {
    // it will be switched by flow
    if (!(typeof ob === "object" && typeof ob.update === "function")) {
      throw new Error(
        "SingleSubject.register allows only an instance of Observer"
      );
    }
    this.obs.push(ob);
  }
  unregister(ob) {
    const i = this.obs.indexOf(ob);
    i > -1 && this.obs.splice(i, 1);
  }
  notify() {
    const { obs } = this;
    const l = obs.length;
    for (let i = 0; i < l; i++) {
      obs[i].update();
    }
  }
  setState(v) {
    if (!v) return;
    // Boolean(v) === true triggers rendering
    if (typeof v === "object") {
      this.state = { ...this.state, ...v };
    } else if (typeof v === "function") {
      this.state = { ...this.state, ...v(this.state) };
    }
    this.notify();
  }
}

export default Subject;
