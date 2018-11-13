/* eslint-disable no-console */

/**
 * Gets a random color by seed.
 *
 * @param {Number} seed - The seed on which the color should be based.
 *
 * @returns {String}
 */
function getRandomColor(seed) {
  return Math.floor(Math.abs(Math.sin(seed) * 16777215) % 16777215).toString(16);
}

const exclude = ['VueJsModal', 'transition', 'portalTarget'];

export default {
  created() {
    const name = this && this.$options && this.$options.name;

    if (exclude.includes(name)) {
      return;
    }

    const pattern = /(\$|_).*/;
    const background = getRandomColor((name || '1').length);
    const properties = Object.keys(this || {})
      .concat(Object.keys(this._computedWatchers || {}))
      .concat(Object.keys(this.$props || {}))
      .filter(key => !pattern.test(key) && typeof (this || {})[key] !== 'function');

    if (properties.length) {
      properties.forEach((property) => {
        this.$root.$watch(
          () => this[property],
          (newValue, oldValue) => {
            console.groupCollapsed(
              `%c <${name}> `,
              `color: #fff; background: #${background};`,
              `'${property}' changed`
            );
            console.log('element', this.$el);
            console.log('old', oldValue);
            console.log('new', newValue);
            console.groupEnd();
          }
        );
      });
    }
  },
  updated() {
    const name = this && this.$options && this.$options.name;

    if (exclude.includes(name)) {
      return;
    }

    const background = getRandomColor(((this && this.$options && this.$options.name) || '1').length);

    console.log(
      `%c <${name}> %c updated `,
      `color: #fff; background: #${background};`,
      'color: #fff; background: #000;',
      this.$el
    );
  }
};
