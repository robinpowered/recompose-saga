/**
 * Keeps a saga process alive.
 *
 * @param  {Object}    saga    The saga task to keep alive.
 * @param  {?Function} onError An optional callback when the saga dies.
 * @return {Object} A fork saga instruction keeping the saga alive.
 */
export default function keepAlive (saga, onError) {
  return fork(function* () {
    while (true) {
      try {
        // Start the saga task.
        let task = yield saga;
        yield join(task);
      } catch (e) {
        // If a callback is provided, notify the callback of the error.
        if (onError) {
          yield call(onError, e);
        }
      }
    }
  });
}
