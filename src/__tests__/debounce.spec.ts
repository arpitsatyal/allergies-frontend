import { debounce } from '../utils/debounce';

describe('debounce', () => {
  it('should call the callback after the specified delay', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 100);

    debounced();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalled();
  });

  it('should pass arguments to the callback', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 100);

    debounced('hello', 'world');

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith('hello', 'world');
  });

  it('should use the default delay if none is provided', () => {
    const callback = jest.fn();
    const debounced = debounce(callback);

    debounced();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(250);
    expect(callback).toHaveBeenCalled();
  });
})

