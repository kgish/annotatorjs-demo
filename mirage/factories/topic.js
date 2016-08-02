import { Factory } from 'ember-cli-mirage';

var topics = [
    {
        title: "Omnis Modi Qui Rerum Veniam Ipsam Consequatur",
        author: "Estella Turcotte",
        text: [
            "Dolore nisi rerum sequi numquam consequatur. Incidunt neque id sunt ullam voluptates consequatur et. Occaecati accusantium at aut cupiditate. Quia nam est sit eum recusandae ab repudiandae adipisci. Voluptatem non voluptate dicta qui aut molestias facilis dolorem ipsam.",
            "An tempor oportere ius. Mea denique epicurei appareat et, copiosae laboramus at duo. Ex accusamus forensibus vim. Pri quis consul iisque te, maluisset vulputate rationibus an eum. At vim eros pericula, at fugit indoctum duo.",
            "Malis debet vix cu, at argumentum efficiendi sed, no quo aliquam persequeris. Te per assum delectus tincidunt, eu vel eloquentiam consectetuer, omnes mucius bonorum has cu. In labore iisque oblique est, sale moderatius ea mei. Dicant interesset persequeris eam ad, vide solum dissentias nec ad.",
            "Dicam propriae placerat et usu, ut platonem euripidis vim. Dico referrentur per id, ne vis idque ponderum senserit, ei cum altera fastidii interpretaris. At veritus denique accumsan pri. Vix etiam choro indoctum at."
        ]
    },
    {
        title: "Architecto Voluptates Modi",
        author: "Akeem D'Amore",
        text: [
            "Excepturi consequatur molestias facilis reprehenderit rerum eligendi minima. Architecto inventore quis est et inventore. Enim officia beatae aut.",
            "Probo definitionem cu duo, quod persius eleifend no vel. Pri euripidis dissentias vituperatoribus ei, eam diam ornatus vivendum no, no mei quem molestie ocurreret. Mea at putant suavitate. Iusto viderer expetenda eos cu, id cum movet tibique. Nam saepe postea phaedrum cu, eum ne iuvaret nominavi contentiones.",
            "Est ei persius vituperata, ex vix quando populo mnesarchum, recusabo conceptam qui in. Verear mediocritatem te pro, possit sapientem temporibus ea nam. Ius ex debet eirmod convenire, sit esse duis minim id, an idque ponderum deserunt eos. Et mea posse tritani fabulas, vero oratio dolorum his in, eirmod suscipit concludaturque pro ea. Pri simul facete facilisis et, cum in nusquam tacimates. Mea eu consul accumsan, usu solet impetus concludaturque an, sit at timeam delicata.",
            "Mea no sonet ignota. At pri ignota feugait, nostrud lucilius recusabo cu pro. Etiam vulputate id eum, tation molestie vim ei, ei sea purto quando deleniti. Cu solum vituperata sea."
        ]
    },
    {
        title: "Rem Est Odit",
        author: "Liam Schulist",
        text: [
            "Magnam ullam mollitia amet molestiae ut cum. Sit est impedit aut. Doloremque ratione cupiditate consequuntur. Iste itaque ipsam iusto hic animi. Dicta aut natus ex qui id natus porro esse. Quia aut accusamus autem non quia.",
            "Mei mucius delectus ad, movet vituperata honestatis eum te, ad nam viris blandit. Per ornatus sensibus efficiantur ea. Audire cotidieque est ne, usu tale quodsi vidisse ea. Vix eu dolorum adversarium.",
            "Ex nibh ubique qui, id vim virtute ceteros perpetua, debet deleniti constituam nec cu. Vel in voluptua praesent, partem omnesque facilisi at pri. Zril affert quodsi ei sit, cum ei debet cetero, cum ne elit suscipit. Utamur sententiae deterruisset mel ex. Nec ne eripuit intellegat, ea congue labore vituperatoribus quo. Tation democritum theophrastus duo an, ex eum nisl congue.",
        ]
    },
    {
        title: "A Pariatur Consequatur Praesentium Exercitationem Minima Eos Inventore",
        author: "Maggie Bode",
        text: [
            "Ducimus praesentium reiciendis odit atque fugit voluptatum sed libero saepe. Incidunt aut et iure suscipit fugiat inventore animi fugiat. Dolorem amet sunt praesentium et enim asperiores esse. Fugit est omnis minus voluptatem consequatur sit ut. Doloremque recusandae vitae laborum. Aliquid expedita qui sed qui.",
            "Noluisse officiis consequuntur mei ea, sea id placerat nominati. Ferri novum vis et, deleniti scriptorem et nam. Vel nibh utamur deseruisse ea. Dolor voluptua ius in, has te dicant lucilius maluisset, no ubique possim dolorem vix.",
            "Ut vel errem utamur luptatum. No numquam fabellas pri, mel in commune omittantur repudiandae. Eum at nonumes scaevola appetere, solet ridens at sed. Usu et quodsi voluptatibus, novum appetere persecuti ad per. Congue veritus molestiae ne vim. Duo ad doctus fabellas.",
            "Equidem accumsan ius eu. Mutat commune perpetua ne vel. Pro et nulla laudem argumentum. At esse quaeque pro, et velit novum sit."
        ]
    },
    {
        title: "Earum Consequuntur Illo Cupiditate",
        author: "Marcel Watsica",
        text: [
            "Modi nulla ut aut. Qui id sit eos perferendis amet. Voluptates pariatur dolores accusantium. Saepe quia animi aut. Aperiam illo qui quis nulla. Sint voluptas exercitationem aliquid.",
            "Nibh dicant constituam nam eu, vim ex soluta commune incorrupte. Vis ad modo zril alterum, inermis deleniti moderatius in vis, eu vide vocent eam. Sed alienum fierent democritum ne. Iudico putant phaedrum ne vel, sumo inimicus ex sit, his ad autem porro malis. Ea lorem assueverit cum, ei sed detracto dissentiunt, quo ex assum regione intellegat.",
            "Dico tollit iudicabit nam ea, sed ad saepe copiosae, diam apeirian disputationi te eam. Duo illud luptatum gubergren id. Vis equidem scaevola recteque in, cum eruditi deleniti perpetua ad. At duo sale magna ubique, dicta elaboraret vix ut. No consulatu evertitur similique vix."
        ]
    }
];

export default Factory.extend({
    title(i)  { return topics[i].title;  },
    author(i) { return topics[i].author; },
    text(i)   { return topics[i].text;   }
});
