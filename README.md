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

export default [pizzaReducer, initState];
```
2. Create a module ref for usePizzaReducer.
```jsx
import createSingletonUseReducer from 'jsonthefly/react/createSingletonUseReducer';
import reducePizza, { initState, actionTypes } from './reducePizza';

export { initState, actionTypes };
export default createSingletonUseReducer(...reducePizza);
```

3. Just use it in many components
```jsx
import usePizzaReducer from 'common/reducers/usePizzaReducer';

export default function MyComponent(props) {
    const [{dough, cheeze}, dispatchPizza] = usePizzaReducer();
    ...
}
```
`usePizzaReducer` is safe from `MyComponent`'s unmount.

4. You can make the singletoneUseReducer watch another resource.
```
export default createSingletonUseReducer(...reducePizza, setState => {
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
