# JSONTHEFLY
This repo has been started to practise *javascript on the fly*. However, I found some codes are very intereting. Let me introduce some features.

## Features

### Subject and useReducer
You can extend `Subject` to use the observer pattern.
```js
class Toggler extends Subject {
  constructor(initState) {
    super(initState);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prev => ({
      isOpen: !prev.isOpen
    }));
  }
}
```
Or you can use it as a singletone subject for react `useState` or `useReducer`.
All components using `useSingletonReducer` will share and listen to a single source. 
```jsx
import { useState, useRef, useMemo } from 'react';
import Subject from "jsonthefly/pattern/observer/Subject";

let subject;
function getSubject(initialState) {
  !subject && (subject = new Subject(initialState));
  return subject;
}

export default function useSingletonReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const id = useRef();
  useMemo(() => {
    id.current = { update: setState };
    getSubject(initialState).register(id.current);
  }, [id]);

  function dispatch(action) {
    const nextState = reducer(state, action);
    getSubject(initialState).setState(nextState);
  }

  return [state, dispatch];
}
```
This code will be provided as a module in a few days. :)

### (...)



## License

MIT © [wooheemusic](https://github.com/wooheemusic)
