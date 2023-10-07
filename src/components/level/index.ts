import { Markup, TypeMarkup } from '../blockFourth/markup';
import { ElementsPizza, TypeElementsPizza } from '../blockFirst';
import { Constructor } from '../other/constructor';

export class Level extends Constructor {
    markup: TypeMarkup;

    elementsPizza: TypeElementsPizza;

    constructor(numberLevel: number) {
        super(numberLevel);
        this.markup = new Markup(this.numberLevel);
        this.elementsPizza = new ElementsPizza(this.numberLevel);
    }

    add() {
        this.markup.addMarkup();
        this.elementsPizza.addBlockFirst();
    }
}

export type TypeLevel = InstanceType<typeof Level>;
