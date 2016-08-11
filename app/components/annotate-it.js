import Ember from 'ember';

export default Ember.Component.extend({

    // Annotateit.org:
    // key='0039651c612b4cc697c00b129583481e'
    // secret='5bcfb681-87a9-48bf-ae78-006b4a044b21'

    didInsertElement: function() {
        var topic_id = this.topic.id,
            sel_topic = '#topic-' + topic_id,
            sel_wrapper = sel_topic + ' .annotator-wrapper',
            cached_ann = [];

        // Register an ajax complete handler.
        $(document).ajaxComplete(function(event, jqXHR, ajaxOptions) {
            if (ajaxOptions.type === 'POST' && /\/annotations$/.test(ajaxOptions.url)) {
                var annotation = JSON.parse(jqXHR.responseText);
                //console.log("ajaxComplete() " + JSON.stringify(annotation) + " " + ajaxOptions.type + " " + " " + ajaxOptions.url);
                cached_ann.push(annotation);
                // All highlighted annotations should be enclosed within spans like this:
                //     <span class="annotator-hl" data-annotation-id="25" id="annotation_25" name="annotation_25">...</span>
                // However, the highlighted annotation just created only looks like this
                //     <span class="annotator-hl">...</span>
                // So we need to add attributes: data-annotation-id, id, and name
                var wrapper = $(sel_wrapper);
                if (wrapper.length === 0) {
                    console.error("ajaxComplete() => cannot find wrapper $(" + sel_wrapper + ")!");
                    return;
                }
                var annotations = wrapper.find($('.annotator-hl'));
                if (annotations.length === 0) {
                    console.error("ajaxComplete() => cannot any annotations!");
                    return;
                }
                annotations.each(function(index, a){
                    if (!$(a).attr('id')) {
                        var attr = 'annotation_' + annotation.id;
                        ['id', 'name', 'data-annotation-id'].forEach(function(name){
                            $(a).attr(name, attr);
                        });
                        return false;
                    }
                });
                display_annotations();
            }
        });

        var display_annotations = function() {
            var top = $('#topic-' + topic_id + '-annotations');
            var list = [];
            cached_ann.forEach(function(a, index){
                var id = a.id;
                if (!id) {
                    console.error("cached_ann[" + index + "].id is undefined!");
                    return;
                }
                var sel = '#annotation_' + id,
                    e = $(sel);
                if (!e) {
                    console.error("Could not find $(" + sel + ")");
                    return;
                }
                var p = e.position();
                if (!p) {
                    console.error("Could not find $(" + sel + ").position()");
                    return;
                }
                var found = false;
                // Check if position top already taken
                list.forEach(function(l){
                    if (l.position.top === p.top) {
                        l.count++;
                        // Only display the first (oldest) annotation
                        if (a.created < l.annotation.created) {
                            l.position = p;
                            l.annotation = a;
                        }
                        found = true;
                        return false;
                    }
                });
                if (!found) {
                    // First time so add to list
                    list.push({
                        count: 1,
                        position: p,
                        annotation: a
                    });
                }
            });

            top.hide();
            top.empty();
            var cnt = 0;
            var len = list.length;
            list.forEach(function(l){
                var quote = l.annotation.quote;
                quote = quote.substr(0,9)+(quote.length>10?'&hellip;':'');
                top.append(
                    '<div id="annotation-' + l.annotation.id + '" style="position:absolute">' +
                        '<span class="label label-default annotation-count">' + l.count + '</span> ' +
                        '<span class="label label-info annotation-comments">' + l.annotation.comments.length + '</span> ' +
                        '<span class="label label-success annotation-likes">' + l.annotation.likes + '</span> ' +
                        '<span class="label label-danger annotation-flags">' + l.annotation.flags + '</span> ' +
                        '<span class="annotation-user-name">' + l.annotation.user.name + '</span> | ' +
                        '<span class="annotation-quote">' + quote + '</span> | ' +
                        '<span class="annotation-created">' + moment(l.annotation.created).fromNow() + '</span> ' +
                    '</div>'
                );
                $('#annotation-' + l.annotation.id).animate({top: (140 + l.position.top) + 'px'}, 0, function() {
                    if (++cnt === len) {
                        top.show();
                    }
                });
            });
        };

        var annotator = Ember.$(sel_topic).annotator({
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
          showViewPermissionsCheckbox: true,
          showEditPermissionsCheckbox: true,
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
                    cached_ann = annotations;
                    display_annotations();
                },
                addAnnotation: function(/*annotation*/) {
                    //console.log('annotationsService.addAnnotation() annotation=', annotation);
                    // This doesn't work because the annotator plug hasn't updated the id. In
                    // order to fix this I hook into $.ajaxComplete(), see above.
                    // cached_ann.push(annotation);
                    // display_annotations();
                },
                updateAnnotation: function(annotation) {
                    //console.log('annotationsService.updateAnnotation() annotation=', annotation);
                    cached_ann.forEach(function(a, i){
                        if (a.id === annotation.id) {
                            cached_ann[i] = annotation;
                            return false;
                        }
                    });
                    display_annotations();
                },
                deleteAnnotation: function(annotation) {
                    //console.log('annotationsService.deleteAnnotation() annotation=', annotation);
                    var list = [];
                    cached_ann.forEach(function(a){
                        if (a.id !== annotation.id) {
                            list.push(a);
                        }
                    });
                    cached_ann = list;
                    display_annotations();
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
