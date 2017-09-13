import forkSafely from './forkSafely';

/**
 * Wraps a saga with an exception interceptor, which will report any thrown exceptions to a callback.
 * The exception will be rethrown to bubble up the call stack.
 *
 * @param {Function} saga The saga to wrap.
 * @param {Function} onError The exception handler.
 * @returns {Function} The wrapped saga.
 */
export default function interceptExceptions (instruction, onError) {
  return function* innerSaga (...args) {
    try {
      var result = yield instruction;
      return result;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  };
}
