import Ember from 'ember';

export default Ember.Component.extend({

    // Annotateit.org:
    // key='0039651c612b4cc697c00b129583481e'
    // secret='5bcfb681-87a9-48bf-ae78-006b4a044b21'

    didInsertElement: function() {
        var topic_id = this.topic.id,
            sel = '#topic-' + topic_id;

        var annotator = Ember.$(sel).annotator({
            //readOnly: user.id == ''
        });

        annotator.annotator('addPlugin', 'Unsupported');
        annotator.annotator('addPlugin', 'Tags');
        // annotator.annotator('addPlugin', 'Markdown');

        annotator.annotator('addPlugin', 'Store', {
            prefix: 'http://localhost:3000',
            urls: {
                // These are the default URLs.
                create: '/annotations',
                update: '/annotations/:id',
                destroy: '/annotations/:id',
                search: '/annotations/search'
            },
            annotationData: {
                topic_id: topic_id,
                'comments': []
            },
            loadFromScratch: {
                topic_id: topic_id
            }
        });

        annotator.annotator('addPlugin', 'Permissions', {
          user: { id: 11, name: 'kiffin' },
          permissions: {
            'read': [11],
            'update': [11],
            'delete': [11],
            'admin': [11]
          },
          showViewPermissionsCheckbox: false,
          showEditPermissionsCheckbox: false,
          userId: function (user) {
            if (user && user.id) {
              return user.id;
            }

            return user;
          },
          userString: function (user) {
            if (user && user.name) {
              return user.name;
            }

            return user;
          }
        });

        annotator.annotator('addPlugin', 'Discourse', {
            annotationService: {
                setAnnotations: function(annotations) {
                    console.log('annotationsService.setAnnotations() annotations=', annotations);
                },
                broadcastSet: function() {
                    console.log('annotationsService.broadcastSet()');
                },
                addAnnotation: function(annotation) {
                    console.log('annotationsService.addAnnotation() annotation=', annotation);
                }
            },
            discussionClosed: false,
            location: window.location.href,
            user: { id: 11, name: 'kiffin' },
            topic: this.topic,
            prefix: 'http://localhost:3000'
        });
    }
});
