import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class OnResizeModifier extends Modifier {
  @service resizeObserver;

  get callback() {
    return this.args.positional[0];
  }

  didReceiveArguments() {
    assert(
      `on-resize-modifier: callback must be a function, but was ${this.callback}`,
      typeof this.callback === 'function'
    );
  }

  didInstall() {
    this.resizeObserver.observe(this.element, this.handleResize);
  }

  willRemove() {
    this.resizeObserver.unobserve(this.element, this.handleResize);
  }

  @action
  handleResize(...args) {
    this.callback(...args);
  }
}
