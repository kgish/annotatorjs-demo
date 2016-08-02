import Ember from 'ember';

export default Ember.Component.extend({
  topicId: function() {
    console.log('id='+this.topic.id);
    return this.topic.id;
  }.on('init'),

  didInsertElement: function() {
    Ember.$('#topic').annotator().annotator('addPlugin',
      'Store', {
        prefix: 'http://localhost:3000/api/v1',
        urls: {
            // These are the default URLs.
            create:  '/annotations',
            update:  '/annotations/:id',
            destroy: '/annotations/:id',
            // search:  '/search'
            search:  '/annotations/search'
        },
        annotationData : {
          topic_id: this.get('topicId')
        },
        loadFromScratch: {
          topic_id: this.get('topicId')
        }
     });
  }
});
