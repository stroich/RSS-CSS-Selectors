import { Levels, TypeLevels } from '../blockSecond/listLevel';
import { levelsSettings } from '../other/levelsSettings';

export class Game {
    level: TypeLevels;

    listOfLevel: Array<string | undefined>;

    listOfHelp: Array<string | undefined>;

    constructor() {
        this.level = new Levels(0);
        this.listOfLevel = [];
        this.listOfHelp = [];
    }

    start() {
        if (!localStorage.getItem('listOfLevel')) {
            for (let i = 0; i < levelsSettings.length; i++) {
                this.listOfLevel.push('');
            }
        }
        if (!localStorage.getItem('listOfHelp')) {
            for (let i = 0; i < levelsSettings.length; i++) {
                this.listOfHelp.push('');
            }
        }
        this.getLocalStorage();
        this.level.start();
        const levels = document.querySelectorAll('.level');
        levels.forEach((el, ind) => {
            if (this.listOfLevel[ind]) {
                el.classList.add(String(this.listOfLevel[ind]));
            }
        });
        const spans = document.querySelectorAll('.iconHelp');
        spans.forEach((el, ind) => {
            if (this.listOfHelp[ind]) {
                el.classList.add('iconHelp_passed');
            }
        });
        const form = document.forms[0];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.getResult();
        });
        const input = <HTMLInputElement>document.querySelector('input[type=text]');
        input.focus();
        input.addEventListener('blur', () => {
            input.focus();
        });
        const buttonReset = document.querySelectorAll('.button-reset');
        buttonReset.forEach((el) => {
            el.addEventListener('click', () => {
                this.level.addReset();
                const newSetting = [];
                for (let i = 0; i < levelsSettings.length; i++) {
                    newSetting.push('');
                }
                this.listOfHelp = newSetting;
                this.listOfLevel = newSetting;
            });
        });
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('numberLevel', String(this.level.numberLevel));
            localStorage.setItem('listOfLevel', String(this.listOfLevel.join(',')));
            localStorage.setItem('listOfHelp', String(this.listOfHelp.join(',')));
        });
        const help = <HTMLElement>document.querySelector('.help');
        help.addEventListener('click', () => {
            this.writeResult();
        });
    }

    getLocalStorage() {
        if (localStorage.getItem('numberLevel')) {
            const stringLevel = localStorage.getItem('numberLevel');
            if (stringLevel) {
                this.level = new Levels(+stringLevel);
            }
        }
        if (localStorage.getItem('listOfLevel')) {
            const listOfLevel = localStorage.getItem('listOfLevel');
            if (listOfLevel) this.listOfLevel = listOfLevel?.split(',');
        }
        if (localStorage.getItem('listOfHelp')) {
            const listOfHelp = localStorage.getItem('listOfHelp');
            if (listOfHelp) this.listOfHelp = listOfHelp?.split(',');
        }
    }

    writeResult() {
        const input = <HTMLInputElement>document.querySelector('.result-input');
        input.value = '';
        const result = levelsSettings[this.level.numberLevel].result[0];
        let i = 0;
        function typeWriter() {
            if (i < result.length) {
                input.value += result.charAt(i);
                i++;
                setTimeout(typeWriter, 250);
            }
        }
        typeWriter();
        const span = document.querySelectorAll('.iconHelp')[this.level.numberLevel];
        span.classList.add('iconHelp_passed');
        this.listOfHelp[this.level.numberLevel] = 'iconHelp_passed';
    }

    getResult() {
        const input = <HTMLInputElement>document.querySelector('.result-input');
        const inputValue = input.value;
        const length = levelsSettings.length - 1;
        if (levelsSettings[this.level.numberLevel].result.includes(inputValue)) {
            this.listOfLevel[this.level.numberLevel] = 'level_passed';
            if (this.level.numberLevel === length) {
                const modal = <HTMLElement>document.querySelector('.containerModal');
                const close = <HTMLElement>document.querySelector('.close');
                modal.classList.add('containerModal_open');
                close.addEventListener('click', () => {
                    modal.classList.remove('containerModal_open');
                });
                const listLevels = document.querySelectorAll('.level');
                listLevels[this.level.numberLevel].classList.add('level_passed');
            } else {
                const elPizza = <HTMLCollection>document.querySelector('.pizza')?.children;
                for (const el of elPizza) {
                    el.classList.add('visibility');
                }

                setTimeout(() => {
                    this.level.addNextLevel();
                    input.value = '';
                }, 2000);
            }
        } else {
            const wrapper = document.querySelector('.wrapper');
            wrapper?.classList.add('result-button_wrong');
            setTimeout(function () {
                wrapper?.classList.remove('result-button_wrong');
            }, 300);
        }
    }
}
