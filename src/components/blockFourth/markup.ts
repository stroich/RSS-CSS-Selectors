import './markup.css';
import { levelsSettings } from '../other/levelsSettings';
import { Constructor } from '../other/constructor';

export class Markup extends Constructor {
    addMarkup() {
        const arrMarkup = levelsSettings[this.numberLevel].markup;
        const elMarkupPizza = document.createElement('div');
        elMarkupPizza.classList.add('elMarkup-pizza');
        elMarkupPizza.setAttribute('data-testid', 'main-markup');
        elMarkupPizza.append(`< pizza >`);
        arrMarkup.forEach((el) => {
            const elMarkup = document.createElement('div');
            elMarkup.innerHTML = el;
            elMarkup.classList.add('elMarkup');
            elMarkup.setAttribute('aria-label', 'markup-element');
            elMarkupPizza.append(elMarkup);
        });
        elMarkupPizza.append(`</ pizza >`);
        elMarkupPizza.addEventListener('mouseover', (event) => {
            this.hoverMarkup(event);
            this.selectPizzaItem(event);
            this.getHtmlCode(event, this.getNumber);
        });
        elMarkupPizza.addEventListener('mouseout', (event) => {
            this.hoverMarkup(event);
            this.selectPizzaItem(event);
            const htmlCodeElPizza = document.querySelector('.htmlCode');
            htmlCodeElPizza?.remove();
        });
        const wrapperMarkup = <HTMLElement>document.querySelector('.markup');
        wrapperMarkup.innerHTML = '';
        wrapperMarkup.append(elMarkupPizza);
    }

    getNumber(event: Event) {
        const eventTarget = <HTMLElement>event.target;
        const parent = <HTMLElement>eventTarget.parentElement;
        const arrElMarkup = [...parent.children];
        let indexEl = 0;
        arrElMarkup.forEach((el, ind: number) => {
            if (el === eventTarget) indexEl = ind;
        });
        return indexEl;
    }

    hoverMarkup(event: Event) {
        const eventTarget = <HTMLElement>event.target;
        eventTarget.classList.toggle('hover');
        const children = eventTarget.children;
        const arrElMarkup = [...children];
        arrElMarkup.forEach((el) => {
            el.classList.toggle('hover');
        });
    }

    selectPizzaItem(event: Event) {
        const eventTarget = <HTMLElement>event.target;
        const eventCurrentTarget = <HTMLElement>event.currentTarget;
        const indexEl = this.getNumber(event);
        const imgPizza = document.querySelector('.pizza');
        if (eventTarget === eventCurrentTarget) {
            imgPizza?.classList.toggle('pizza_active');
        } else {
            const itemPizza = imgPizza?.children[indexEl];
            itemPizza?.classList.toggle('item_active');
        }
    }
}

export type TypeMarkup = InstanceType<typeof Markup>;
