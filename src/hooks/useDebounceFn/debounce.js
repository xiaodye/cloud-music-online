function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    let res;

    timer = setTimeout(() => {
      res = fn.apply(this, args);
      timer = null;
    }, delay);

    return res;
  };
}

export default debounce;
