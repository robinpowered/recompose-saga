export function withExceptionInterceptor (onError) {
  return saga => function* innerSaga (...args) {
    try {
      var result = yield call(saga, ...args);
      return result;
    } catch (error) {
      if (error) {
        yield call(onError);
      }
      throw onError;
    }
  }
}

export function withKeepAlive (onError) {
  return saga => function* innerSaga (...args) {
    yield fork(function* () {
      while (true) {
        try {
          let task = yield saga;
          yield join(task)
        } catch (e) {
          if (onError) {
            yield call(onError, e)
          }
        }
      }
    });
  };
}

export function withSafely (onError) {
  return saga => function* innerSaga (...args) {
    const safeCall = safely(call)(saga)
    try {
      let result = yield safeCall(...args);
      return result;
    } catch (e) {
      if (onError) {
        yield call(onError, e);
      }
      return null;
    }
  }
}

export function safely (instruction) {
  return saga => function* innerSaga (...args) {
    try {
      let result = yield instruction(saga, ...args)
      return result;
    }
  }
}


const example = compose(
  withSafey(),
  withRetry(2),
  withExceptionInterceptor(e => console.log('got an error', e))
)(function* () {

})
