let currentObserver = null;
export const observe = (func) => {
  currentObserver = func;
  func();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let val = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return val;
      },

      set(value) {
        val = value;
        observers.forEach((func) => func());
      },
    });
  });

  return obj;
};
