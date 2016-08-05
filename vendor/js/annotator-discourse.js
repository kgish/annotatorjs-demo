/*global Annotator*/
Annotator.Plugin.Discourse = (function() {

    function Discourse(annotator, options) {
        this.annotator = annotator;
        this.options = options;
        // console.log('Plugin.Discourse()');
    }

    Discourse.prototype.pluginInit = function() {
        // console.log('Plugin.Discourse.pluginInit()');

        // annotationsLoaded(annotations)
        // called when annotations are loaded into the DOM. Provides an array of all annotations.
        this.annotator.subscribe('annotationsLoaded', function (annotations) {
            // console.log('annotationsLoaded', annotations);
        });

        // beforeAnnotationCreated(annotation)
        // called immediately before an annotation is created. If you need to modify the annotation before
        // it is saved to the server by the Store plugin, use this event.
        this.annotator.subscribe('beforeAnnotationCreated', function (annotation) {
            // console.log('beforeAnnotationCreated', annotation);
        });

        // annotationCreated(annotation)
        // called when the annotation is created. Used by the Store plugin to save new annotations.
        this.annotator.subscribe('annotationCreated', function (annotation) {
            // console.log('annotationCreated', annotation);
        });

        // beforeAnnotationUpdated(annotation)
        // as above, but just before an existing annotation is saved.
        this.annotator.subscribe('beforeAnnotationUpdated', function (annotation) {
            // console.log('beforeAnnotationUpdated', annotation);
        });

        // annotationUpdated(annotation)
        // as above, but for an existing annotation which has just been edited.
        this.annotator.subscribe('annotationUpdated', function (annotation) {
            // console.log('annotationUpdated', annotation);
        });

        // annotationDeleted(annotation)
        // called when the user deletes an annotation.
        this.annotator.subscribe('annotationDeleted', function (annotation) {
            // console.log('annotationDeleted', annotation);
        });

        // annotationEditorShown(editor, annotation)
        // called when the annotation editor is presented to the user. Allows a plugin to add extra form
        // fields. See the Tags plugin for an example of its use.
        this.annotator.subscribe('annotationEditorShown', function (editor, annotation) {
            // console.log('annotationEditorShown', editor, annotation);
        });

        // annotationEditorHidden(editor)
        // called when the annotation editor is hidden, both when submitted and when editing is cancelled.
        this.annotator.subscribe('annotationEditorHidden', function (editor) {
            // console.log('annotationEditorHidden', editor);
        });

        // annotationEditorSubmit(editor, annotation)
        // called when the annotation editor is submitted.
        this.annotator.subscribe('annotationEditorSubmit', function (editor, annotation) {
            // console.log('annotationEditorSubmit', editor, annotation);
        });

        // annotationViewerShown(viewer, annotations)
        // called when the annotation viewer is displayed provides the annotations being displayed
        this.annotator.subscribe('annotationViewerShown', function (viewer, annotations) {
            // console.log('annotationViewerShown', viewer, annotations);
        });

        // annotationViewerTextField(field, annotation)
        // called when the text field displaying the annotation in the viewer is created
        this.annotator.subscribe('annotationViewerTextField', function (field, annotation) {
            // console.log('annotationViewerTextField', field, annotation);
        });
    };

    return Discourse;
})();
