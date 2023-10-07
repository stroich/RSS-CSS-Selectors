type Callback = (event: Event) => number;
export class Constructor {
    numberLevel: number;

    constructor(numberLevel: number) {
        this.numberLevel = numberLevel;
    }

    getHtmlCode(event: Event, callback: Callback) {
        const nameTask = <HTMLElement>document.querySelector('.pizza');
        const eventTarget = <HTMLElement>event.target;
        const indexEl = callback(event);
        const eventCurrentTarget = <HTMLElement>event.currentTarget;
        const htmlCodeElPizza = document.createElement('div');
        const markup = document.querySelector('.elMarkup-pizza');
        htmlCodeElPizza.classList.add('htmlCode');
        if (eventTarget === eventCurrentTarget) {
            htmlCodeElPizza.innerHTML = `&lt pizza &gt &lt/ pizza &gt`;
            nameTask.before(htmlCodeElPizza);
        } else {
            const textHtml = markup?.children[indexEl].innerHTML;
            if (textHtml != null) {
                htmlCodeElPizza.innerHTML = textHtml;
            }
            nameTask.children[indexEl].append(htmlCodeElPizza);
        }
    }
}
