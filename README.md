# JSONTHEFLY
This repo has been started to practise *javascript on the fly*. However, I found some codes are very interesting. Let me introduce some features.

## Features

### `Subject` for the observer pattern
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
### Singleton `useReducer` for `react.js`
1. Create a reducer.
```jsx
// reducers/pizzaReducer.js

const initState = { cheeze: 10, dough: 'normal' };

function _reduceCheeze(state, cheeze) {
    if (state.cheeze === cheeze) {
        return state;
    };
    return { ...state, cheeze };
}

function _reduceChangeDough(state, dough) {
    if (state.dough === dough) {
        return state;
    };
    return { ...state, dough };
}

function pizzaReducer(state, action) {
    switch (action.type) {
        case 'jumbo':
            return _reduceChangeDough(_reduceCheeze(state, 30), 'heavy');
        case 'thin':
            return _reduceChangeDough(_reduceCheeze(state, 10), 'light');
        default:
            throw new Error('invalid action of reducePizza');
    }
}

const actionTypes = ['jumbo', 'thin'];

export { initState, actionTypes };

export default pizzaReducer;
```
2. Create a module ref for usePizzaReducer.
```jsx
// reducers/usePizzaReducer.js

import createSingletonUseReducer from 'jsonthefly/react/createSingletonUseReducer';
import pizzaReducer, { initState, actionTypes } from './pizzaReducer';

export { initState, actionTypes };
export default createSingletonUseReducer(pizzaReducer, initState);
```

3. Just use it in many components
```jsx
import usePizzaReducer from 'reducers/usePizzaReducer';

export default function MyComponent(props) {
    const [{dough, cheeze}, dispatchPizza] = usePizzaReducer();
    ...
}
```
`usePizzaReducer` is safe from `MyComponent`'s unmount.

- You can make the singletoneUseReducer watch another resource.
```js
export default createSingletonUseReducer(pizzaReducer, initState, setState => {
    // bind it to DOM
    window.addEventListener('resize', e => {
        // ...
        setState(something);
    });
    // or
    // ...
    anotherSubject.register({ update: setState });
});
```
The callback is executed at the very beginning.
- You can create singletoneUseReducer with a `Storage`
```js
import createSingletonUseReducer from 'jsonthefly/react/createSingletonUseReducer';
import StorageSubject from 'jsonthefly/pattern/observer/StorageSubject'
import colorReducer, { initState, actionTypes } from './reduceColor';

export { initState, actionTypes };
export default createSingletonUseReducer(colorReducer, new StorageSubject(localStorage, 'color', initState));
```
`StorageSubject` supports only number, string, boolean and plain object. The type of `initState` and following states should be constant. The storage does not need to be a built-in object if you do not use `storage` events. If it has `getItem` and `setItem`, it is ok.  

- I cannot come up with an idea that manages life cycles of createSingletonUseReducer. `create-react-app` uses `webpack` to bundle javascript modules, which compose a huge permanant ref tree. I can only detach an object in a module, but not a module. If I detached createSingletonUseReducer in some way, it would not have been imported like
```js
import usePizzaReducer from '../states/usePizzaReducer';
```
I prefer this way so far.

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
