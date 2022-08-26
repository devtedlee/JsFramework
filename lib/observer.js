const debounce = (callback) => {
  let _originCallback = undefined;
  return () => {
    cancelAnimationFrame(_originCallback);
    _originCallback = requestAnimationFrame(callback);
  };
};

let _observer = null;
export const observe = (func) => {
  _observer = debounce(func);
  func();
  _observer = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _origin = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (_observer) observers.add(_observer);
        return _origin;
      },

      set(value) {
        if (_origin === value) return;
        if (JSON.stringify(_origin) === JSON.stringify(value)) return;
        if (preventSameValues(_origin, value)) return;

        _origin = value;
        observers.forEach((func) => func());
      },
    });
  });

  return obj;
};

export const proxyObservable = (obj) => {
  const _observeMap = {};

  return new Proxy(obj, {
    get(target, name) {
      _observeMap[name] = _observeMap[name] || new Set();
      if (_observer) _observeMap[name].add(_observer);
      return target[name];
    },
    set(target, name, value) {
      if (target[name] === value) return;
      if (JSON.stringify(_origin) === JSON.stringify(value)) return;
      if (preventSameValues(_origin, value)) return;

      target[name] = value;
      _observeMap[name].forEach((fn) => fn());
    },
  });
};

function preventSameValues(l, r) {
  if (
    !(l instanceof Set) ||
    !(l instanceof Map) ||
    !(l instanceof WeakSet) ||
    !(l instanceof WeakMap)
  ) {
    return false;
  }

  if (l.size !== r.size) {
    return false;
  }

  if (l instanceof Set || l instanceof WeakSet) {
    const lArr = l.values();
    const rArr = r.values();
    if (JSON.stringify(lArr) === JSON.stringify(rArr)) return true;
  }

  if (l instanceof Map || l instanceof WeakMap) {
    l.forEach((key, val) => {
      const rVal = r.get(key);

      if (rVal !== val || (rVal === undefined && !r.has(key))) return false;
    });
  }

  return true;
}
