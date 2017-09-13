import forkSafely from './forkSafely';

/**
 * Safely calls a saga by trapping exceptions.
 *
 * Example:
 * ```
 * yield safely(sagaThatMayThrow)
 * ```
 *
 * @param {Function} saga  The saga to safely call.
 * @param {Function} onError A function that will be called when an error occurs.
 * @returns {Object} The called saga instruction.
 */
export default function safely (instruction, onError) {
  return call(function* () {
    try {
      let result = yield instruction;
      return result;
    } catch (e) {
      if (onError) {
        yield forkSafely(onError, e);
      }
      return null;
      // no-op
    }
  });
}
