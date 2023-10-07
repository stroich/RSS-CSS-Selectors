import { levelsSettings } from '../other/levelsSettings';
import { Constructor } from '../other/constructor';
import { TypeLevel, Level } from '../level';
import './blockSecond.css';

export class Levels extends Constructor {
    level: TypeLevel;

    constructor(numberLevel: number) {
        super(numberLevel);
        this.level = new Level(this.numberLevel);
    }

    draw() {
        const listLevels = document.createElement('div');
        listLevels.classList.add('list-levels');
        levelsSettings.forEach((_, ind: number) => {
            const level = document.createElement('div');
            const span = document.createElement('span');
            span.classList.add('iconHelp');
            span.innerHTML = '?  ';
            level.append(span);
            level.append(`Level ${ind + 1}`);
            level.classList.add('level');
            level.setAttribute('aria-label', 'level');
            if (ind === this.numberLevel) {
                level.classList.add('level_active');
            }
            level.addEventListener('click', (event) => {
                this.change(event);
            });
            listLevels.append(level);
        });
        const reset = document.createElement('button');
        reset.innerHTML = 'Reset Progress';
        reset.classList.add('button-reset');
        listLevels.append(reset);
        const nameBlock = document.querySelector('.nameBlockSecond');
        nameBlock?.after(listLevels);
    }

    start() {
        this.draw();
        this.level.add();
    }

    change(event: Event) {
        const requiredLevel = <HTMLElement>event.target;
        if (!requiredLevel.classList.contains('level_active')) {
            const levels = document.querySelectorAll('.level');
            const arrWithNumber = requiredLevel.textContent?.split(' ').reverse()[0];
            if (arrWithNumber) this.numberLevel = +arrWithNumber - 1;
            levels.forEach((el, ind) => {
                el.classList.remove('level_active');
                if (this.numberLevel === ind) el.classList.add('level_active');
            });
            this.level = new Level(this.numberLevel);
            this.level.add();
        }
    }

    addNextLevel() {
        const listLevels = document.querySelectorAll('.level');
        for (const el of listLevels) {
            el.classList.remove('level_active');
        }
        this.numberLevel += 1;
        listLevels[this.numberLevel - 1].classList.add('level_passed');
        listLevels[this.numberLevel].classList.add('level_active');
        this.level = new Level(this.numberLevel);
        this.level.add();
    }

    addReset() {
        this.numberLevel = 0;
        this.level = new Level(this.numberLevel);
        this.level.add();
        const listLevels = document.querySelectorAll('.level');
        for (const el of listLevels) {
            el.classList.remove('level_passed');
            el.classList.remove('level_active');
        }
        listLevels[0].classList.add('level_active');
        const modal = <HTMLElement>document.querySelector('.containerModal');
        modal.classList.remove('containerModal_open');
        const input = <HTMLInputElement>document.querySelector('.result-input');
        input.value = '';
        const span = document.querySelectorAll('.iconHelp');
        span.forEach((el) => {
            el.classList.remove('iconHelp_passed');
        });
    }
}

export type TypeLevels = InstanceType<typeof Levels>;
