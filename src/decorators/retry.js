import {call} from 'redux-saga';
import delay from '../utils/delay';

export default function retry (sagaInstruction, attempts, factor, delayDuration, shouldRetry) {
  return call(function* () {
    try {
      yield sagaInstruction;
    } catch (e) {
      if (attempts > 0 && (!shouldRetry || shouldRetry(e))) {
        yield delay(delayDuration * factor);
        yield retry(sagaInstruction, attempts - 1, factor * 2, delayDuration, shouldRetry);
      } else {
        throw new Error('Retry failed');
      }
    }
  });
}
