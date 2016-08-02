import { Factory } from 'ember-cli-mirage';


var topics = [
    {
        title: "Omnis Modi Qui Rerum Veniam Ipsam Consequatur",
        author: "Estella Turcotte",
        text: "Dolore nisi rerum sequi numquam consequatur. Incidunt neque id sunt ullam voluptates consequatur et. Occaecati accusantium at aut cupiditate. Quia nam est sit eum recusandae ab repudiandae adipisci. Voluptatem non voluptate dicta qui aut molestias facilis dolorem ipsam."
    },
    {
        title: "Architecto Voluptates Modi",
        author: "Akeem D'Amore",
        text: "Excepturi consequatur molestias facilis reprehenderit rerum eligendi minima. Architecto inventore quis est et inventore. Enim officia beatae aut."
    },
    {
        title: "Rem Est Odit",
        author: "Liam Schulist",
        text: "Magnam ullam mollitia amet molestiae ut cum. Sit est impedit aut. Doloremque ratione cupiditate consequuntur. Iste itaque ipsam iusto hic animi. Dicta aut natus ex qui id natus porro esse. Quia aut accusamus autem non quia."
    },
    {
        title: "A Pariatur Consequatur Praesentium Exercitationem Minima Eos Inventore",
        author: "Maggie Bode",
        text: "Ducimus praesentium reiciendis odit atque fugit voluptatum sed libero saepe. Incidunt aut et iure suscipit fugiat inventore animi fugiat. Dolorem amet sunt praesentium et enim asperiores esse. Fugit est omnis minus voluptatem consequatur sit ut. Doloremque recusandae vitae laborum. Aliquid expedita qui sed qui."
    },
    {
        title: "Earum Consequuntur Illo Cupiditate",
        author: "Marcel Watsica",
        text: "Modi nulla ut aut. Qui id sit eos perferendis amet. Voluptates pariatur dolores accusantium. Saepe quia animi aut. Aperiam illo qui quis nulla. Sint voluptas exercitationem aliquid."
    }
];

export default Factory.extend({
    title(i) {
        return topics[i].title;
    },
    author(i) {
        return topics[i].author;
    },
    text(i) {
        return topics[i].text;
    }
});
