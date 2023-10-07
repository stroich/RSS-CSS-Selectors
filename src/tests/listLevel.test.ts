/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from '@testing-library/dom';
import { Levels } from '../components/blockSecond/listLevel';

let numberLevel = 0;
let levels = new Levels(numberLevel);

describe('Levels: draw', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>`;
        levels.draw();
    });

    test('should exist', () => {
        expect(levels.draw).toBeDefined();
    });

    test('should be a list of levels on the page', () => {
        const itemList = screen.getAllByLabelText('level');
        itemList.forEach((el) => {
            expect(el).toBeInTheDocument();
        });
        expect(itemList[6]).toHaveClass('level');
    });

    test('should be a button on the page', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('button-reset');
    });
});

describe('Levels: start', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>`;
        levels.start();
    });

    test('should exist', () => {
        expect(levels.start).toBeDefined();
    });

    test('should create a list of levels', () => {
        const itemList = screen.getAllByLabelText('level');
        expect(itemList.length).toBe(11);
    });

    test('should create a markup', () => {
        const elements = screen.getAllByLabelText('markup-element');
        expect(elements.length).toBe(4);
    });

    test('should create elements of pizza', () => {
        const elements = screen.getAllByLabelText('pizza-element');
        expect(elements.length).toBe(4);
    });

    afterAll(() => {
        numberLevel = 0;
        levels = new Levels(numberLevel);
    });
});

describe('Levels: addNextLevel', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>`;
        levels.start();
    });

    test('should exist', () => {
        expect(levels.addNextLevel).toBeDefined();
    });

    test('should be add next level', () => {
        levels.addNextLevel();
        const itemList = screen.getAllByLabelText('level');
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        expect(itemList[0]).toHaveClass('level_passed');
        expect(itemList[0]).not.toHaveClass('level_active');
        expect(itemList[1]).toHaveClass('level_active');
        expect(elementsPizza[1]).toHaveClass('yellowTomato');
        expect(elementsMarkup[1]).toHaveTextContent('< tomato class="yellowTomato" > </ tomato >');
    });
});

describe('Levels: change', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>`;
        levels.start();
    });

    test('should exist', () => {
        expect(levels.change).toBeDefined();
    });

    test('the level should be changed to the pressed one', () => {
        const itemList = screen.getAllByLabelText('level');
        fireEvent.click(itemList[4]);
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        expect(elementsMarkup.length).toBe(6);
        expect(elementsPizza.length).toBe(6);
        expect(elementsPizza[4]).toHaveClass('sausage');
        expect(elementsMarkup[5]).toHaveTextContent('< tomato size="small" > </ tomato >');
    });
});

describe('Levels: addReset', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>
            <input class="result-input" type="text">
            <div class="containerModal">
                <div class="modal">
                    <div class="content">
                        <span class="close">&times;</span>
                        <h3>GAME OVER</h3>
                        <button class="button-reset">Reset Progress</button>
                    </div>
                </div>
           </div>`;
        levels.start();
        levels.addNextLevel();
        levels.addReset();
    });

    test('should exist', () => {
        expect(levels.addReset).toBeDefined();
    });

    test('the list of levels should be reset', () => {
        const itemList = screen.getAllByLabelText('level');
        expect(itemList[1]).not.toHaveClass('level_active');
        itemList.forEach((el) => {
            expect(el).not.toHaveClass('level_passed');
            expect(el.children[0]).not.toHaveClass('iconHelp_passed');
        });
        expect(itemList[0]).toHaveClass('level_active');
    });

    test('there should be a first level of pizza elements', () => {
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        elementsPizza.forEach((el) => {
            expect(el).toHaveClass('redTomato');
        });
    });

    test('the markup must have the first level', () => {
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        elementsMarkup.forEach((el) => {
            expect(el).toHaveTextContent('< tomato > </ tomato >');
        });
    });

    test('should be an empty input', () => {
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('');
    });
});
