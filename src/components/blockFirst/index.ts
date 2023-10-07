import './style.css';
import { levelsSettings } from '../other/levelsSettings';
import { Constructor } from '../other/constructor';

export class ElementsPizza extends Constructor {
    addBlockFirst() {
        const imgPizza = this.createElementsPizza();
        const heading = this.createHeading();
        const divBlockFirst = <HTMLElement>document.querySelector('.blockFirst');
        divBlockFirst.innerHTML = '';
        divBlockFirst.append(heading);
        divBlockFirst.append(imgPizza);
    }

    createHeading(): HTMLHeadingElement {
        const divTask = document.createElement('h2');
        divTask.classList.add('task');
        divTask.innerHTML = levelsSettings[this.numberLevel].task;
        return divTask;
    }

    createElementsPizza(): HTMLElement {
        const arrClass = levelsSettings[this.numberLevel].class;
        const imgPizza = <HTMLElement>document.createElement('div');
        imgPizza.classList.add('pizza', levelsSettings[this.numberLevel].classPizza);
        imgPizza.innerHTML = '';
        arrClass.forEach((el: Array<string>) => {
            const elPizza = document.createElement('div');
            elPizza.setAttribute('aria-label', 'pizza-element');
            elPizza.classList.add(el[0], el[1]);
            imgPizza?.append(elPizza);
        });
        imgPizza.addEventListener('mouseover', (event) => {
            this.hoverPizzaItem(event);
            this.selectMarkup(event);
            this.getHtmlCode(event, this.getNumber);
        });
        imgPizza.addEventListener('mouseout', (event) => {
            this.hoverPizzaItem(event);
            this.selectMarkup(event);
            const htmlCodeElPizza = document.querySelector('.htmlCode');
            htmlCodeElPizza?.remove();
        });
        return imgPizza;
    }

    hoverPizzaItem(event: Event) {
        const eventTarget = <HTMLElement>event.target;
        const eventCurrentTarget = <HTMLElement>event.currentTarget;
        if (eventTarget === eventCurrentTarget) {
            eventTarget.classList.toggle('pizza_active');
        } else {
            eventTarget.classList.toggle('item_active');
        }
    }

    getNumber(event: Event): number {
        const eventTarget = <HTMLElement>event.target;
        const parent = <HTMLElement>eventTarget.parentElement;
        const arrElPizza = [...parent.children];
        let indexEl = 0;
        arrElPizza.forEach((el, ind: number) => {
            if (el === eventTarget) indexEl = ind;
        });
        return indexEl;
    }

    selectMarkup(event: Event) {
        const eventTarget = <HTMLElement>event.target;
        const indexEl = this.getNumber(event);
        const eventCurrentTarget = <HTMLElement>event.currentTarget;
        const markup = document.querySelector('.elMarkup-pizza');
        if (eventTarget === eventCurrentTarget) {
            markup?.classList.toggle('hover');
            const children = <HTMLCollection>markup?.children;
            for (const el of children) {
                el.classList.toggle('hover');
            }
        } else {
            const itemPizza = markup?.children[indexEl];
            itemPizza?.classList.toggle('hover');
        }
    }
}

export type TypeElementsPizza = InstanceType<typeof ElementsPizza>;
