export default function() {

    this.namespace = 'api/v1';

    this.get('/topics', (schema/*, request*/) => {
        return schema.topics.all();
    });

    this.get('/topics/:id', ({ topics }, request) => {
        return topics.find(request.params.id);
    });
}
