# {{on-resize}} modifier

<p>
  <a href="https://github.com/PrecisionNutrition/ember-on-resize-modifier/actions?query=workflow%3ACI" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/PrecisionNutrition/ember-on-resize-modifier/workflows/CI/badge.svg" alt="CI status">
  </a>

  <a href="https://www.npmjs.com/package/ember-on-resize-modifier" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/npm/v/ember-on-resize-modifier?color=informational" alt="NPM version" />
  </a>
</p>

`{{on-resize}}` modifier allows to use [`ResizeObserver`][resize-observer] to respond to an element's size changes. It relies on a single [`ResizeObserver`][resize-observer] instance to achieve **better performance** (using multiple instances can result in a [noticeable performance penalty][performance-penalty]).

It has good test coverage and is ready for production👍

## Installation

```
ember install ember-on-resize-modifier
```

If you need a [ResizeObserver polyfill][resize-observer-polyfill] ([caniuse.com][caniuse]):

```
ember install ember-resize-observer-polyfill
```

## Usage

`<div {{on-resize callback}} />`

The `callback` will be called:

- when the element is inserted to the DOM
- whenever the size of the element changes
- when `element.style.display` gets set to `none` (then all `contentRect` props will be `0`)

The `callback` will be always called with the only argument wich is [`ResizeObserverEntry`][resize-observer-entry] object.

**Example**

```hbs
<div {{on-resize this.handleResize}}>
  Resize me
</div>
```

```js
@action
handleResize({ contentRect: { width, height } }) {
  target.classList.toggle('large', width > 1200);
  target.classList.toggle('portrait', height > width);
}
```

## Related addons

- [ember-resize-observer-component][resize-observer-component]
- [ember-resize-observer-service][resize-observer-service]
- [ember-resize-observer-polyfill][resize-observer-polyfill]

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above
- [Modern browsers][caniuse] (for IE 11 install [polyfill][resize-observer-polyfill])

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[resize-observer]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[resize-observer-entry]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
[performance-penalty]: https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ
[caniuse]: https://caniuse.com/#feat=resizeobserver
[resize-observer-component]: https://github.com/PrecisionNutrition/ember-resize-observer-component
[resize-observer-service]: https://github.com/PrecisionNutrition/ember-resize-observer-service
[resize-observer-polyfill]: https://github.com/PrecisionNutrition/ember-resize-observer-polyfill
