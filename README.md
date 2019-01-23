# redux-user-timing [![npm version](https://badge.fury.io/js/redux-user-timing.svg)](https://badge.fury.io/js/redux-user-timing) [![Coverage Status](https://coveralls.io/repos/github/taehwanno/redux-user-timing/badge.svg)](https://coveralls.io/github/taehwanno/redux-user-timing) [![CircleCI](https://circleci.com/gh/taehwanno/redux-user-timing.svg?style=shield&circle-token=23145bdf74048861baf3d443ad6d2124e5444350)](https://circleci.com/gh/taehwanno/redux-user-timing)

> User Timing middleware for profiling redux application

## Introduction

Measuring performance is crucial for optimizing the application. Using with [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/), You can inspect performance about each dispatched redux action. For more details, check out [Carl Vitullo's Blog: Performance Profiling a Redux App](https://medium.com/@vcarl/performance-profiling-a-redux-app-c85e67bf84ae).

- [Performance Analysis in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

![Performance Analysis Example in Chrome DevTools](https://user-images.githubusercontent.com/7760903/51604574-832b2b80-1f50-11e9-8b3a-3f60255fef50.png)

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
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(userTiming));
```

Please, use this middleware only for development environment.

- `configureStore.js`

```js
import { createStore, applyMiddleware } from 'redux';
import userTiming from 'redux-user-timing';
import rootReducer from './reducers';

const configureStore = initialState => {
  const middlewares = [
    /* Some other middlewares */
  ];

  if (process.env.NODE_ENV !== 'production') {
    // Recommend to add redux-user-timing as a last middleware.
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

## Thanks

This idea is inspired by clarkbw. and thanks for Carl Vitullo about kind blog explanation.

## License

MIT © [Taehwan Noh](https://github.com/taehwanno)
