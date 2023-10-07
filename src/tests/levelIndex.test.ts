/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from '@testing-library/dom';
import { Level } from '../components/level';

let numberLevel = 0;
let level = new Level(numberLevel);

describe('Level: add', () => {
    test('should exist', () => {
        expect(level.add).toBeDefined();
    });

    test('should add a level', () => {
        document.body.innerHTML = `
        <div class="blockFirst"></div>
        <div class="markup"></div>`;
        level.add();
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        expect(elementsMarkup.length).toBe(4);
        expect(elementsPizza.length).toBe(4);
    });

    test('should change a level', () => {
        numberLevel = 4;
        level = new Level(numberLevel);
        document.body.innerHTML = `
          <div class="blockFirst"></div>
          <div class="markup"></div>`;
        level.add();
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        expect(elementsMarkup.length).toBe(6);
        expect(elementsPizza.length).toBe(6);
    });
});
