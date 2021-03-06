/*global Annotator*/
/*global diff_match_patch*/
/*jslint newcap: true*/
Annotator.Plugin.Discourse = function (element, options) {
  Annotator.Plugin.apply(this, arguments);
};

$.extend(Annotator.Plugin.Discourse.prototype, new Annotator.Plugin(), {
  events: {},
  options: {},
  pluginInit: function () {
    var annotationService = this.options.annotationService;

    /**
     *  Subscribe to Store's `annotationsLoaded` event
     *    Stores all annotation objects provided by Store in the window
     *    Adds all annotations to the sidebar
     **/
    this.annotator.subscribe('annotationsLoaded', function (annotations) {
      annotations.forEach(function (annotation) {
        annotation.highlights.forEach(function (highlight) {
          $(highlight).attr('id', 'annotation_' + annotation.id);
          $(highlight).attr('name', 'annotation_' + annotation.id);
          annotation.link = 'annotation_' + annotation.id;
        });
      });

      //Set the annotations in the annotationService
      annotationService.setAnnotations(annotations);
      annotationService.broadcastSet();
    });

    /**
     *  Subscribe to Annotator's `annotationCreated` event
     *    Adds new annotation to the sidebar
     */
    this.annotator.subscribe('annotationCreated', function (annotation) {
      annotationService.addAnnotation(annotation);
    });
    this.annotator.subscribe('annotationUpdated', function (annotation) {
      annotationService.updateAnnotation(annotation);
    });
    this.annotator.subscribe('annotationDeleted', function (annotation) {
      annotationService.deleteAnnotation(annotation);
    });

    this.annotator.subscribe('commentCreated', function (comment) {
      comment = $('<div class="existing-comment"><blockquote>' + comment.text + '<div class="comment-author">' + comment.user.name + '</div></blockquote></div>');
      var currentComments = $('#current-comments');
      currentComments.append(comment);
      currentComments.removeClass('hidden');

      var ncomments = currentComments.children().length;
      $('#comments-header').text(ncomments + ' Comment' + (ncomments===1?'':'s'));

      currentComments.collapse(true);
    });

    this.annotator.subscribe('annotationViewerTextField', function (field, annotation) {
      if (!annotation.tags || annotation.tags.length === 0) {
        return;
      }

      annotation.tags.forEach(function (tag) {
        if (tag === 'edit') {
          var jField = $(field);
          var differ = new diff_match_patch();
          var diffs = differ.diff_main(annotation.quote, annotation.text);
          var html = differ.diff_prettyHtml(diffs);
          console.log("Edit tag: quote='" + annotation.quote + "', text='" + annotation.text + "', html='" + html + "'");
          //jField.find('p').html(html);
          jField.html(html);
        }
      });
    });

    //Add Discourse-specific fields to the viewer when Annotator loads it
    this.annotator.viewer.addField({
      load: function (field, annotation) {
        this.addNoteLink(field, annotation);
        this.addNoteActions(field, annotation);
        this.addComments(field, annotation);
      }.bind(this)
    });

    this.annotator.editor.submit = function (e) {
      //Clear previous errors
      this.annotation._error = false;

      var field, _i, _len, _ref;
      Annotator.Util.preventEventDefault(e);

      _ref = this.fields;

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        field.submit(field.element, this.annotation);
      }

      if (this.annotation._error !== true) {
        this.publish('save', [this.annotation]);

        return this.hide();
      }
    };

    this.annotator.editor.addField({
      load: function (field, annotation) {
        this.addEditFields(field, annotation);
      }.bind(this),
      submit: function (field, annotation) {
        //check it is tagged 'edit'
        if (this.hasEditTag(annotation.tags)) {
          //check we have explanatory content
          var explanation = $(field).find('#explanation').val();

          //If no explanatory content, show message and don't submit
          if ('' === explanation.trim()) {
            $('#annotation-error').text("Explanation required for edits.").toggle(true);

            annotation._error = true;
            return false;
          }

          annotation.explanation = explanation;
        }
      },
      hasEditTag: function (tags) {
        var hasEditTag = false;

        if (tags === undefined || tags.length  === 0) {
          return false;
        }

        tags.forEach(function (tag) {
          if (tag === 'edit') {
            hasEditTag = true;
          }
        });

        return hasEditTag;
      }
    });
      // We want document events even on readOnly, which isn't the default
      // behavior.
      if (this.annotator.options.readOnly && !this.annotator.options.discussionClosed) {
          this.annotator._setupDocumentEvents();
      }

      this.onAdderClickOld = this.annotator.onAdderClick;
      this.annotator.onAdderClick = function (event) {
          if (event !== null) {
              event.preventDefault();
          }

          if (!this.options.user) {
              this.showLoginForm(event);
              this.annotator.adder.hide();
              this.annotator.ignoreMouseup = false;
          } else {
              this.onAdderClickOld(event);
          }
    }.bind(this);
  },
  addEditFields: function (field, annotation) {
    var newField = $(field);
    var toAdd = $('<div class="annotator-editor-edit-wrapper"></div>');

    var buttonGroup = $('<div class="btn-group"></div>');

    var explanation = $('<input id="explanation" type="text" name="explanation" placeholder="Why did you make this edit?" style="display:none;" />');
    var annotationError = $('<p id="annotation-error" style="display:none; color:red;"></p>');

    var annotateButton = $('<button type="button" class="btn btn-default active">Annotate</button>').click(function () {
      $(this).addClass('active');
      $(this).siblings().each(function (/*sibling*/) {
        $(this).removeClass('active');
      });
      var af0 = $('#annotator-field-0'),
          af1 = $('#annotator-field-1'),
          expl = $('#explanation');
      af0.val('');
      af1.val('');
      expl.toggle(false);
      expl.prop('required', false);
      $('#annotator-error').text('').toggle(false);
      af0.focus();
    });

    var editButton = $('<button type="button" class="btn btn-default">Edit</button>').click(function () {
      $(this).addClass('active');
      $(this).siblings().each(function (sibling) {
        $(this).removeClass('active');
      });
      var af0 = $('#annotator-field-0'),
          af1 = $('#annotator-field-1'),
          expl = $('#explanation');
      af0.val(annotation.quote);
      af1.val('edit ');
      expl.toggle(true);
      expl.prop('required', true);
      af0.focus();
    });

    buttonGroup.append(annotateButton, editButton);
    toAdd.append(buttonGroup);
    toAdd.append(explanation);
    toAdd.append(annotationError);
    newField.html(toAdd);
  },
  addComments: function (field, annotation) {
    var user = this.options.user;

    var ncomments = annotation.comments ? annotation.comments.length : 0;

    //Add comment wrapper and collapse the comment thread
    var commentsHeader = $('<div id="comments-header" class="comment-toggle" data-toggle-"collapse" data-target="#current-comments">' + ncomments + ' Comment' + (ncomments===1?'':'s') + '<span id="comment-caret" class="caret caret-right"></span></button>').click(function () {
      $('#current-comments').collapse('toggle');
      $('#comment-caret').toggleClass('caret-right');
    });

    //If there are no comments, hide the comment wrapper
    if ($(annotation.comments).length === 0) {
      commentsHeader.addClass('hidden');
    }

    //Add all current comments to the annotation viewer
    var currentComments = $('<div id="current-comments" class="current-comments collapse"></div>');

    /*jslint unparam: true*/
    $.each(annotation.comments, function (index, comment) {
      comment = $('<div class="existing-comment"><blockquote>' + comment.text.replace(/\n/g, "<br/>") + '<div class="comment-author">' + comment.user.name + '</div></blockquote></div>');
      currentComments.append(comment);
    });
    /*jslint unparam: false*/

    //Collapse the comment thread on load
    currentComments.ready(function () {
      $('#existing-comments').collapse({
        toggle: false
      });
    });

    //If the user is logged in, allow them to comment
    if (user && user.id !== undefined) {
      var annotationComments = $('<div class="annotation-comments"></div>');
      // var commentText = $('<input type="text" class="form-control" />');
      var commentText = $('<textarea class="form-control" rows="5"></textarea>');
      var commentSubmit = $('<button class="btn btn-sm btn-primary">Submit</button>');
      commentSubmit.click(function () {
        this.createComment(commentText, annotation);
      }.bind(this));
      annotationComments.append(commentText);

      annotationComments.append(commentSubmit);

      $(field).append(annotationComments);
    }

    $(field).append(commentsHeader, currentComments);
  },
  addNoteActions: function (field, annotation) {
    var user = this.options.user;

    //Add actions ( like / error) to annotation viewer
    var annotationAction = $('<div></div>').addClass('activity-actions');
    var generalAction = $('<span></span>').data('annotation-id', annotation.id);

    var annotationLike = generalAction.clone().addClass('thumbs-up').append('<button class="btn btn-sm btn-success">+</button>&nbsp;<span class="action-count">' + annotation.likes + '</span>');
    var annotationFlag = generalAction.clone().addClass('flag').append('<button class="btn btn-sm btn-danger">-</button>&nbsp;<span class="action-count">' + annotation.flags + '</span>');

    annotationAction.append(
        annotationLike,
        $('<span> &nbsp; </span>'),
        annotationFlag
    );

    //If user is logged in add his current action and enable the action buttons
    if (user !== null) {
      if (annotation.user_action) {
        if (annotation.user_action === 'like') {
            annotationLike.addClass('selected');
        } else if (annotation.user_action === 'flag') {
          annotationFlag.addClass('selected');
        } // else this user doesn't have any actions on this annotation
      }

      var that = this;

      annotationLike.addClass('logged-in').click(function () {
        that.addLike(annotation, this);
      });

      annotationFlag.addClass('logged-in').click(function () {
        that.addFlag(annotation, this);
      });
    }

    $(field).append(annotationAction);
  },
  addNoteLink: function (field, annotation) {

    //Add link to annotation
    var linkPath = this.options.location + '#' + annotation.link;
    var annotationLink = $('<a></a>').attr('href', linkPath).text('Permanent link to this note').addClass('annotation-permalink');
    var noteLink = $('<div class="annotation-link"></div>');

    annotationLink.append(noteLink);
    $(field).append(annotationLink);
  },
  createComment: function (textElement, annotation) {
    var user = this.options.user;
    var prefix = this.options.prefix;
    var text = textElement.val();
    textElement.val('');

    var comment = {
      text: text,
      user: user
    };

    //POST request to add user's comment
    $.post(prefix + '/annotations/' + annotation.id + '/comments', {
      comment: comment
    }, function (data) {
      annotation.comments.push(comment);

      this.annotator.publish('annotationUpdated', data);
      return this.annotator.publish('commentCreated', comment);
    }.bind(this));
  },
  addLike: function (annotation, element) {
    var prefix = this.options.prefix;
    var user = this.options.user;
    var like = { user: user };

    $.post(prefix + '/annotations/' + annotation.id + '/likes', {
        like: like
    }, function (data) {
      element = $(element);
      element.children('.action-count').text(data.likes);
      element.siblings('span').removeClass('selected');

      if (data.action) {
        element.addClass('selected');
      } else {
        element.removeClass('selected');
      }

      element.siblings('.thumbs-up').children('.action-count').text(data.likes);
      element.siblings('.flag').children('.action-count').text(data.flags);

      annotation.likes = data.likes;
      annotation.flags = data.flags;
      annotation.user_action = 'like';

      return this.annotator.publish('annotationUpdated', data);
    }.bind(this));
  },
  addFlag: function (annotation, element) {
    var prefix = this.options.prefix;
    var user = this.options.user;
    var flag = { user: user };

    $.post(prefix + '/annotations/' + annotation.id + '/flags', {
        flag: flag
    }, function (data) {
        element = $(element);
        element.children('.action-count').text(data.flags);
        element.siblings('span').removeClass('selected');

        if (data.action) {
            element.addClass('selected');
        } else {
            element.removeClass('selected');
        }

        element.siblings('.thumbs-up').children('.action-count').text(data.likes);

        annotation.likes = data.likes;
        annotation.flags = data.flags;
        annotation.user_action = 'flag';

        return this.annotator.publish('annotationUpdated', data);
    }.bind(this));
  }
});
