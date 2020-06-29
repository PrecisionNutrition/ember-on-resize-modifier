import { later } from '@ember/runloop';

export function delay(ms = 50) {
  return new Promise(resolve => {
    later(resolve, ms);
  });
}

export function setStyle(el, key, value) {
  el.style[key] = value;
  return delay(50);
}

export function setSize(el, { width, height }) {
  if (width !== undefined) {
    el.style.width = `${width}px`;
  }

  if (height !== undefined) {
    el.style.height = `${height}px`;
  }

  return delay(50);
}
