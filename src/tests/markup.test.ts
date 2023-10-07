/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from '@testing-library/dom';
import { Markup } from '../components/blockFourth/markup';

const numberLevel = 0;
const markup = new Markup(numberLevel);

beforeEach(() => {
    document.body.innerHTML = `
        <div class="pizza pizza_4el">
            <div aria-label="pizza-element" class="redTomato elPizza_correct"></div>
            <div aria-label="pizza-element" class="redTomato elPizza_correct"></div>
            <div aria-label="pizza-element" class="redTomato elPizza_correct"></div>
            <div aria-label="pizza-element" class="redTomato elPizza_correct"></div>
        </div>
        <div class="markup"></div>`;
    markup.addMarkup();
});
describe('Markup: addMarkup', () => {
    test('should exist', () => {
        expect(markup.addMarkup).toBeDefined();
    });

    test('should be a markup elements ', () => {
        const elements = screen.getAllByLabelText('markup-element');
        elements.forEach((el) => {
            expect(el).toBeInTheDocument();
            expect(el).toHaveClass('elMarkup');
        });
    });
});

describe('hoverMarkup', () => {
    test('should exist', () => {
        expect(markup.hoverMarkup).toBeDefined();
    });

    test('should add a class to the markup when hover', () => {
        const element = screen.getByTestId('main-markup');
        expect(element).toBeInTheDocument();
        fireEvent.mouseOver(element);
        expect(element).toHaveClass('hover');
        expect(element.children[0]).toHaveClass('hover');
        fireEvent.mouseOut(element);
        expect(element).not.toHaveClass('hover');
    });
});

describe('selectPizzaItem', () => {
    test('should exist', () => {
        expect(markup.selectPizzaItem).toBeDefined();
    });

    test('should add a class to pizza elements  when hover', () => {
        const elementsMarkup = screen.getAllByLabelText('markup-element');
        const elementsPizza = screen.getAllByLabelText('pizza-element');
        fireEvent.mouseOver(elementsMarkup[1]);
        expect(elementsPizza[1]).toHaveClass('item_active');
        expect(elementsPizza[2]).not.toHaveClass('item_active');
        fireEvent.mouseOut(elementsMarkup[1]);
        expect(elementsPizza[1]).not.toHaveClass('item_active');
    });
});

describe('getNumber', () => {
    test('should exist', () => {
        expect(markup.getNumber).toBeDefined();
    });
});
