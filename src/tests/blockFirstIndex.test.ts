/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from '@testing-library/dom';
import { ElementsPizza } from '../components/blockFirst';

const numberLevel = 0;
const elementsPizza = new ElementsPizza(numberLevel);
describe('ElementsPizza: addBlockFirst', () => {
    test('should exist', () => {
        expect(elementsPizza.addBlockFirst).toBeDefined();
    });

    test('should be a heading', () => {
        document.body.innerHTML = `<div class="blockFirst"></div>`;
        elementsPizza.addBlockFirst();
        expect(screen.getByText('Select all tomatoes')).toBeInTheDocument();
    });

    test('should be a pizza elements ', () => {
        document.body.innerHTML = `<div class="blockFirst"></div>`;
        elementsPizza.addBlockFirst();
        const elements = screen.getAllByLabelText('pizza-element');
        expect(elements[1]).toHaveClass('redTomato');
        elements.forEach((el) => {
            expect(el).toBeInTheDocument();
        });
    });
});

describe('ElementsPizza: createHeading', () => {
    test('should exist', () => {
        expect(elementsPizza.createHeading).toBeDefined();
    });

    test('should create a heading', () => {
        const heading = elementsPizza.createHeading();
        expect(heading).toHaveClass('task');
        expect(heading).toHaveTextContent('Select all tomatoes');
    });
});

describe('createElementsPizza', () => {
    test('should exist', () => {
        expect(elementsPizza.createElementsPizza).toBeDefined();
    });

    test('should create pizza elements', () => {
        const containerElements = elementsPizza.createElementsPizza();
        const elements = containerElements.children;
        for (const el of elements) {
            expect(el).toHaveClass('redTomato');
            expect(el).toHaveAttribute('aria-label', 'pizza-element');
        }
    });
});

describe('hoverPizzaItem', () => {
    test('should exist', () => {
        expect(elementsPizza.hoverPizzaItem).toBeDefined();
    });

    test('should add a class to pizza elements  when hover', () => {
        document.body.innerHTML = `<div class="blockFirst"></div>`;
        elementsPizza.addBlockFirst();
        const elements = screen.getAllByLabelText('pizza-element');
        fireEvent.mouseOver(elements[0]);
        expect(elements[0]).toHaveClass('item_active');
        expect(elements[1]).not.toHaveClass('item_active');
        fireEvent.mouseOut(elements[0]);
        expect(elements[0]).not.toHaveClass('item_active');
    });
});

describe('selectMarkup', () => {
    test('should exist', () => {
        expect(elementsPizza.selectMarkup).toBeDefined();
    });

    test('should add a class to the markup when hover', () => {
        document.body.innerHTML = `
        <div class="blockFirst"></div>
        <div class="markup" id="markup">
            <div class="elMarkup-pizza">
                &lt; pizza &gt;
                <div class="elMarkup-tomato" data-testid="markup0">&lt; tomato class="redTomato" &gt; &lt;/ tomato &gt;</div>
                <div class="elMarkup-tomato" data-testid="markup1">&lt; tomato class="yellowTomato" &gt; &lt;/ tomato &gt;</div>
                <div class="elMarkup-tomato">&lt; tomato class="redTomato" &gt; &lt;/ tomato &gt;</div>
                <div class="elMarkup-tomato">&lt; tomato class="yellowTomato" &gt; &lt;/ tomato &gt;</div>
                &lt;/ pizza &gt;
            </div>
        </div>`;
        elementsPizza.addBlockFirst();
        const elements = screen.getAllByLabelText('pizza-element');
        fireEvent.mouseOver(elements[0]);
        expect(screen.getByTestId('markup0')).toHaveClass('hover');
        expect(screen.getByTestId('markup1')).not.toHaveClass('hover');
        fireEvent.mouseOut(elements[0]);
        expect(screen.getByTestId('markup0')).not.toHaveClass('hover');
    });
});

describe('getNumber', () => {
    test('should exist', () => {
        expect(elementsPizza.getNumber).toBeDefined();
    });
});
