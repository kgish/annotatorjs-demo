import Ember from 'ember';

export default Ember.Component.extend({

    // Annotateit.org:
    // key='0039651c612b4cc697c00b129583481e'
    // secret='5bcfb681-87a9-48bf-ae78-006b4a044b21'

    didInsertElement: function() {
        var topic_id = this.topic.id,
            sel = '#topic-'+topic_id;
        Ember.$(sel).annotator().annotator('addPlugin',
            'Store', {
                // prefix: 'http://annotateit.org/api',
                prefix: 'http://localhost:3000',
                urls: {
                    // These are the default URLs.
                    create:  '/annotations',
                    update:  '/annotations/:id',
                    destroy: '/annotations/:id',
                    search:  '/annotations/search'
                },
                annotationData : {
                    topic_id: topic_id
                },
                loadFromScratch: {
                    topic_id: topic_id
                }
            }
        );
    }
});
