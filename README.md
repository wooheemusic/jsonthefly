# JSONTHEFLY
This repo has been started to practise *javascript on the fly*. However, I found some codes are very interesting. Let me introduce some features.

## Features

### Subject for the observer pattern
You can extend `Subject` to use the observer pattern.
```js
import Subject from 'jsonthefly/pattern/observer/Subject';

export default class Toggler extends Subject {
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
### Singleton useReducer
```jsx
... yet
```

### Cancel promises
`pseudoPromise` disables subsequent methods of Promise. You can hijack the promise sequences of exsting codes. It will be very helpful in debugging or edge cases.
```js
import { pseudoPromise } from 'jsonthefly/async';

// just add .then(pseudoPromise, pseudoPromise)
...promise1.promise2.promise3.then(pseudoPromise, pseudoPromise).promise4.promise5.promise6...
// or return pseudoPromise() in a callback you want to be the point of cascading.
...then(v=> {
    ...
    return pseudoPromise();
})...

```

## License

MIT © [wooheemusic](https://github.com/wooheemusic)
