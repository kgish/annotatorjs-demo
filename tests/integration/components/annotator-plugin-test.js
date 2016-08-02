import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('annotator-plugin', 'Integration | Component | annotator plugin', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{annotator-plugin}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#annotator-plugin}}
      template block text
    {{/annotator-plugin}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
