const middleware = () => next => action => {
  if (!performance || !performance.mark) {
    return next(action);
  }

  if (
    typeof action !== 'object' ||
    !action.type ||
    typeof action.type !== 'string'
  ) {
    console.error(
      'Warning: action type is not valid. Performance measurement is not working properly.',
    );
    return next(action);
  }

  performance.mark(`${action.type}_START`);
  const result = next(action);
  performance.mark(`${action.type}_END`);
  performance.measure(
    `${action.type}`,
    `${action.type}_START`,
    `${action.type}_END`,
  );
  return result;
};

export default middleware;
