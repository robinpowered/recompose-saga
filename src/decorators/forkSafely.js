import {fork, call} from 'redux-saga'


/**
 * Safely fork a saga by trapping exceptions.
 *
 * Example:
 * ```
 * yield forkSafely(sagaThatMayThrow)
 * ```
 *
 * @param {Function} saga The saga to safely fork.
 * @param {*} args The arguments for the saga.
 * @returns {Object} The forked saga instruction.
 */
export function forkSafely (instruction, onError) {
  return fork(function* () {
    try {
      yield instruction
    } catch (error) {
      if (onError) {
        yield forkSafely(call(onError, e))
      }
    }
  });
}
