import sinon from 'sinon';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';

function timeout(ms = 50) {
  return new Promise(resolve => {
    later(resolve, ms);
  });
}

module('Integration | Modifier | on-resize', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    this.onResize = sinon.spy().named('onResize');

    await render(hbs`
      <div
        style="width: 100px; height: 100px;"
        data-test
        {{on-resize this.onResize}}
      >
        Resize me
      </div>
    `);

    const element = find('[data-test]');
    await timeout();

    assert
      .spy(this.onResize)
      .calledOnce('called onResize on insert')
      .calledWithExactly([sinon.match.instanceOf(ResizeObserverEntry)])
      .calledWithExactly([sinon.match({ target: element })])
      .calledWithExactly([sinon.match({ contentRect: sinon.match({ height: 100, width: 100 }) })]);

    this.onResize.resetHistory();
    element.style.width = '50px';
    await timeout();

    assert
      .spy(this.onResize)
      .calledOnce('called onResize on width change')
      .calledWithExactly([sinon.match({ target: element })])
      .calledWithExactly([sinon.match({ contentRect: sinon.match({ height: 100, width: 50 }) })]);

    this.onResize.resetHistory();
    element.style.height = '50px';
    await timeout();

    assert
      .spy(this.onResize)
      .calledOnce('called onResize on height change')
      .calledWithExactly([sinon.match({ target: element })])
      .calledWithExactly([sinon.match({ contentRect: sinon.match({ height: 50, width: 50 }) })]);

    this.onResize.resetHistory();
    element.style.width = '50px';
    await timeout();

    assert.spy(this.onResize).notCalled('did not call onResize when size is not changed');
  });

  test('setting element `display` to `none`', async function (assert) {
    this.onResize = sinon.spy().named('onResize');

    await render(hbs`
      <div
        style="width: 100px"
        data-test
        {{on-resize this.onResize}}
      >
        Resize me
      </div>
    `);

    const element = find('[data-test]');
    await timeout();

    assert.spy(this.onResize).called();

    this.onResize.resetHistory();
    element.style.display = 'none';

    await timeout();

    assert
      .spy(this.onResize)
      .calledOnce()
      .calledWithExactly([sinon.match({ target: element })])
      .calledWithExactly([sinon.match({ contentRect: sinon.match({ height: 0, width: 0 }) })]);
  });

  test('using multiple modifiers for the same element', async function (assert) {
    const callback1 = sinon.spy().named('callback1');
    const callback2 = sinon.spy().named('callback2');
    const callback3 = sinon.spy().named('callback3');

    this.onResize1 = callback1;
    this.onResize2 = callback2;

    await render(hbs`
      <div
        style="width: 100px;"
        data-test
        {{on-resize this.onResize1}}
        {{on-resize this.onResize2}}
      >
        Resize me
      </div>
    `);

    const element = find('[data-test]');
    await timeout();

    assert.spy(callback1).calledOnce();
    assert.spy(callback2).calledOnce();

    callback1.resetHistory();
    callback2.resetHistory();
    element.style.width = '50px';
    await timeout();

    assert.spy(callback1).calledOnce();
    assert.spy(callback2).calledOnce();

    this.set('onResize1', callback3);
    callback1.resetHistory();
    callback2.resetHistory();
    element.style.width = '20px';
    await timeout();

    assert.spy(callback1).notCalled();
    assert.spy(callback2).calledOnce();
    assert.spy(callback3).calledOnce();
  });

  test('changing the callback', async function (assert) {
    const callback1 = sinon.spy().named('callback1');
    const callback2 = sinon.spy().named('callback2');

    this.onResize = callback1;

    await render(hbs`
      <div
        style="width: 100px;"
        data-test
        {{on-resize this.onResize}}
      >
        Resize me
      </div>
    `);

    const element = find('[data-test]');
    await timeout();

    assert.spy(callback1).calledOnce();
    assert.spy(callback2).notCalled();

    callback1.resetHistory();
    this.set('onResize', callback2);
    await timeout();

    assert.spy(callback1).notCalled();
    assert.spy(callback2).notCalled();

    element.style.width = '50px';
    await timeout();

    assert.spy(callback1).notCalled();
    assert.spy(callback2).calledOnce();
  });

  module('handling errors', function (hooks) {
    hooks.afterEach(function () {
      resetOnerror();
    });

    test('throws if a callback is not a function', async function (assert) {
      assert.expect(1);

      setupOnerror(error => {
        assert.equal(
          error.message,
          'Assertion Failed: on-resize-modifier: callback must be a function, but was [object Object]'
        );
      });

      this.callback = {};

      await render(hbs`
        <div data-test {{on-resize this.callback}}>
          Resize me
        </div>
      `);
    });

    test('throws if a callback is not provided', async function (assert) {
      assert.expect(1);

      setupOnerror(error => {
        assert.equal(
          error.message,
          'Assertion Failed: on-resize-modifier: callback must be a function, but was undefined'
        );
      });

      await render(hbs`
        <div data-test {{on-resize}}>
          Resize me
        </div>
      `);
    });
  });
});
