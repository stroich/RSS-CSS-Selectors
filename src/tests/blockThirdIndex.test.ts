/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from '@testing-library/dom';
import { Game } from '../components/blockThird';

const game = new Game();

describe('Game: start', () => {
    beforeEach(() => {
        document.body.innerHTML = `
             <button class="help">Help, I'm stuck!</button>
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>
            <form class="form">
              <label>
                <input class="result-input" type="text">
              </label>
              <input type="submit" value="Enter" class="result-button">
            </form>
            <div class="containerModal">
                <div class="modal">
                    <div class="content">
                        <span class="close">&times;</span>
                        <h3>GAME OVER</h3>
                        <button class="button-reset">Reset Progress</button>
                    </div>
                </div>
           </div>`;
        game.start();
    });

    test('should exist', () => {
        expect(game.start).toBeDefined();
    });

    test('should be a first level', () => {
        expect(game.level.numberLevel).toBe(0);
    });

    test('should be  a list of level ', () => {
        const itemList = screen.getAllByLabelText('level');
        expect(itemList.length).toBe(11);
    });
});

describe('Game: getLocalStorage', () => {
    test('should exist', () => {
        expect(game.getLocalStorage).toBeDefined();
    });

    test('should return a numeric level from storage', () => {
        localStorage.setItem('numberLevel', String(2));
        game.getLocalStorage();
        expect(game.level.numberLevel).toBe(2);
    });
});

describe('Game: writeResult', () => {
    beforeEach(() => {
        document.body.innerHTML = `
             <button class="help">Help, I'm stuck!</button>
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div class="markup"></div>
            <form class="form">
              <label>
                <input class="result-input" type="text">
              </label>
              <input type="submit" value="Enter" class="result-button">
            </form>
            <div class="containerModal">
                <div class="modal">
                    <div class="content">
                        <span class="close">&times;</span>
                        <h3>GAME OVER</h3>
                        <button class="button-reset">Reset Progress</button>
                    </div>
                </div>
           </div>`;
        game.start();
    });
    test('should exist', () => {
        expect(game.writeResult).toBeDefined();
    });

    test('should change the value', async () => {
        const input = screen.getByRole('textbox');
        const helpButton = screen.getAllByRole('button');
        fireEvent.click(helpButton[0]);
        await setTimeout(() => {
            expect(input).toHaveValue('tomato');
        }, 250);
    });
});

describe('Game: getResult', () => {
    beforeEach(() => {
        document.body.innerHTML = `
             <button class="help">Help, I'm stuck!</button>
            <div class="blockSecond">
                <h2 class="nameBlockSecond">Levels</h2>
            </div>
            <div class="blockFirst"></div>
            <div  class="wrapper" data-testid="wrapper">
                <div class="blockThird">
                    <div class="nameBlock">
                        <h3>CSS Editor</h3>
                        <p>style.css</p>
                    </div>
                    <div class="wrapperContent">
                        <div class="lineNumber">
                            1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15
                        </div>
                        <div class="result">
                            <form  role="form" class="form">
                                <label>
                                    <input class="result-input" type="text">
                                </label>
                                <input type="submit" data-testid="submit" value="Enter" class="result-button">
                            </form>
                        </div>
                    </div>
                </div>
                <div class="blockFourth">
                    <div class="nameBlock">
                        <h3>HTML Viewer</h3>
                        <p>table.html</p>
                    </div>
                    <div class="wrapperContent">
                        <div class="lineNumber">
                            1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15
                        </div>
                        <div class="markup" id="markup"></div>
                    </div>
                </div>
            </div>
            <div class="containerModal">
                <div class="modal">
                    <div class="content">
                        <span class="close">&times;</span>
                        <h3>GAME OVER</h3>
                        <button class="button-reset">Reset Progress</button>
                    </div>
                </div>
           </div>`;
        game.start();
    });
    test('should exist', () => {
        expect(game.getResult).toBeDefined();
    });

    test('should handle an incorrect response', () => {
        const button = screen.getByTestId('submit');
        const input = <HTMLInputElement>screen.getByRole('textbox');
        input.value = '124';
        fireEvent.submit(button);
        const wrapper = screen.getByTestId('wrapper');
        expect(wrapper).toHaveClass('result-button_wrong');
    });

    test('should handle an correct response', () => {
        const button = screen.getByTestId('submit');
        const input = <HTMLInputElement>screen.getByRole('textbox');
        input.value = 'tomato';
        fireEvent.submit(button);
        const elements = screen.getAllByLabelText('pizza-element');
        expect(elements[0]).toHaveClass('visibility');
    });
});
