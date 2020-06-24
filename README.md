# {{on-resize}} modifier

`{{on-resize}}` modifier allows to use [`ResizeObserver`][resize-observer] to respond to an element's size changes. It relies on a single [`ResizeObserver`][resize-observer] instance to achieve **better performance** (using multiple instances can result in a [noticeable performance penalty](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ)).

It has good test coverage and is ready for production👍

## Installation

```
ember install ember-on-resize-modifier
```

You might also need a [polyfill](https://github.com/PrecisionNutrition/ember-resize-observer-polyfill) for [`ResizeObserver`][resize-observer] ([caniuse.com](https://caniuse.com/#feat=resizeobserver)):

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
handleResize({ target, contentRect }) {
  let { width } = contentRect;

  if (width > 1280) {
    target.classList.add('xl');
  }
}
```

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[resize-observer]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[resize-observer-entry]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
