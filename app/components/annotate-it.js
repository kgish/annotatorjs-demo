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
                topic_id: topic_id
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
                    //console.log('annotationsService.setAnnotations() annotations=', annotations);
                    var top = $('#topic-' + topic_id + '-annotations');
                    annotations.forEach(function(annotation){
                        top.append(
                            '<div id="annotation-' + annotation.id + '">' +
                                '<span class="label label-default">' + annotation.comments.length + '</span> ' +
                                '<span class="label label-success">' + annotation.likes + '</span> ' +
                                '<span class="label label-danger">' + annotation.flags + '</span> ' +
                                '<span class="annotation-user-name">' + annotation.user.name + '</span> | ' +
                                '<span class="annotation-created">' + moment(annotation.created).fromNow() + '</span> ' +
                           '</div>'
                       );
                    });
                },
                addAnnotation: function(annotation) {
                    //console.log('annotationsService.addAnnotation() annotation=', annotation);
                    var top = $('#topic-' + topic_id + '-annotations');
                    top.append(
                        '<div id="annotation-' + annotation.id + '">' +
                        '<span class="label label-default">' + 0 + '</span> ' +
                        '<span class="label label-success">' + 0 + '</span> ' +
                        '<span class="label label-danger">' + 0 + '</span> ' +
                        '<span class="annotation-user-name">' + annotation.user.name + '</span> | ' +
                        '<span class="annotation-created">' + moment(annotation.created).fromNow() + '</span> ' +
                        '</div>'
                    );
                },
                updateAnnotation: function(annotation) {
                    console.log('annotationsService.updateAnnotation() annotation=', annotation);
                },
                deleteAnnotation: function(annotation) {
                    //console.log('annotationsService.deleteAnnotation() annotation=', annotation);
                    var top = $('#topic-' + topic_id + '-annotations');
                    var annotation_div = top.find('#annotation-' + annotation.id);
                    if (annotation_div.length) { annotation_div.remove(); }
                },
                broadcastSet: function() {
                    //console.log('annotationsService.broadcastSet()');
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
