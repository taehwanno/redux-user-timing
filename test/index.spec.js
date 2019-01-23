import middleware from '../src';

const createMiddleware = () => {
  const next = jest.fn(value => value);
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const invoke = action => middleware(store)(next)(action);
  return { store, next, invoke };
};

describe('user timing middleware', () => {
  it('should execute next when performance is not supported', () => {
    const { next, invoke } = createMiddleware();
    const action = { type: 'ACTION' };
    const result = invoke(action);
    expect(result).toEqual(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should execute performance mark and measure with intended sequence', () => {
    const { next, invoke } = createMiddleware();
    const action = { type: 'ACTION' };
    global.performance = {};
    global.performance.mark = next;
    global.performance.measure = next;
    const result = invoke(action);
    expect(result).toEqual(action);
    expect(next).toHaveBeenNthCalledWith(1, 'ACTION_START');
    expect(next).toHaveBeenNthCalledWith(2, action);
    expect(next).toHaveBeenNthCalledWith(3, 'ACTION_END');
    expect(next).toHaveBeenNthCalledWith(
      4,
      'ACTION',
      'ACTION_START',
      'ACTION_END',
    );
    global.performance = undefined;
  });

  it('should print a warning message and return action when action type not exists or non-string.', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { next, invoke } = createMiddleware();
    const action = {};
    global.performance = {};
    global.performance.mark = next;
    global.performance.measure = next;
    const result = invoke(action);
    expect(result).toEqual(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
    global.performance = undefined;
  });
});
