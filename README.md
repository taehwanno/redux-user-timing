# redux-user-timing

> User Timing API middleware for profiling redux application


## Installation

```shell
$ npm i redux-user-timing
```

Alternatively, using yarn:

```shell
$ yarn add redux-user-timing
```

Then enable redux-user-timing with `applyMiddleware()`

```js
import { createStore, applyMiddleware } from 'redux';
import userTiming from 'redux-user-timing';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(userTiming));
```

Please, use this middleware only for development environment.

```js
// configureStore.js
import { createStore, applyMiddleware } from 'redux';
import userTiming from 'redux-user-timing';

const configureStore = initialState => {
  const middlewares = [
    /* Some other middlewares */
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(userTiming);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  return store;
};

export default configureStore;
```


## License

MIT © [Taehwan Noh](https://github.com/taehwanno)
