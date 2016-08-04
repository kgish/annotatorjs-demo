export default function() {

    this.passthrough('http://localhost:3000/**');
    this.passthrough('http://annotateit.org/**');

    this.get('/topics', (schema/*, request*/) => {
        return schema.topics.all();
    });

    this.get('/topics/:id', ({ topics }, request) => {
        return topics.find(request.params.id);
    });
}
