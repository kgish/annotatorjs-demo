import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    title() {
        return faker.lorem.words(Math.floor(Math.random() * 6) + 3);
    },
    author() {
        return faker.name.firstName() + ' ' + faker.name.lastName();
    },
    text() {
        return faker.lorem.paragraph();
    }
});
