import Ember from 'ember';

export default Ember.Controller.extend({
    paragraphs: Ember.computed('model', function() {
        var model = this.get('model'),
            text = model.get('text'),
            paragraphs = [];
        text.forEach(function(p){
            paragraphs.push(p);
        });
        return paragraphs;
    })
});
