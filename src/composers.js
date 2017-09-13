import retry from './decorators/retry';
import keepAlive from './decorators/keepAlive';
import interceptExceptions from './decorators/exceptionInterceptor';
import safely from './decorators/safely';

export function withRetry (attempts, factor, delayDuration, shouldRetry) {
  return saga => function* innerSaga (...args) {
    yield retry(
      call(saga, ...args),
      attempts,
      factor,
      delayDuration,
      shouldRetry
    );
  };
}

export function withKeepAlive (onError) {
  return saga => function* innerSaga(...args) {
    yield keepAlive(
      call(saga, ...args),
      onError
    );
  }
}

export function withExceptionInterceptor (onError) {
  return saga => function* innerSaga (...args) {
    yield interceptExceptions(
      call(saga, ...args),
      onError
    );
  };
}

export function withSafely (onError) {
  return saga => function* innerSaga (...args) {
    yield safely(
      call(saga, ...args),
      onError
    );
  };
}

export function compose (...decorators) {
  let start = decorators.splice(0, 1);
  const composed = decorators.reduce((decorated, decorator) => decorated(decorator), start);
  return saga => composed(saga);
}
